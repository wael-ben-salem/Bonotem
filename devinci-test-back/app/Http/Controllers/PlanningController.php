<?php

namespace App\Http\Controllers;

use App\Models\Planning;
use App\Models\Personnel;
use App\Models\TypePersonnel;
use App\Models\Jour;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Log;

class PlanningController extends Controller {
    public function planning() {
        // Chargement en avance des relations personnel, jour et typePersonnel
        $plannings = Planning::with(['personnel', 'personnel.typePersonnel', 'jour'])->get();
        return response()->json($plannings);
    }

    public function addPlanning(Request $request) {
        $validator = Validator::make($request->all(), [
            'jour_id' => 'required|exists:jours,id',  // Make sure table name is correct
            'heure_debut' => 'required|date_format:H:i',
            'heure_fin' => 'required|date_format:H:i',
            'personnel_id' => 'nullable|exists:personnels,id',
        ]);

        if ($validator->fails()) {
            return response()->json(['validation_errors' => $validator->messages()], 422); // Use 422 for validation errors
        }



        try {
            $planning = Planning::create([
                'jour_id' => $request->jour_id,
                'heure_debut' => $request->heure_debut,
                'heure_fin' => $request->heure_fin,
                'personnel_id' => $request->personnel_id,
            ]);

            return response()->json([
                'status' => 201,
                'message' => 'Planning created successfully!',
                'data' => $planning,
            ]);
        } catch (\Exception $e) {
            Log::error('Failed to create planning: ' . $e->getMessage());
            return response()->json(['message' => 'Server error'], 500); // Server error handling
        }
    }


    public function updatePlanning(Request $request, $id) {
        try {
            // Find the specified Planning
            $planning = Planning::find($id);
            if (!$planning) {
                return response()->json([
                    'message' => 'Planning not found.',
                ], 404);
            }

            // Update the Planning instance with new data
            $planning->update($request->all());

            return response()->json([
                'message' => "Planning successfully updated.",
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'message' => "Something went wrong!",
            ], 500);
        }
    }

    public function deletePlanning($id) {
        try {
            // Find the specified Planning
            $planning = Planning::find($id);

            if (!$planning) {
                return response()->json(['message' => 'Planning not found'], 404);
            }

            // Delete the Planning
            $planning->delete();

            return response()->json(['message' => 'Planning successfully deleted'], 200);
        } catch (\Exception $e) {
            Log::error('Failed to delete planning: ' . $e->getMessage());

            return response()->json(['message' => 'Server error'], 500);
        }
    }
}
