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
    public function planning($id) {
        // Chargement en avance des relations personnel, jour et typePersonnel
        $plannings = Planning::with(['personnel', 'personnel.typePersonnel', 'jour'])->where('id_creator', $id)
        ->get();
        return response()->json($plannings);
    }

    public function addPlanning(Request $request,$id) {
        $validator = Validator::make($request->all(), [
            'jour_id' => 'required|exists:jours,id',
            'heure_debut' => 'required|date_format:H:i',
            'heure_fin' => 'required|date_format:H:i',
            'taux_heure' =>'required|numeric',
            'personnel_id' => 'nullable|exists:personnels,id',
        ]);

        if ($validator->fails()) {
            return response()->json(['validation_errors' => $validator->messages()], 422);
        }
        try {
            $planning = Planning::create([
                'jour_id' => $request->jour_id,
                'heure_debut' => $request->heure_debut,
                'heure_fin' => $request->heure_fin,
                'taux_heure' => $request->taux_heure,
                'personnel_id' => $request->personnel_id,
                'id_creator' => $id,

            ]);

            return response()->json([
                'status' => 201,
                'message' => 'Planning created successfully!',
                'data' => $planning,
            ]);
        } catch (\Exception $e) {
            Log::error('Failed to create planning: ' . $e->getMessage());
            return response()->json(['message' => 'Server error'], 500);
        }
    }
    public function updateAllPlanningsForPersonnel(Request $request, $personnelId) {
        // Validate the request parameters
        $validator = Validator::make($request->all(), [
            'heure_debut' => 'required|date_format:H:i',
            'heure_fin' => 'required|date_format:H:i',
            'taux_heure' => 'required|numeric',
            'jour_id' => 'required|exists:jours,id',
        ]);

        if ($validator->fails()) {
            return response()->json(['validation_errors' => $validator->messages()], 422);
        }

        // Retrieve all plannings for the given personnel and jour_id
        $plannings = Planning::where('personnel_id', $personnelId)
                              ->where('jour_id', $request->jour_id)
                              ->get();

        if ($plannings->isEmpty()) {
            return response()->json(['message' => 'No plannings found for the specified personnel on the given day'], 404);
        }

        // Update each planning entry
        foreach ($plannings as $planning) {
            $planning->heure_debut = $request->heure_debut;
            $planning->heure_fin = $request->heure_fin;
            $planning->taux_heure = $request->taux_heure;
            $planning->save();
        }

        return response()->json([
            'message' => 'planning updated successfully',
            'updated_count' => $plannings->count()
        ], 200);
    }
    public function deleteAllPlanningsForPersonnel($personnelId)
{
    // Assuming you have a relationship set up to fetch plannings related to personnel
    $personnel = Personnel::findOrFail($personnelId);
    $personnel->plannings()->delete();

    return response()->json(['message' => 'All plannings for the specified personnel have been deleted.']);
}
//update function
public function updatePlanning(Request $request) {
    $validator = Validator::make($request->all(), [
        'personnel_id' => 'required|exists:personnels,id',
        'jour_id' => 'required|exists:jours,id',
        'heure_debut' => 'required|date_format:H:i',
        'heure_fin' => 'required|date_format:H:i',
        'taux_heure' => 'required|numeric',
    ]);

    if ($validator->fails()) {
        return response()->json(['validation_errors' => $validator->messages()], 422);
    }

    // Fetch the planning object based on personnel_id and jour_id, or however you identify the specific planning record
    $planning = Planning::where('personnel_id', $request->personnel_id)
                        ->where('jour_id', $request->jour_id)
                        ->first();

    if (!$planning) {
        return response()->json(['message' => 'Planning not found'], 404);
    }

    $planning->heure_debut = $request->heure_debut;
    $planning->heure_fin = $request->heure_fin;
    $planning->taux_heure = $request->taux_heure;
    $planning->save();

    return response()->json(['message' => 'Planning updated successfully'], 200);
}

    public function deletePlanning($id) {
        try {

            $planning = Planning::find($id);

            if (!$planning) {
                return response()->json(['message' => 'Planning not found'], 404);
            }


            $planning->delete();

            return response()->json(['message' => 'Planning successfully deleted'], 200);
        } catch (\Exception $e) {
            Log::error('Failed to delete planning: ' . $e->getMessage());

            return response()->json(['message' => 'Server error'], 500);
        }
    }
}
