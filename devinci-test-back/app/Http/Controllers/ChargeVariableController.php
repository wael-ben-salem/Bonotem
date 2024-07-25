<?php

namespace App\Http\Controllers;

use App\Models\ChargeVariable;
use App\Models\Cout;
use App\Models\Marchandise;
use App\Models\Perte;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;
use stdClass;

class ChargeVariableController extends Controller
{
    public function getAllCharges($id)
    {

        $chargeVariables = ChargeVariable::where('id_creator', $id)->get();
        $charges = [];

        $chargeVariables->each(function ($chargeVariable) use (&$charges) {
            $charge = new stdClass();
            $charge->id = $chargeVariable->id;
            $charge->nom = $chargeVariable->nom;
            $charge->id_creator = $chargeVariable->id_creator;
            $charge->date = $chargeVariable->date;
            $charge->chiffre = $chargeVariable->chiffre;
            $charge->created_at = $chargeVariable->created_at;
            $charge->updated_at = $chargeVariable->updated_at;
            $charges[] = $charge;
        });

        $currentMonth = date('m');
        $currentYear = date('Y');
        $dateStart = "$currentYear-$currentMonth-01";
        $dateEnd = date('Y-m-t', strtotime($dateStart));


        $totalMarchandise = Marchandise::where('id_creator', $id)
            ->whereBetween('date_achat', [$dateStart, $dateEnd])
            ->select(DB::raw('SUM(prix * quantite_achetee) as total'))
            ->pluck('total')
            ->first();


        $totalPerte = Perte::where('id_creator', $id)
            ->whereBetween('created_at', [$dateStart, $dateEnd])
            ->sum('montant');


        $totalCout = Cout::where('id_creator', $id)
            ->whereBetween('date', [$dateStart, $dateEnd])
            ->sum('montant');


        if ($totalMarchandise > 0) {
            $marchandiseCharge = new stdClass();
            $marchandiseCharge->nom = 'Marchandise';
            $marchandiseCharge->id_creator = $id;
            $marchandiseCharge->date = "01/$currentMonth/$currentYear au " . date("t/$currentMonth/$currentYear");
            $marchandiseCharge->chiffre = $totalMarchandise;
            $charges[] = $marchandiseCharge;
        }

        if ($totalPerte > 0) {
            $perteCharge = new stdClass();
            $perteCharge->nom = 'Perte';
            $perteCharge->id_creator = $id;
            $perteCharge->date = "01/$currentMonth/$currentYear au " . date("t/$currentMonth/$currentYear");
            $perteCharge->chiffre = $totalPerte;
            $charges[] = $perteCharge;
        }

        if ($totalCout > 0) {
            $coutCharge = new stdClass();
            $coutCharge->nom = 'Cout';
            $coutCharge->id_creator = $id;
            $coutCharge->date = "01/$currentMonth/$currentYear au " . date("t/$currentMonth/$currentYear");
            $coutCharge->chiffre = $totalCout;
            $charges[] = $coutCharge;
        }

        return response()->json($charges, 200);
    }



    public function show($id)
    {
        $charge = ChargeVariable::findOrFail($id);

        return response()->json($charge, 200);
    }


    public function destroy($id)
    {
        $charge = ChargeVariable::findOrFail($id);
        $charge->delete();

        return response()->json(null, 204);
    }





    public function store(Request $request, $id)
    {

        $validator = Validator::make($request->all(), [
            'nom' => [
                'required',
                'regex:/^[A-Za-z\s]+$/',
                function ($attribute, $value, $fail) use ($id) {
                    $existingCategory = ChargeVariable::where('nom', $value)
                        ->where('id_creator', $id)
                        ->first();

                    if ($existingCategory) {
                        $fail('Ce nom de catégorie existe déjà pour cet utilisateur.');
                    }
                }
            ],
            'date' => 'required|date',
            'chiffre' => 'required|numeric|min:0',
        ], [
            'nom.required' => 'Le champ nom est requis.',
            'nom.regex' => 'Le champ nom doit contenir uniquement des lettres et des espaces.',
            'date.required' => 'Le champ date est requis.',
            'date.date' => 'Le champ date doit être une date valide.',
            'chiffre.required' => 'Le champ chiffre est requis.',
            'chiffre.numeric' => 'Le champ chiffre doit être un nombre.',
            'chiffre.min' => 'Le champ chiffre doit être supérieur ou égal à 0.',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'validation_errors' => $validator->messages(),
            ]);
        } else {

            $charge = new ChargeVariable();
            $charge->nom = $request->input('nom');
            $charge->date = $request->input('date');
            $charge->chiffre = $request->input('chiffre');
            $charge->id_creator = $id;

            $charge->save();

            return response()->json($charge, 201);
        }
    }

    public function update(Request $request, $id)
{
    $charge = ChargeVariable::find($id);

    if (!$charge) {
        return response()->json(['error' => 'ChargeVariable not found.'], 404);
    }

    $validator = Validator::make($request->all(), [
        'nom' => [
            'required',
            'regex:/^[A-Za-z\s]+$/',
            function ($attribute, $value, $fail) use ($charge) {
                $existingCategory = ChargeVariable::where('nom', $value)
                    ->where('id_creator', $charge->id_creator)
                    ->where('id', '!=', $charge->id)
                    ->first();

                if ($existingCategory) {
                    $fail('Ce nom de catégorie existe déjà pour cet utilisateur.');
                }
            }
        ],
        'date' => 'required|date',
        'chiffre' => 'required|numeric|min:0',
    ], [
        'nom.required' => 'Le champ nom est requis.',
        'nom.regex' => 'Le champ nom doit contenir uniquement des lettres et des espaces.',
        'date.required' => 'Le champ date est requis.',
        'date.date' => 'Le champ date doit être une date valide.',
        'chiffre.required' => 'Le champ chiffre est requis.',
        'chiffre.numeric' => 'Le champ chiffre doit être un nombre.',
        'chiffre.min' => 'Le champ chiffre doit être supérieur ou égal à 0.',
    ]);

    if ($validator->fails()) {
        return response()->json([
            'validation_errors' => $validator->messages(),
        ]);
    } else {
      
        $charge->nom = $request->input('nom');
        $charge->date = $request->input('date');
        $charge->chiffre = $request->input('chiffre');
        $charge->save();

        return response()->json($charge, 200);
    }
}









}
