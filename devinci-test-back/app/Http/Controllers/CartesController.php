<?php

namespace App\Http\Controllers;

use App\Models\Cartes;
use App\Models\IngredientCompose;
use App\Models\Produit;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class CartesController extends Controller
{
    // public function store(Request $request, $id)
    // {
    //     $validator = Validator::make($request->all(), [
    //         'id_produit' => [
    //             'required',
    //             'exists:produits,id',
    //             function ($attribute, $value, $fail) use ($id) {
    //                 $existingCategory = Cartes::where('id_produit', $value)
    //                     ->where('id_creator', $id)
    //                     ->first();

    //                 if ($existingCategory) {
    //                     $fail('Ce produit est déjà associé à une carte pour cet utilisateur.');
    //                 }
    //             }
    //         ],
    //         'prix' => 'required|numeric',

    //     ], [
    //         'id_produit.required' => 'Le champ produit est requis.',
    //         'id_produit.exists' => 'Le produit sélectionné n\'existe pas.',
    //         'prix.required' => 'Le champ prix est requis.',
    //         'prix.numeric' => 'Le champ prix doit être un nombre.',
    //     ]);

    //     if ($validator->fails()) {
    //         return response()->json([
    //             'validation_errors' => $validator->messages(),
    //         ]);
    //     } else {
    //         // Récupérer le produit associé à la carte
    //         $produit = Produit::findOrFail($request->id_produit);

    //         // Créer une nouvelle carte
    //         $carte = new Cartes();
    //         $carte->id_produit = $request->id_produit;
    //         $carte->id_categorie = $produit->id_categorie; // Récupérer l'ID de la catégorie du produit
    //         $carte->prix = $request->prix;
    //         $carte->id_creator = $id;

    //         $carte->save();

    //         return response()->json([
    //             'message' => "Carte ajoutée avec succès."
    //         ], 200);
    //     }
    // }
    public function store(Request $request, $id)
    {
        // Validation des données de la requête
        $validator = Validator::make($request->all(), [
            'id_produit' => [
                'nullable',
                'exists:produits,id',
                function ($attribute, $value, $fail) use ($id) {
                    $existingCategory = Cartes::where('id_produit', $value)
                        ->where('id_creator', $id)
                        ->first();

                    if ($existingCategory) {
                        $fail('Ce nom de produit existe déjà pour cet utilisateur.');
                    }
                }
            ],
            'id_ingredient_compose' => [
                'nullable',
                'exists:ingredient_composes,id',
                function ($attribute, $value, $fail) use ($id) {
                    $existingCategory = Cartes::where('id_ingredient_compose', $value)
                        ->where('id_creator', $id)
                        ->first();

                    if ($existingCategory) {
                        $fail('Ce nom d\'ingrédient existe déjà pour cet utilisateur.');
                    }
                }
            ],
            'prix' => 'required|numeric',
        ], [
            'id_produit.exists' => 'Le produit sélectionné n\'existe pas.',
            'id_ingredient_compose.exists' => 'L\'ingrédient composé sélectionné n\'existe pas.',
            'prix.required' => 'Le champ prix est requis.',
            'prix.numeric' => 'Le champ prix doit être un nombre.',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'validation_errors' => $validator->messages(),
            ]);
        }

        // Création des cartes en fonction des données fournies dans la requête
        $prix = $request->prix;
        $id_creator = $id;
        $produit = null;
        $ingredient_compose = null;

        if ($request->id_produit !== null) {
            $produit = Produit::findOrFail($request->id_produit);
        }

        if ($request->id_ingredient_compose !== null) {
            $ingredient_compose = IngredientCompose::findOrFail($request->id_ingredient_compose);
        }

        if ($produit !== null && $ingredient_compose === null) {
            // Créer une carte avec un produit uniquement
            $carteProduit = new Cartes();
            $carteProduit->id_produit = $request->id_produit;
            $carteProduit->prix = $prix;
            $carteProduit->id_categorie = $produit->id_categorie; // Récupérer l'ID de la catégorie du produit
            $carteProduit->id_creator = $id_creator;
            $carteProduit->save();

            return response()->json([
                'message' => 'Carte pour le produit ajoutée avec succès.'
            ], 200);
        }

        if ($ingredient_compose !== null && $produit === null) {
            // Créer une carte avec un ingrédient composé uniquement
            $carteIngredientCompose = new Cartes();
            $carteIngredientCompose->id_ingredient_compose = $request->id_ingredient_compose;
            $carteIngredientCompose->prix = $prix;
            $carteIngredientCompose->id_creator = $id_creator;
            $carteIngredientCompose->id_categorie = $ingredient_compose->id_categorie; // Récupérer l'ID de la catégorie de l'ingrédient composé
            $carteIngredientCompose->save();

            return response()->json([
                'message' => 'Carte pour l\'ingrédient composé ajoutée avec succès.'
            ], 200);
        }

        if ($produit !== null && $ingredient_compose !== null) {
            // Créer deux cartes, une pour le produit et une pour l'ingrédient composé
            $carteProduit = new Cartes();
            $carteProduit->id_produit = $request->id_produit;
            $carteProduit->prix = $prix;
            $carteProduit->id_creator = $id_creator;
            $carteProduit->id_categorie = $produit->id_categorie; // Récupérer l'ID de la catégorie du produit
            $carteProduit->save();

            $carteIngredientCompose = new Cartes();
            $carteIngredientCompose->id_ingredient_compose = $request->id_ingredient_compose;
            $carteIngredientCompose->prix = $prix;
            $carteIngredientCompose->id_creator = $id_creator;
            $carteIngredientCompose->id_categorie = $ingredient_compose->id_categorie; // Récupérer l'ID de la catégorie de l'ingrédient composé
            $carteIngredientCompose->save();

            return response()->json([
                'message' => 'Cartes pour le produit et l\'ingrédient composé ajoutées avec succès.'
            ], 200);
        }

        // Si aucun des deux id_produit et id_ingredient_compose n'est présent
        return response()->json([
            'message' => 'Veuillez fournir un produit, un ingrédient composé ou les deux.'
        ], 400);
    }


        public function cartes(Request $request,$id)
        {
            // Eager load the products with each category
            $cartes = Cartes::with('produit','categorie','ingredient_compose')
            ->where('id_creator', $id)
                            ->get();

            return response()->json($cartes);
        }

        public function update(Request $request, $id)
        {
            $validator = Validator::make($request->all(), [
                'id_produit' => 'required|exists:produits,id',
                'prix' => 'required|numeric',

            ], [
                'id_produit.required' => 'Le champ produit est requis.',
                'id_produit.exists' => 'Le produit sélectionné n\'existe pas.',
                'prix.required' => 'Le champ prix est requis.',
                'prix.numeric' => 'Le champ prix doit être un nombre.',
            ]);

            if ($validator->fails()) {
                return response()->json([
                    'validation_errors' => $validator->messages(),
                ]);
            }
            else {

                // Récupérer la carte à mettre à jour
                $carte = Cartes::findOrFail($id);
                $produit = Produit::findOrFail($request->id_produit);

                // Vérifier si le produit associé existe
                Produit::findOrFail($request->id_produit);

                // Mettre à jour les attributs de la carte
                $carte->id_produit = $request->id_produit;
                $carte->id_categorie = $produit->id_categorie; // Récupérer l'ID de la catégorie du produit

                $carte->prix = $request->prix;
                $carte->save();

                return response()->json([
                    'message' => "Carte successfully updated."
                ], 200);
            }

        }
        public function show($id)
    {

            $carte = Cartes::with('produit')->findOrFail($id);

            return response()->json($carte);

    }

    public function destroy($id)
    {

            // Trouver la carte à supprimer
            $carte = Cartes::findOrFail($id);

            // Supprimer la carte
            $carte->delete();

            return response()->json(['message' => 'Carte successfully deleted.'], 200);

    }

}
