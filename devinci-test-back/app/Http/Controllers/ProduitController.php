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
    public function produit($id)
    {
        // Récupérer tous les produits avec leurs relations et filtrer par id_creator
        $produits = Produit::with('categorie','ingredients','packagings')
                            ->where('id_creator', $id)
                            ->get();
        return response()->json($produits);
    }








    // public function addProduit(Request $request,$id)
    // {
    //     $validator = Validator::make($request->all(), [
    //         'name_produit' => [
    //             'required',
    //             'regex:/^[A-Za-z\s]+$/',
    //             function ($attribute, $value, $fail) use ($id) {
    //                 $existingCategory = Produit::where('name_produit', $value)
    //                     ->where('id_creator', $id)
    //                     ->first();

    //                 if ($existingCategory) {
    //                     $fail('Ce nom de Produit existe déjà pour cet utilisateur.');
    //                 }
    //             }
    //         ],
    //         'marge' => 'required|numeric|max:999999.99',
    //         'id_categorie' => 'required|exists:categories,id',
    //         'ingredients' => 'array',
    //         'ingredients.*.id_ingredient' => 'exists:ingredients,id',
    //         'ingredients.*.quantite' => 'numeric|min:0',
    //         'packagings' => 'array',
    //         'packagings.*.id_packaging' => 'exists:packagings,id',
    //         'packagings.*.nombre_package' => 'numeric|min:0',
    //     ], [
    //         'name_produit.required' => 'Le champ nom du produit est requis.',
    //         'name_produit.regex' => 'Le champ nom du produit doit contenir uniquement des lettres et des espaces.',
    //         'marge.required' => 'Le champ marge est requis.',
    //         'marge.numeric' => 'Le champ marge doit être un nombre.',
    //         'marge.max' => 'Le champ marge ne doit pas dépasser 999999.99.',
    //         'id_categorie.required' => 'Le champ catégorie est requis.',
    //         'id_categorie.exists' => 'La catégorie sélectionnée n\'existe pas.',
    //         'ingredients.array' => 'Le champ ingrédients doit être un tableau.',
    //         'ingredients.*.id_ingredient.exists' => 'L\'ingrédient sélectionné n\'existe pas.',
    //         'ingredients.*.quantite.numeric' => 'La quantité de l\'ingrédient doit être un nombre.',
    //         'ingredients.*.quantite.min' => 'La quantité de l\'ingrédient doit être supérieure ou égale à 0.',
    //         'packagings.array' => 'Le champ packagings doit être un tableau.',
    //         'packagings.*.id_packaging.exists' => 'L\'emballage sélectionné n\'existe pas.',
    //         'packagings.*.nombre_package.numeric' => 'Le nombre de packages doit être un nombre.',
    //         'packagings.*.nombre_package.min' => 'Le nombre de packages doit être supérieur ou égal à 0.',
    //     ]);


    //     if ($validator->fails()) {
    //         return response()->json([
    //             'validation_errors' => $validator->messages(),
    //         ]);
    //     }

    //     $produit = Produit::firstOrCreate(
    //         ['name_produit' => $request->name_produit],
    //         [
    //             'marge' => $request->marge,
    //             'id_categorie' => $request->id_categorie,
    //             'id_creator'=> $id, // Change to $id

    //         ]
    //     );

    //     if ($request->has('packagings')) {
    //         foreach ($request->packagings as $packaging) {
    //             $pivotData = [
    //                 'nombre_package' => $packaging['nombre_package'],
    //             ];

    //             $existingPivotData = $produit->packagings()->where('id_packaging', $packaging['id_packaging'])->first();

    //             if ($existingPivotData) {
    //                 // Si l'association existe déjà, mettez à jour la quantité
    //                 $existingPivotData->pivot->nombre_package += $packaging['nombre_package'];
    //                 $existingPivotData->pivot->save();
    //             } else {
    //                 // Sinon, créez une nouvelle association
    //                 $produit->packagings()->attach($packaging['id_packaging'], $pivotData);
    //             }
    //         }
    //     }

    //     if ($request->has('ingredients')) {
    //         foreach ($request->ingredients as $ingredient) {
    //             $pivotData = [
    //                 'quantite' => $ingredient['quantite'],
    //             ];

    //             $existingPivotData = $produit->ingredients()->where('id_ingredient', $ingredient['id_ingredient'])->first();

    //             if ($existingPivotData) {
    //                 // Si l'association existe déjà, mettez à jour la quantité
    //                 $existingPivotData->pivot->quantite += $ingredient['quantite'];
    //                 $existingPivotData->pivot->save();
    //             } else {
    //                 // Sinon, créez une nouvelle association
    //                 $produit->ingredients()->attach($ingredient['id_ingredient'], $pivotData);
    //             }
    //         }
    //     }

    //     return response()->json([
    //         'status' => 200,
    //         'nom_produit' => $produit->name_produit,
    //         'id_categorie' => $produit->id_categorie,
    //         'id_creator'=> $id, // Change to $id

    //         'message' => 'Produit ajouté avec succès et ingrédients associés.',
    //     ], 200);

    // }




    public function addProduit(Request $request, $id)
    {
        $validator = Validator::make($request->all(), [
            'name_produit' => [
                'required',
                'regex:/^[A-Za-z\s]+$/',
            ],
            'id_categorie' => 'required|exists:categories,id',
            'ingredients' => 'array',
            'ingredients.*.id_ingredient' => 'exists:ingredients,id',
            'ingredients.*.quantite' => 'numeric',
            'packagings' => 'array',
            'packagings.*.id_packaging' => 'exists:packagings,id',
            'packagings.*.nombre_package' => 'numeric',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'validation_errors' => $validator->messages(),
            ]);
        }

        $produit = Produit::where('name_produit', $request->name_produit)
            ->where('id_creator', $id)
            ->first();

        if ($produit) {
            // Si un produit avec le même nom et le même ID de créateur existe déjà,
            // mettez à jour ses détails
            $produit->update([
                'id_categorie' => $request->id_categorie,
            ]);
        } else {
            // Sinon, créez un nouveau produit
            $produit = Produit::create([
                'name_produit' => $request->name_produit,
                'id_categorie' => $request->id_categorie,
                'id_creator' => $id,
            ]);
        }

        // Ajout des ingrédients au produit
        if ($request->has('ingredients')) {
            foreach ($request->ingredients as $ingredient) {
                $pivotData = [
                    'quantite' => $ingredient['quantite'],
                ];

                $existingPivotData = $produit->ingredients()
                    ->where('id_ingredient', $ingredient['id_ingredient'])
                    ->where('produit_ingredient.id_creator', $id)
                    ->first();

                if ($existingPivotData) {
                    // Si l'association existe déjà, mettez à jour la quantité
                    $existingPivotData->pivot->quantite += $ingredient['quantite'];
                    $existingPivotData->pivot->save();
                } else {
                    // Sinon, créez une nouvelle association
                    $produit->ingredients()->attach($ingredient['id_ingredient'], array_merge($pivotData, ['id_creator' => $id]));
                }
            }
        }

        // Ajout des ingrédients au produit
        if ($request->has('packagings')) {
            foreach ($request->packagings as $packaging) {
                $pivotData = [
                     'nombre_package' => $packaging['nombre_package'],
                         ];

                $existingPivotData = $produit->packagings()
                    ->where('id_packaging', $packaging['id_packaging'])
                    ->where('packaging_produit.id_creator', $id)
                    ->first();

                if ($existingPivotData) {
                    // Si l'association existe déjà, mettez à jour la quantité
                    $existingPivotData->pivot->nombre_package += $packaging['nombre_package'];
                    $existingPivotData->pivot->save();
                } else {
                    // Sinon, créez une nouvelle association
                    $produit->packagings()->attach($packaging['id_packaging'], array_merge($pivotData, ['id_creator' => $id]));
                }
            }
        }

        // Ajout des packagings au produit
        // Cette partie du code reste inchangée

        return response()->json([
            'status' => 200,
            'nom_produit' => $produit->name_produit,
            'id_categorie' => $produit->id_categorie,
            'id_creator' => $produit->id_creator,
            'message' => 'Produit ajouté avec succès et ingrédients associés.',
        ], 200);
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


    // public function updateProduit(Request $request, $id)
    // {
    //     $validator = Validator::make($request->all(), [
    //         'name_produit' => ['required', 'regex:/^[A-Za-z\s]+$/'],
    //         'id_categorie' => 'required|exists:categories,id',
    //         'ingredients' => 'array',
    //         'ingredients.*.id_ingredient' => 'exists:ingredients,id',
    //         'ingredients.*.quantite' => 'numeric|min:0',
    //         'packagings' => 'array',
    //         'packagings.*.id_packaging' => 'exists:packagings,id',
    //         'packagings.*.nombre_package' => 'numeric|min:0',
    //     ]);

    //     if ($validator->fails()) {
    //         return response()->json([
    //             'validation_errors' => $validator->messages(),
    //         ]);
    //     }

    //     $produit = Produit::findOrFail($id);
    //     $produit->update([
    //         'name_produit' => $request->name_produit,
    //         'id_categorie' => $request->id_categorie,
    //     ]);

    //     // Mise à jour des ingrédients
    //     if ($request->has('ingredients')) {
    //         foreach ($request->ingredients as $ingredient) {
    //             $produit->ingredients()->syncWithoutDetaching([$ingredient['id_ingredient'] => ['quantite' => $ingredient['quantite']]]);
    //         }
    //     }

    //     // Mise à jour des packagings
    //     if ($request->has('packagings')) {
    //         foreach ($request->packagings as $packaging) {
    //             $produit->packagings()->syncWithoutDetaching([$packaging['id_packaging'] => ['nombre_package' => $packaging['nombre_package']]]);
    //         }
    //     }

    //     return response()->json([
    //         'status' => 200,
    //         'nom_produit' => $produit->name_produit,
    //         'id_categorie' => $produit->id_categorie,
    //         'message' => 'Produit mis à jour avec succès et ingrédients associés.',
    //     ], 200);
    // }
    public function updateProduit(Request $request, $id)
{
    $validator = Validator::make($request->all(), [
        'name_produit' => ['required', 'regex:/^[A-Za-z\s]+$/'],
        'id_categorie' => 'required|exists:categories,id',
        'ingredients' => 'sometimes|array',
        'ingredients.*.id_ingredient' => 'sometimes|exists:ingredients,id',
        'ingredients.*.quantite' => 'sometimes|numeric|min:0',
        'packagings' => 'sometimes|array',
        'packagings.*.id_packaging' => 'sometimes|exists:packagings,id',
        'packagings.*.nombre_package' => 'sometimes|numeric|min:0',
    ]);

    if ($validator->fails()) {
        return response()->json([
            'validation_errors' => $validator->messages(),
        ]);
    }

    $produit = Produit::findOrFail($id);
    $produit->update([
        'name_produit' => $request->name_produit,
        'id_categorie' => $request->id_categorie,
    ]);

    // Mise à jour des ingrédients
    if ($request->has('ingredients')) {
        foreach ($request->ingredients as $ingredient) {
            $produit->ingredients()->syncWithoutDetaching([$ingredient['id_ingredient'] => ['quantite' => $ingredient['quantite']]]);
        }
    }

    // Mise à jour des packagings
    if ($request->has('packagings')) {
        foreach ($request->packagings as $packaging) {
            $produit->packagings()->syncWithoutDetaching([$packaging['id_packaging'] => ['nombre_package' => $packaging['nombre_package']]]);
        }
    }

    return response()->json([
        'status' => 200,
        'nom_produit' => $produit->name_produit,
        'id_categorie' => $produit->id_categorie,
        'message' => 'Produit mis à jour avec succès et ingrédients associés.',
    ], 200);
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

