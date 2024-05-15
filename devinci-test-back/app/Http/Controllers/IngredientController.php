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
            'photo' => 'required|nullable|file|mimes:jpeg,png,jpg,gif,svg|max:1999', // L'envoi de photo est facultatif

        ], [
            'name_ingredient.required' => 'Le champ nom d\'ingrédient est requis.',
            'name_ingredient.unique' => 'Ce nom d\'ingrédient existe déjà.',
            'name_ingredient.regex' => 'Le champ nom d\'ingrédient doit contenir uniquement des lettres et des espaces.',
            'photo.file' => 'Le champ photo doit être un fichier.',
            'photo.required' => 'Le champ photo est requis.',

            'photo.mimes' => 'Le champ photo doit être un fichier de type : jpeg, png, jpg, gif ou svg.',
            'photo.max' => 'Le champ photo ne doit pas dépasser :max kilo-octets.',
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



            // Validation
            $validator = Validator::make($request->all(), [
                'name_ingredient' => ['required', 'regex:/^[A-Za-z\s]+$/'],
                'photo' => 'required|nullable|file|mimes:jpeg,png,jpg,gif,svg|max:1999', // L'envoi de photo est facultatif
            ], [
                'name_ingredient.required' => 'Le champ nom d\'ingrédient est requis.',
                'name_ingredient.regex' => 'Le champ nom d\'ingrédient doit contenir uniquement des lettres et des espaces.',
                'photo.required' => 'Le champ photo est requis.',

                'photo.file' => 'Le champ photo doit être un fichier.',
                'photo.mimes' => 'Le champ photo doit être un fichier de type : jpeg, png, jpg, gif ou svg.',
                'photo.max' => 'Le champ photo ne doit pas dépasser :max kilo-octets.',
            ]);


            if ($validator->fails()) {
                return response()->json([
                    'validation_errors' => $validator->messages(),
                ]);
            }else{
                // Find Ingredient
            $ingredient = Ingredient::find($id);
            if(!$ingredient){
                return response()->json([
                   'message'=>'Ingredient Not Found.'
                ],404);
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

            // Update Ingredient

            return response()->json([
                'message' => "Ingredient successfully updated."
            ],200);
            }
         }
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
