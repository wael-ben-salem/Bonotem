<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\ChargeFixe;
use App\Models\Personnel;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\DB;
use Exception;
use stdClass;

class ChargeFixeController extends Controller
{
    public function getAllChargeFix($id)
    {

        $personnels = Personnel::where('id_creator', $id)->get();

        $totalSalaire = $personnels->sum('salaire');

        $personnelCharge = null;
        if ($totalSalaire > 0) {
            $personnelCharge = new stdClass();
            $personnelCharge->nom = 'Personnel';
            $personnelCharge->id_creator = $id;

            $currentMonth = date('m');
            $currentYear = date('Y');

            $personnelCharge->date_paiement = "01/$currentMonth/$currentYear au " . date("t/$currentMonth/$currentYear");

            $personnelCharge->montant = $totalSalaire;
            $personnelCharge->frequence = 'hebdomadaire';
        }


        $chargeFixes = ChargeFixe::where('id_creator', $id)->get();

        $charges = [];

        $chargeFixes->each(function ($chargeFixe) use (&$charges) {
            $charge = new stdClass();
            $charge->id = $chargeFixe->id;
            $charge->nom = $chargeFixe->nom;
            $charge->id_creator = $chargeFixe->id_creator;
            $charge->date_paiement = $chargeFixe->date_paiement;
            $charge->montant = $chargeFixe->montant;
            $charge->frequence = $chargeFixe->frequence;

            $charges[] = $charge;
        });

        if ($personnelCharge) {
            $charges[] = $personnelCharge;
        }

        return response()->json($charges, 200);
    }



    public function store(Request $request, $id)
    {

        $validator = Validator::make($request->all(), [
            'nom' => [
                'required',
                'regex:/^[A-Za-z\s]+$/',
                function ($attribute, $value, $fail) use ($id) {
                    $existingCategory = ChargeFixe::where('nom', $value)
                        ->where('id_creator', $id)
                        ->first();

                    if ($existingCategory) {
                        $fail('Ce nom de catégorie existe déjà pour cet utilisateur.');
                    }
                }
            ],
            'frequence' => 'required|string',
            'date_paiement' => 'required|date',
            'montant' => 'required'
        ], [
            'nom.required' => 'Le champ nom est requis.',
            'nom.regex' => 'Le champ nom doit contenir uniquement des lettres et des espaces.',
            'date_paiement.required' => 'Le champ date est requis.',
            'date_paiement.date' => 'Le champ date doit être une date valide.',
            'montant.required' => 'Le champ chiffre est requis.',
            'montant.min' => 'Le champ chiffre doit être supérieur ou égal à 0.',
            'frequence.required' => 'Le champ frequence est requis.',

        ]);

        if ($validator->fails()) {
            return response()->json([
                'validation_errors' => $validator->messages(),
            ]);
        } else {

            $charge = new ChargeFixe();
            $charge->nom = $request->input('nom');
            $charge->frequence = $request->input('frequence');
            $charge->date_paiement = $request->input('date_paiement');
            $charge->montant = $request->input('montant');
            $charge->id_creator = $id;

            $charge->save();

            return response()->json($charge, 201);
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
        ], [
            'nom.required' => 'Le champ nom est requis.',
            'nom.regex' => 'Le champ nom doit contenir uniquement des lettres et des espaces.',
            'date_paiement.required' => 'Le champ date est requis.',
            'date_paiement.date' => 'Le champ date doit être une date valide.',
            'montant.required' => 'Le champ chiffre est requis.',
            'montant.numeric' => 'Le champ chiffre doit être un nombre.',
            'montant.min' => 'Le champ chiffre doit être supérieur ou égal à 0.',
            'frequence.required' => 'Le champ frequence est requis.',

        ]);



        if ($validator->fails()) {
            return response()->json(['validation_errors' => $validator->messages()], 422);
        }

        $montant = $request->input('montant', $chargeFixe->montant);

        
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


    public function show($id)
    {
        $charge = ChargeFixe::findOrFail($id);

        return response()->json($charge, 200);
    }
}
