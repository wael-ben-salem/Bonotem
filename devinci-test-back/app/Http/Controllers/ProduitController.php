<?php

namespace App\Http\Controllers;
use App\Models\Categorie;
use App\Models\Ingredient;
use App\Models\Produit;
use App\Models\User\Role;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Log;

class ProduitController extends Controller
{
    public function produit()
    {
        $produits = Produit::with('categorie','ingredients','packagings')->get();
        return response()->json($produits);
    }












    public function addProduit(Request $request)
{
    $validator = Validator::make($request->all(), [
        'name_produit' => 'required|unique:produits',
        'marge' => 'required|numeric|max:999999.99',
        'id_categorie' => 'required|exists:categories,id', // Add validation for category existence
        'ingredients' => 'required|array', // Validation for ingredients array
        'ingredients.*.id_ingredient' => 'required|exists:ingredients,id',
        'ingredients.*.quantite' => 'required|numeric|min:0',
        'packagings' => 'required|array', // Validation for packagings array
        'packagings.*.id_packaging' => 'required|exists:packagings,id',
        'packagings.*.nombre_package' => 'required|int|min:0',
    ]);

    if ($validator->fails()) {
        return response()->json([
            'validation_errors' => $validator->messages(),
        ]);
    } else {
        $produit = Produit::create([
            'name_produit' => $request->name_produit,
            'marge' => $request->marge,
            'id_categorie' => $request->id_categorie,
        ]);

        // Associating ingredients with the product
        foreach ($request->ingredients as $ingredient) {
            $produit->ingredients()->attach($ingredient['id_ingredient'], [
                'quantite' => $ingredient['quantite'],
            ]);
        }

         // Associating ingredients with the product
         foreach ($request->packagings as $packaging) {
            $produit->packagings()->attach($packaging['id_packaging'], [
                'nombre_package' => $packaging['nombre_package'],
            ]);
        }

        return response()->json([
            'status' => 200,
            'nom_produit' => $produit->name_produit,
            'id_categorie' => $produit->id_categorie,
            'message' => 'Produit ajouté avec succès et ingrédients associés.',
        ], 200);
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
        $validator = Validator::make($request->all(), [
            'name_produit' => 'unique:produits,name_produit,' . $id,
            'marge' => 'numeric|max:999999.99',
            'id_categorie' => 'exists:categories,id',
            'ingredients' => 'array',
            'ingredients.*.id_ingredient' => 'exists:ingredients,id',
            'ingredients.*.quantite' => 'numeric|min:0',
            'packagings' => 'array', // Validation for packagings array
            'packagings.*.id_packaging' => 'exists:packagings,id',
            'packagings.*.nombre_package' => 'int|min:0',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'validation_errors' => $validator->messages(),
            ]);
        } else {
            $produit = Produit::findOrFail($id);

            $produit->name_produit = $request->name_produit;
            $produit->marge = $request->marge;
            $produit->id_categorie = $request->id_categorie;
            $produit->save();

            // Sync ingredients with the product
            $produit->ingredients()->sync([]);
            foreach ($request->ingredients as $ingredient) {
                $produit->ingredients()->attach($ingredient['id_ingredient'], [
                    'quantite' => $ingredient['quantite'],
                ]);
            }

            // Sync packagings with the product
            $produit->packagings()->sync([]);
            foreach ($request->packagings as $packaging) {
                $produit->packagings()->attach($packaging['id_packaging'], [
                    'nombre_package' => $packaging['nombre_package'],
                ]);
            }

            return response()->json([
                'status' => 200,
                'message' => 'Produit mis à jour avec succès et ingrédients associés.',
            ], 200);
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

