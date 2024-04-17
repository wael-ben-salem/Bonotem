<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Ingredient;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Validator;

class IngredientController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $ingredients = Ingredient::all();
        return response()->json($ingredients);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        Log::info($request->all());
        $validator = Validator::make($request->all(), [
            'name_ingredient' => 'required|string|max:255',
            'unit_measure' => 'nullable|integer',
            'id_fournisseur' => 'nullable|integer',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 400);
        }

        $validatedData = $validator->validated();

        $ingredient = new Ingredient();
        $ingredient->name_ingredient = $validatedData['name_ingredient'];
        $ingredient->unit_measure = $validatedData['unit_measure'];
        $ingredient->id_fournisseur = $validatedData['id_fournisseur'];

        $ingredient->save();

        return response()->json([
            'success' => true,
            'message' => 'Ingrédient ajouté avec succès',
            'ingredient' => $ingredient
        ], 201);
    }

public function update(Request $request, $id)
    {
        try {
            // Find User
            $ingredient = Ingredient::find($id);
            if(!$ingredient){
                return response()->json([
                   'message'=>'User Not Found.'
                ],404);
            }

            //echo "request : $request->image";
            $ingredient->update($request->all());

            return response()->json([
                'message' => " successfully updated."
            ],200);
        } catch (\Exception $e) {
            // Return Json Response
            return response()->json([
                'message' => "Something went really wrong!"
            ],500);
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
