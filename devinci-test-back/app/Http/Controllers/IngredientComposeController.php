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

public function IngredientCompose()
{
    $produits = IngredientCompose::with('ingredients')->get();
    return response()->json($produits);
}

    /**
     * Show the form for creating a new resource.
     */
    public function addIngredientCompose(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name_ingredient_compose' => ['required', 'regex:/^[A-Za-z\s]+$/'],
            'photo' => 'nullable|file|mimes:jpeg,png,jpg,gif,svg|max:1999', // Image upload is optional
            'ingredientsComposes' => 'required|array', // Validation for ingredients array
            'ingredientsComposes.*.id_ingredient' => 'required|exists:ingredients,id',
            'ingredientsComposes.*.quantite' => 'required|numeric|min:0',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'validation_errors' => $validator->messages(),
            ]);
        }

        // Create a new IngredientCompose instance
        $ingredientcompose = new IngredientCompose();
        $ingredientcompose->name_ingredient_compose = $request->name_ingredient_compose;

        // Handle photo upload
        if ($request->hasFile('photo')) {
            $photo = $request->file('photo');
            $filename = time() . '.' . $photo->getClientOriginalExtension();
            $photo->storeAs('public', $filename);
            $ingredientcompose->photo = $filename;
        }

        // Save the IngredientCompose instance to the database
        $ingredientcompose->save();

        // Associating ingredients with the IngredientCompose
        foreach ($request->ingredientsComposes as $ingredient) {
            $ingredientcompose->ingredients()->attach($ingredient['id_ingredient'], [
                'quantite' => $ingredient['quantite'],
            ]);
        }

        return response()->json([
            'status' => 200,
            'name_ingredientComposé' => $ingredientcompose->name_ingredient_compose,
            'message' => 'ingredientcompose ajouté avec succès et ingrédients associés.',
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
        $ingredient = IngredientComposeController::findOrFail($id);
        $ingredient->delete();

        return response()->json([
            'success' => true,
            'message' => 'Ingrédient supprimé avec succès',
        ], 200);
    }

    /**
     * Update the specified resource in storage.
     */
    public function updateIngredientCompose(Request $request, $id)
    {

            // Find Ingredient
            $ingredientcompose = IngredientCompose::find($id);
            if(!$ingredientcompose){
                return response()->json([
                   'message'=>'IngredientCompose Not Found.'
                ],404);
            }

            // Validation
            $validator = Validator::make($request->all(), [
                'name_ingredient_compose' =>['required', 'regex:/^[A-Za-z\s]+$/'],
                'ingredientsComposes' => 'required|array', // Validation for ingredients array
            'ingredientsComposes.*.id_ingredient' => 'required|exists:ingredients,id',
            'ingredientsComposes.*.quantite' => 'required|numeric|min:0',
            'photo' => 'nullable|file|mimes:jpeg,png,jpg,gif,svg|max:1999', // Image upload is optional



            ]);

            if ($validator->fails()) {
                return response()->json([
                    'validation_errors' => $validator->messages(),
                ]);
            }else{
                $ingredientcompose->name_ingredient_compose = $request->name_ingredient_compose;

                // Check if 'photo_url' exists in the request and update the photo attribute
                if ($request->hasFile('photo')) {
                    $photo = $request->file('photo');
                    $filename = time() . '.' . $photo->getClientOriginalExtension();
                    $photo->storeAs('public', $filename);
                    $ingredientcompose->photo = $filename;
                }

            $ingredientcompose->save();


            $ingredientcompose->ingredients()->sync([]);
            foreach ($request->ingredientsComposes as $ingredient) {
                $ingredientcompose->ingredients()->attach($ingredient['id_ingredient'], [
                    'quantite' => $ingredient['quantite'],
                ]);
            }


            // Update Ingredient

            return response()->json([
                'message' => "Ingredient successfully updated."
            ],200);
        }
    }


}
