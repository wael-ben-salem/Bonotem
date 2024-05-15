<?php

namespace App\Http\Controllers;

use App\Models\Ingredient;
use App\Models\Produit;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class IngredientProduitController extends Controller
{
    public function associerIngrédients(Request $request, $produitId)
    {
        // Validate the incoming request
        $validator = Validator::make($request->all(), [
            'ingredients' => 'required|array',
            'ingredients.*.id_ingredient' => 'required|exists:ingredients,id',
            'ingredients.*.quantite' => 'required|numeric|min:0',
        ], [
            'ingredients.required' => 'Le champ des ingrédients est requis.',
            'ingredients.array' => 'Le champ des ingrédients doit être un tableau.',
            'ingredients.*.id_ingredient.required' => 'L\'identifiant de l\'ingrédient est requis.',
            'ingredients.*.id_ingredient.exists' => 'L\'identifiant de l\'ingrédient sélectionné n\'existe pas.',
            'ingredients.*.quantite.required' => 'La quantité de l\'ingrédient est requise.',
            'ingredients.*.quantite.numeric' => 'La quantité de l\'ingrédient doit être un nombre.',
            'ingredients.*.quantite.min' => 'La quantité de l\'ingrédient doit être d\'au moins :min.',
        ]);


        if ($validator->fails()) {
            return response()->json([
                'validation_errors' => $validator->messages(),
            ]);
        } else if ($request->has('ingredients')) {
            // Récupérer le produit
            $produit = Produit::findOrFail($produitId);

            $ingredients = $request->input('ingredients');

            // Boucler sur les ingrédients fournis
            foreach ($ingredients as $ingredient) {
                // Récupérer l'ID de l'ingrédient et la quantité fournies
                $ingredientId = $ingredient['id_ingredient'];
                $quantite = $ingredient['quantite'];

                // Fetch the ingredient from the database
                $ingredientModel = Ingredient::findOrFail($ingredientId);
                // Get the unite_id from the ingredient
                $uniteId = $ingredientModel->unite_id;

                // Associer l'ingrédient au produit avec la quantité et l'unité
                $produit->ingredients()->attach($ingredientId, ['quantite' => $quantite, 'unite_id' => $uniteId]);
            }

            return response()->json(['message' => 'Ingrédients associés avec succès au produit avec l\'unité.']);
        }

        // Retourner une réponse
    }
    }
