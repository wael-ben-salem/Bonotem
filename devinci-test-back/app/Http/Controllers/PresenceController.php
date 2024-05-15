<?php

namespace App\Http\Controllers;

use App\Models\Presence;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Log;

class PresenceController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function presence()
    {
        $presences = Presence::with('planning')->get();
        return response()->json($presences);
    }

    public function addPresence(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'heure_debut_reelle' => 'required|date_format:H:i',
            'heure_fin_reelle' => 'required|date_format:H:i',
            'date' => 'required|date_format:d/m/Y',
            'taux_horaire_reelle' => 'required|numeric',
            'planning_id' => 'required|exists:plannings,id',
        ]);

        if ($validator->fails()) {
            return response()->json(['validation_errors' => $validator->messages()], 422);
        }

        $date = \DateTime::createFromFormat('d/m/Y', $request->date);
        if (!$date) {
            return response()->json(['error' => 'Invalid date format'], 422);
        }
        $formattedDate = $date->format('Y-m-d');

        try {
            $presence = Presence::create([
                'heure_debut_reelle' => $request->heure_debut_reelle,
                'heure_fin_reelle' => $request->heure_fin_reelle,
                'date' => $formattedDate,
                'taux_horaire_reelle' => $request->taux_horaire_reelle,
                'planning_id' => $request->planning_id,
            ]);
            return response()->json([
                'status' => 201,
                'presence' => $presence,
                'message' => 'Presence added successfully',
            ], 201);
        } catch (\Exception $e) {
            Log::error('Failed to add presence: ' . $e->getMessage());
            return response()->json(['message' => 'Server error'], 500);
        }
    }

    public function showPresence($id)
    {
        $presence = Presence::with(['personnel', 'planning'])->find($id);

        if (!$presence) {
            return response()->json(['message' => 'Presence not found'], 404);
        }

        return response()->json([
            'presence' => $presence,
            'message' => 'Presence retrieved successfully'
        ], 200);
    }

    public function updatePresence(Request $request, $id)
    {
        $presence = Presence::find($id);

        if (!$presence) {
            return response()->json(['message' => 'Presence not found'], 404);
        }

        $validator = Validator::make($request->all(), [
            'heure_debut_reelle' => 'required|date_format:H:i',
            'heure_fin_reelle' => 'required|date_format:H:i',
            'date' => 'required|date_format:d/m/Y',
            'taux_horaire_reelle' => 'required|numeric',
            'planning_id' => 'required|exists:plannings,id',
        ]);

        if ($validator->fails()) {
            return response()->json(['validation_errors' => $validator->messages()], 422);
        }

        $date = \DateTime::createFromFormat('d/m/Y', $request->date);
        if (!$date) {
            return response()->json(['error' => 'Invalid date format'], 422);
        }
        $formattedDate = $date->format('Y-m-d');

        $presence->update([
            'heure_debut_reelle' => $request->heure_debut_reelle,
            'heure_fin_reelle' => $request->heure_fin_reelle,
            'date' => $formattedDate,
            'taux_horaire_reelle' => $request->taux_horaire_reelle,
            'planning_id' => $request->planning_id,
        ]);

        return response()->json([
            'message' => 'Presence successfully updated',
            'presence' => $presence,
        ], 200);
    }

    public function deletePresence($id)
    {
        $presence = Presence::find($id);

        if (!$presence) {
            return response()->json(['message' => 'Presence not found'], 404);
        }

        $presence->delete();

        return response()->json(['message' => 'Presence successfully deleted'], 200);
    }
}
