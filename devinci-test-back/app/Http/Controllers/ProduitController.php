<?php

namespace App\Http\Controllers;
use App\Models\Categorie;
use App\Models\Produit;
use App\Models\User\Role;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Log;

class ProduitController extends Controller
{
    public function produit()
    {
        $produits = Produit::with('categorie')->get();
        return response()->json($produits);
    }



    public function associerIngrédients(Request $request, $produitId)
    {
        // Récupérer le produit
        $produit = Produit::findOrFail($produitId);

        // Vérifier si les ingrédients sont fournis dans la requête
        if ($request->has('ingredients')) {
            $ingredients = $request->input('ingredients');

            // Boucler sur les ingrédients fournis
            foreach ($ingredients as $ingredient) {
                // Récupérer l'ID de l'ingrédient et la quantité fournis
                $ingredientId = $ingredient['ingredient_id'];
                $quantite = $ingredient['quantite'];

                // Associer l'ingrédient au produit avec la quantité
                $produit->ingredients()->attach($ingredientId, ['quantite' => $quantite]);
            }
        }

        // Retourner une réponse
        return response()->json(['message' => 'Ingrédients associés avec succès au produit.']);
    }








    public function addProduit(Request $request)
    {
        $existingRole = Categorie::find($request->id_categorie );
        $validator = Validator::make($request->all(), [
            'name_produit' => 'required|unique:produits',
            'marge' => 'required|numeric|max:999999.99',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'validation_errors' => $validator->messages(),
            ]);
        } else if (!$existingRole) {
            return response()->json([
                'status' => 404,
                'message' => 'Category  not found',
            ], 404);
        } else {
            $produit = Produit::create([
                'name_produit' => $request->name_produit,
                'marge'=> $request->marge,

                'id_categorie' => $request->id_categorie
            ]);


                return response()->json([
                'status' => 200,
                'nom Produit' => $produit->name_produit,
                'id_categorie' => $produit->id_categorie,
               'message' => 'added Success',
            ],200);
        }
    }








    public function showProduit($id)
    {
        $produit = Produit::with('categorie')->find($id); // Load the role information
        if (!$produit) {
            return response()->json([
                'message' => 'Produit Not Found.'
            ], 404);
        }
        return response()->json([
            'produit' => $produit
        ], 200);
    }







public function updateProduit(Request $request, $id)
    {
        try {
            // Find Produit
            $produit = Produit::find($id);
            if(!$produit){
                return response()->json([
                   'message'=>'Produit Not Found.'
                ],404);
            }

            //echo "request : $request->image";
            $produit->update($request->all());

            return response()->json([
                'message' => "Produit successfully updated."
            ],200);
        } catch (\Exception $e) {
            // Return Json Response
            return response()->json([
                'message' => "Something went really wrong!"
            ],500);
        }
    }


    public function destroy($id)
    {
        $produit = Produit::find($id);

        if (!$produit) {
            return response()->json([
                'success' => false,
                'message' => 'Produit non trouvé',
            ], 404);
        }

        try {
            $produit->delete();
            return response()->json([
                'success' => true,
                'message' => 'Produit supprimé avec succès',
            ], 200);
        } catch (\Exception $e) {
            Log::error('Error deleting produit: ' . $e->getMessage());
            return response()->json([
                'success' => false,
                'message' => 'Erreur lors de la suppression du produit',
                'error' => $e->getMessage(),
            ], 500);
        }
    }
}

