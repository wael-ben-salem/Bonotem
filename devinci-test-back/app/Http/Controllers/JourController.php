<?php

namespace App\Http\Controllers;

use App\Models\Jour;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class JourController extends Controller {

    public function jour() {
        $jours = Jour::all();
        return response()->json($jours);
    }

    public function addJour(Request $request) {
        $validator = Validator::make($request->all(), [
            'nom' => 'required|string|unique:jours',  // Correct table name
        ]);

        if ($validator->fails()) {
            return response()->json(['validation_errors' => $validator->messages()], 400);
        }

        $jour = Jour::create([
            'nom' => $request->nom,
        ]);

        return response()->json([
            'status' => 201,  // Changed to 201 for created resource
            'message' => 'Jour created successfully!',
            'data' => $jour,
        ], 201);  // Changed to 201 for created resource
    }

    public function showJour($id) {
        $jour = Jour::find($id);

        if (!$jour) {
            return response()->json(['message' => 'Jour not found'], 404);
        }

        return response()->json($jour);
    }

    public function updateJour(Request $request, $id) {
        $jour = Jour::find($id);

        if (!$jour) {
            return response()->json(['message' => 'Jour not found'], 404);
        }

        $validator = Validator::make($request->all(), [
            'nom' => 'sometimes|required|string|unique:jours,nom,' . $id,  // Ensure the name is unique except for this specific id
        ]);

        if ($validator->fails()) {
            return response()->json(['validation_errors' => $validator->messages()], 400);
        }

        $jour->update($request->all());

        return response()->json([
            'message' => 'Jour updated successfully.',
        ], 200);
    }

    public function deleteJour($id) {
        $jour = Jour::find($id);

        if (!$jour) {
            return response()->json(['message' => 'Jour not found'], 404);
        }

        $jour->delete();

        return response()->json(['message' => 'Jour successfully deleted'], 200);
    }
}
