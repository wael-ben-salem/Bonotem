<?php

namespace App\Http\Controllers;

use App\Models\IngredientCompose;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class IngredientComposeController extends Controller
{
    /**
     * Display a listing of the resource.
     */

public function IngredientCompose($id)
{
    $produits = IngredientCompose::with('ingredients','categorie')->where('id_creator', $id)
    ->get();
    return response()->json($produits);
}

    /**
     * Show the form for creating a new resource.
     */
    public function addIngredientCompose(Request $request, $id)
    {
        // Validate request data
        $validator = Validator::make($request->all(), [
            'name_ingredient_compose' => [
                'required',
                'regex:/^[A-Za-z\s]+$/',
            ],
            'photo' => 'nullable|file|mimes:jpeg,png,jpg,gif,svg|max:1999',
            'ingredientsComposes' => 'required|array',
            'ingredientsComposes.*.id_ingredient' => 'required|exists:ingredients,id',
            'ingredientsComposes.*.quantite' => 'required|numeric|min:0',
            'id_categorie' => 'required|exists:categories,id',
        ], [
            'name_ingredient_compose.required' => 'Le champ nom d\'ingrédient est requis.',
            'name_ingredient_compose.regex' => 'Le champ nom d\'ingrédient doit contenir uniquement des lettres et des espaces.',
            'photo.file' => 'Le champ photo doit être un fichier.',
            'photo.mimes' => 'Le champ photo doit être un fichier de type : jpeg, png, jpg, gif ou svg.',
            'photo.max' => 'Le champ photo ne doit pas dépasser 1999 kilo-octets.',
            'ingredientsComposes.required' => 'Le tableau des ingrédients est requis.',
            'ingredientsComposes.array' => 'Le champ des ingrédients doit être un tableau.',
            'ingredientsComposes.*.id_ingredient.required' => 'L\'identifiant de l\'ingrédient est requis.',
            'ingredientsComposes.*.id_ingredient.exists' => 'L\'identifiant de l\'ingrédient sélectionné n\'existe pas.',
            'ingredientsComposes.*.quantite.required' => 'La quantité de l\'ingrédient est requise.',
            'ingredientsComposes.*.quantite.numeric' => 'La quantité de l\'ingrédient doit être un nombre.',
            'ingredientsComposes.*.quantite.min' => 'La quantité de l\'ingrédient doit être d\'au moins 0.',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'validation_errors' => $validator->messages(),
            ]);
        }

        $ingredientcompose = IngredientCompose::where('name_ingredient_compose', $request->name_ingredient_compose)
            ->where('id_creator', $id)
            ->first();

        if ($ingredientcompose) {
            // Update existing ingredient compose
            $ingredientcompose->update([
                'name_ingredient_compose' => $request->name_ingredient_compose,
                'id_categorie' => $request->id_categorie,
            ]);
            if ($request->hasFile('photo')) {
                $photo = $request->file('photo');
                $filename = time() . '.' . $photo->getClientOriginalExtension();
                $photo->storeAs('public', $filename);
                $ingredientcompose->photo = $filename;

            }

            $ingredientcompose->save();
        } else {
            // Create a new ingredient compose
            $ingredientcompose = IngredientCompose::create([
                'name_ingredient_compose' => $request->name_ingredient_compose,
                'id_categorie' => $request->id_categorie,
                'id_creator' => $id,
            ]);

          // Handle the photo upload if it's present in the request
        if ($request->hasFile('photo')) {
            $photo = $request->file('photo');
            $filename = time() . '.' . $photo->getClientOriginalExtension();
            $photo->storeAs('public', $filename);
            $ingredientcompose->photo = $filename;

        }

        $ingredientcompose->save();
    }
        // Attach ingredients to the ingredient compose
        foreach ($request->ingredientsComposes as $ingredient) {
            $pivotData = ['quantite' => $ingredient['quantite']];

            $existingPivotData = $ingredientcompose->ingredients()
                ->where('id_ingredient', $ingredient['id_ingredient'])
                ->first();

            if ($existingPivotData) {
                // Update existing pivot data
                $existingPivotData->pivot->quantite += $ingredient['quantite'];
                $existingPivotData->pivot->save();
            } else {
                // Attach new ingredient
                $ingredientcompose->ingredients()->attach($ingredient['id_ingredient'], $pivotData);
            }
        }

        return response()->json([
            'status' => 200,
            'name_ingredient_compose' => $ingredientcompose->name_ingredient_compose,
            'id_categorie' => $ingredientcompose->id_categorie,
            'id_creator' => $ingredientcompose->id_creator,
            'message' => 'Ingredient compose ajouté avec succès et ingrédients associés.',
        ], 200);
    }

    public function show($id)
    {
        $ingredient = IngredientComposeController::find($id);
        if (!$ingredient) {
            return response()->json(['error' => 'Ingrédient nexiste pas'], 404);
        }
        return response()->json($ingredient);
    }




    public function destroy($id)
    {
        $ingredientCompose = IngredientCompose::find($id);

        if (!$ingredientCompose) {
            return response()->json([
                'success' => false,
                'message' => 'ingredientCompose non trouvé',
            ], 404);
        }


            $ingredientCompose->delete();
            return response()->json([
                'success' => true,
                'message' => 'ingredientCompose supprimé avec succès',
            ], 200);

    }



    public function updateIngredientCompose(Request $request, $id)
    {
        // Find Ingredient Compose
        $ingredientcompose = IngredientCompose::find($id);
        if (!$ingredientcompose) {
            return response()->json([
                'message' => 'IngredientCompose Not Found.'
            ], 404);
        }

        // Validation
        $validator = Validator::make($request->all(), [
            'name_ingredient_compose' => ['required', 'regex:/^[A-Za-z\s]+$/'],
            'id_categorie' => 'required|exists:categories,id',
            'ingredientsComposes' => 'required|array', // Validation pour le tableau d'ingrédients
            'ingredientsComposes.*.id_ingredient' => 'required|exists:ingredients,id',
            'ingredientsComposes.*.quantite' => 'required|numeric|min:0',
            'photo' => 'nullable|file|mimes:jpeg,png,jpg,gif,svg|max:1999', // L'envoi de photo est facultatif
        ], [
            'name_ingredient_compose.required' => 'Le champ nom d\'ingrédient est requis.',
            'name_ingredient_compose.regex' => 'Le champ nom d\'ingrédient doit contenir uniquement des lettres et des espaces.',
            'id_categorie.required' => 'Le champ catégorie est requis.',
            'id_categorie.exists' => 'La catégorie sélectionnée n\'existe pas.',
            'ingredientsComposes.required' => 'Le tableau des ingrédients est requis.',
            'ingredientsComposes.array' => 'Le champ des ingrédients doit être un tableau.',
            'ingredientsComposes.*.id_ingredient.required' => 'L\'identifiant de l\'ingrédient est requis.',
            'ingredientsComposes.*.id_ingredient.exists' => 'L\'identifiant de l\'ingrédient sélectionné n\'existe pas.',
            'ingredientsComposes.*.quantite.required' => 'La quantité de l\'ingrédient est requise.',
            'ingredientsComposes.*.quantite.numeric' => 'La quantité de l\'ingrédient doit être un nombre.',
            'ingredientsComposes.*.quantite.min' => 'La quantité de l\'ingrédient doit être d\'au moins :min.',
            'photo.file' => 'Le champ photo doit être un fichier.',
            'photo.mimes' => 'Le champ photo doit être un fichier de type : jpeg, png, jpg, gif ou svg.',
            'photo.max' => 'Le champ photo ne doit pas dépasser :max kilo-octets.',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'validation_errors' => $validator->messages(),
            ]);
        }

        // Update Ingredient Compose
        $ingredientcompose->name_ingredient_compose = $request->name_ingredient_compose;
        $ingredientcompose->id_categorie = $request->id_categorie;

        // Check if 'photo' exists in the request and update the photo attribute
        if ($request->hasFile('photo')) {
            $photo = $request->file('photo');
            $filename = time() . '.' . $photo->getClientOriginalExtension();
            $photo->storeAs('public', $filename);
            $ingredientcompose->photo = $filename;
        }

        $ingredientcompose->save();

        // Sync Ingredients
        foreach ($request->ingredientsComposes as $ingredient) {
            $existingIngredient = $ingredientcompose->ingredients()->where('id_ingredient', $ingredient['id_ingredient'])->first();

            if ($existingIngredient) {
                // Update the quantity of the existing ingredient
                $ingredientcompose->ingredients()->updateExistingPivot($ingredient['id_ingredient'], ['quantite' => $ingredient['quantite']]);
            } else {
                // Attach the new ingredient with the specified quantity
                $ingredientcompose->ingredients()->attach($ingredient['id_ingredient'], ['quantite' => $ingredient['quantite']]);
            }
        }

        return response()->json([
            'status' => 200,
            'name_ingredient_compose' => $ingredientcompose->name_ingredient_compose,
            'id_categorie' => $ingredientcompose->id_categorie,
            'message' => "IngredientCompose successfully updated."
        ], 200);
    }




}
