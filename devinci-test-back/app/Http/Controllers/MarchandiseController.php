<?php

namespace App\Http\Controllers;

use App\Models\Ingredient;
use App\Models\Marchandise;
use App\Models\Packaging\Packaging;
use App\Models\Unite;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class MarchandiseController extends Controller
{
    public function marchandise()
    {
        $marchandises = Marchandise::with('ingredient' , 'packaging' , 'fournisseur','unite')->get();
        return response()->json($marchandises);
    }


    public function addIngredient(Request $request)
    {
        // Validate the incoming request data
        $validator = Validator::make($request->all(), [
            'nom' => 'required|string',
            'reference' => 'required|string',
            'id_ingredient' => 'required|exists:ingredients,id', // Change to existing ingredient ID or remove if using packaging
            'quantite' => 'required|integer|min:0',
            'id_fournisseur' => 'nullable|exists:fournisseurs,id',
            'unite_id' => 'nullable|exists:unites,id',

            'prix' => 'required|numeric|min:0',
            'date_achat' => 'required|date',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'validation_errors' => $validator->messages(),
            ], 400);
        }

        // Retrieve the ingredient by its ID
        $ingredient = Ingredient::find($request->id_ingredient);

        // Create the Marchandise instance with the ingredient ID
        $marchandise = Marchandise::create([
            'nom' => $request->nom,
            'reference' => $request->reference,
            'id_ingredient' => $request->id_ingredient,
            'quantite' => $request->quantite,
            'id_fournisseur' => $request->id_fournisseur,
            'prix' => $request->prix,
            'date_achat' => $request->date_achat,
            'unite_id' => $request->unite_id,
        ]);

        return response()->json([
            'status' => 200,
            'message' => 'Marchandise created successfully!',
            'data' => $marchandise,
        ], 200);
    }



    public function addPackaging(Request $request)
    {
        // Validate the incoming request data
        $validator = Validator::make($request->all(), [
            'nom' => 'required|string',
            'reference' => 'required|string',
            'id_packaging' => 'required|exists:packagings,id', // Change to existing ingredient ID or remove if using packaging
            'dimension' =>'required|exists:packagings,dimension',
            'quantite' => 'required|integer|min:0',
            'id_fournisseur' => 'nullable|exists:fournisseurs,id',
            'unite_id' => 'nullable|exists:unites,id',

            'prix' => 'required|numeric|min:0',
            'date_achat' => 'required|date',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'validation_errors' => $validator->messages(),
            ], 400);
        }

        // Retrieve the ingredient by its ID
        $ingredient = Ingredient::find($request->id_ingredient);

        // Create the Marchandise instance with the ingredient ID
        $marchandise = Marchandise::create([
            'nom' => $request->nom,
            'reference' => $request->reference,
            'id_packaging' => $request->id_packaging,
            'dimension' => $request->dimension,

            'quantite' => $request->quantite,
            'id_fournisseur' => $request->id_fournisseur,
            'prix' => $request->prix,
            'date_achat' => $request->date_achat,
            'unite_id' => $request->unite_id,
        ]);

        return response()->json([
            'status' => 200,
            'message' => 'Marchandise created successfully!',
            'data' => $marchandise,
        ], 200);
    }


    public function updatePackaging(Request $request, $id)
    {
        // Validate the incoming request data
        $validator = Validator::make($request->all(), [
            'nom' => 'required|string',
            'reference' => 'required|string',
            'id_packaging' => 'required|exists:packagings,id',
            'dimension' =>'required|exists:packagings,dimension',
            'quantite' => 'required|integer|min:0',
            'id_fournisseur' => 'nullable|exists:fournisseurs,id',
            'unite_id' => 'nullable|exists:unites,id',
            'prix' => 'required|numeric|min:0',
            'date_achat' => 'required|date',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'validation_errors' => $validator->messages(),
            ], 400);
        }

        // Retrieve the Marchandise instance by its ID
        $marchandise = Marchandise::find($id);

        if (!$marchandise) {
            return response()->json([
                'message' => 'Marchandise not found!',
            ], 404);
        }

        // Update the Marchandise instance with the new data
        $marchandise->update([
            'nom' => $request->nom,
            'reference' => $request->reference,
            'id_packaging' => $request->id_packaging,
            'dimension' => $request->dimension,
            'quantite' => $request->quantite,
            'id_fournisseur' => $request->id_fournisseur,
            'prix' => $request->prix,
            'date_achat' => $request->date_achat,
            'unite_id' => $request->unite_id,
        ]);

        return response()->json([
            'status' => 200,
            'message' => 'Marchandise updated successfully!',
            'data' => $marchandise,
        ], 200);
    }

public function updateIngredient(Request $request, $id)
{
    // Validate the incoming request data
    $validator = Validator::make($request->all(), [
        'nom' => 'required|string',
        'reference' => 'required|string',
        'id_ingredient' => 'required|exists:ingredients,id', // Change to existing ingredient ID or remove if using packaging
        'quantite' => 'required|integer|min:0',
        'id_fournisseur' => 'nullable|exists:fournisseurs,id',
        'unite_id' => 'nullable|exists:unites,id',
        'prix' => 'required|numeric|min:0',
        'date_achat' => 'required|date',
    ]);

    if ($validator->fails()) {
        return response()->json([
            'validation_errors' => $validator->messages(),
        ], 400);
    }

    // Retrieve the Marchandise by its ID
    $marchandise = Marchandise::find($id);

    if (!$marchandise) {
        return response()->json([
            'message' => 'Marchandise not found',
        ], 404);
    }
    $ingredient = Ingredient::find($request->id_ingredient);

    // Update the Marchandise details
    $marchandise->update([
        'nom' => $request->nom,
        'reference' => $request->reference,
        'quantite' => $request->quantite,
        'id_ingredient' => $request->id_ingredient,

        'id_fournisseur' => $request->id_fournisseur,
        'prix' => $request->prix,
        'date_achat' => $request->date_achat,
        'unite_id' => $request->unite_id,
    ]);

    return response()->json([
        'status' => 200,
        'message' => 'Marchandise updated successfully!',
        'data' => $marchandise,
    ], 200);
}


    public function showMarchandise($id)
    {
        $marchandise = Marchandise::with('ingredient' , 'packaging' , 'fournisseur')->find($id); // Load the role information
        if (!$marchandise) {
            return response()->json([
                'message' => 'Marchandise Not Found.'
            ], 404);
        }
        return response()->json([
            'marchandise' => $marchandise
        ], 200);
    }







    public function destroy($id)
    {
        $marchandise = Marchandise::find($id);

        if (!$marchandise) {
            return response()->json([
                'success' => false,
                'message' => 'Marchandise non trouvé',
            ], 404);
        }

        try {
            $marchandise->delete();
            return response()->json([
                'success' => true,
                'message' => 'Marchandise supprimé avec succès',
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Erreur lors de la suppression du produit',
                'error' => $e->getMessage(),
            ], 500);
        }
    }


}
