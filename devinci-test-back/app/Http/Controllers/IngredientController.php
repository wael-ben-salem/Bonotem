<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Ingredient;
use App\Models\Unite;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Validator;

class IngredientController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function ingredient()
{
    $ingredients = Ingredient::with('produits','ingredientCompose')->get();
    return response()->json($ingredients);

}


    /**
     * Store a newly created resource in storage.
     */
    public function addIngredient(Request $request)
    {

        $validator = Validator::make($request->all(), [
            'name_ingredient' => ['required', 'unique:ingredients', 'regex:/^[A-Za-z\s]+$/'],
            'photo' => 'nullable|file|mimes:jpeg,png,jpg,gif,svg|max:1999', // Image upload is optional

        ]);

        if ($validator->fails()) {
            return response()->json([
                'validation_errors' => $validator->messages(),
            ]);
        }
        else {
            $ingredient = new Ingredient();
            $ingredient->name_ingredient = $request->name_ingredient;


            if ($request->hasFile('photo')) {
                $photo = $request->file('photo');
                $filename = time() . '.' . $photo->getClientOriginalExtension();
                $photo->storeAs('public', $filename);
                $ingredient->photo = $filename;
            }

            $ingredient->save();

                return response()->json([
                'status' => 200,
                'nom ingredient' => $ingredient->name_ingredient,
               'message' => 'added Success',
            ],200);
        }
    }


    public function updateIngredient(Request $request, $id)
    {

            // Find Ingredient
            $ingredient = Ingredient::find($id);
            if(!$ingredient){
                return response()->json([
                   'message'=>'Ingredient Not Found.'
                ],404);
            }

            // Validation
            $validator = Validator::make($request->all(), [
                'name_ingredient' => ['required', 'regex:/^[A-Za-z\s]+$/'],
            ]);

            if ($validator->fails()) {
                return response()->json([
                    'validation_errors' => $validator->messages(),
                ]);
            }else{
                $ingredient->name_ingredient = $request->name_ingredient;

                // Check if 'photo_url' exists in the request and update the photo attribute
            if ($request->hasFile('photo')) {
                $photo = $request->file('photo');
                $filename = time() . '.' . $photo->getClientOriginalExtension();
                $photo->storeAs('public', $filename);
                $ingredient->photo = $filename;
            }

            $ingredient->save();
            }

            // Update Ingredient

            return response()->json([
                'message' => "Ingredient successfully updated."
            ],200);
        }



    public function show($id)
    {
        $ingredient = Ingredient::find($id);
        if (!$ingredient) {
            return response()->json(['error' => 'Ingrédient nexiste pas'], 404);
        }
        return response()->json($ingredient);
    }




    public function destroy($id)
    {
        $ingredient = Ingredient::findOrFail($id);
        $ingredient->delete();

        return response()->json([
            'success' => true,
            'message' => 'Ingrédient supprimé avec succès',
        ], 200);
    }
}
