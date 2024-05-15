<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\ChargeFixe;
use App\Models\Personnel;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\DB;
use Exception;

class ChargeFixeController extends Controller
{
    public function ChargeFixe()
    {
        $charges = ChargeFixe::all();
        return response()->json($charges);
    }

    public function addChargeFixe(Request $request)
    {
        // Validate incoming data
        $validatedData = $request->validate([
            'nom' => 'required|string|max:255',
            'frequence' => 'required|string',
            'date_paiement' => 'required|date',
            'montant' => 'sometimes|numeric'
        ]);

        // Calculate total salaries only if the charge name is "Charge de personnels"
        if ($request->nom === 'Charge de personnels') {
            $totalSalaires = DB::table('personnels')->sum('salaire');
            $validatedData['montant'] = $totalSalaires;
        } else {
            // Use the provided montant or default to 0 if not provided
            $validatedData['montant'] = $request->montant ?? 0;
        }

        try {
            // Create a new fixed charge in the database
            $chargeFixe = ChargeFixe::create($validatedData);

            // Return a JSON response
            return response()->json([
                'success' => true,
                'message' => 'Charge fixe ajoutée avec succès.',
                'data' => $chargeFixe
            ]);
        } catch (Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Erreur lors de l\'ajout de la charge fixe: ' . $e->getMessage()
            ], 500);
        }
    }

    public function updateChargeFixe(Request $request, $id)
    {
        $chargeFixe = ChargeFixe::find($id);
        if (!$chargeFixe) {
            return response()->json(['message' => 'Charge Fixe not found'], 404);
        }

        $validator = Validator::make($request->all(), [
            'nom' => 'required|string|max:255',
            'montant' => 'sometimes|numeric',
            'frequence' => 'required|string',
            'date_paiement' => 'required|date'
        ]);

        if ($validator->fails()) {
            return response()->json(['validation_errors' => $validator->messages()], 422);
        }

        $montant = $request->input('montant', $chargeFixe->montant);

        // Update the montant to the total of all salaries if the charge is "Charge de Personnels"
        if ($request->nom == 'Charge de Personnels') {
            $montant = Personnel::sum('salaire');
        }

        $chargeFixe->update([
            'nom' => $request->nom,
            'montant' => $montant,
            'frequence' => $request->frequence,
            'date_paiement' => $request->date_paiement
        ]);

        return response()->json([
            'message' => 'Charge Fixe successfully updated',
            'data' => $chargeFixe
        ], 200);
    }

    public function deleteChargeFixe($id)
    {
        $chargefixe = ChargeFixe::find($id);
        if (!$chargefixe) {
            return response()->json(['message' => 'chargefixe not found'], 404);
        }

        $chargefixe->delete();
        return response()->json(['message' => 'chargefixe successfully deleted'], 200);
    }
}
