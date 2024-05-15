<?php

namespace App\Http\Controllers;

use App\Models\Cout;
use App\Models\Depense;
use App\Models\Ventilation;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class CoutController extends Controller
{

        public function addCout(Request $request)
        {
            $validator = Validator::make($request->all(), [
                'detail' => 'required|string',
                'montant' => 'required|numeric|between:0,999999.99',
                'date' => 'nullable|date',
                'type' => 'required|in:depense,ventilation',
            ], [
                'detail.required' => 'Le champ détail est requis.',
                'detail.string' => 'Le champ détail doit être une chaîne de caractères.',
                'montant.required' => 'Le champ montant est requis.',
                'montant.numeric' => 'Le champ montant doit être un nombre.',
                'montant.between' => 'Le champ montant doit être compris entre 0 et 999999.99.',
                'date.date' => 'Le champ date doit être une date valide.',
                'type.required' => 'Le champ type est requis.',
                'type.in' => 'Le champ type doit être soit "depense" soit "ventilation".',
            ]);

            if ($validator->fails()) {
                return response()->json([
                    'validation_errors' => $validator->messages(),
                ]);
            }

            $cout = Cout::create([
                'detail' => $request->detail,
                'montant' => $request->montant,
                'date' => $request->date,
                'type' => $request->type,
            ]);

            if ($request->type === 'ventilation') {
                $ventilation = Ventilation::create();
                $cout->id_ventilation = $ventilation->id;
            } else {
                $depense = Depense::create();
                $cout->id_depense = $depense->id;
            }

            $cout->save();

            return response()->json([
                'success' => true,
                'message' => 'Cout ajouté avec succès.',
                'cout' => $cout,
            ]);
        }

        public function updateCout(Request $request, $id)
{
    $cout = Cout::findOrFail($id);

    $validator = Validator::make($request->all(), [
        'detail' => 'required|string',
        'montant' => 'required|numeric|between:0,999999.99',
        'date' => 'nullable|date',
        'type' => 'required|in:depense,ventilation',
    ], [
        'detail.required' => 'Le champ détail est requis.',
        'detail.string' => 'Le champ détail doit être une chaîne de caractères.',
        'montant.required' => 'Le champ montant est requis.',
        'montant.numeric' => 'Le champ montant doit être un nombre.',
        'montant.between' => 'Le champ montant doit être compris entre 0 et 999999.99.',
        'date.date' => 'Le champ date doit être une date valide.',
        'type.required' => 'Le champ type est requis.',
        'type.in' => 'Le champ type doit être soit "depense" soit "ventilation".',
    ]);

    if ($validator->fails()) {
        return response()->json([
            'validation_errors' => $validator->messages(),
        ]);
    }

    // Si le type est changé
    if ($request->type !== $cout->type) {
        if ($request->type === 'ventilation') {
            // Supprimer l'ID depense s'il existe
            if ($cout->id_depense) {
                Depense::destroy($cout->id_depense);
            }
            // Créer une nouvelle entrée dans Ventilation
            $ventilation = Ventilation::create();
            $cout->id_ventilation = $ventilation->id;
        } elseif ($request->type === 'depense') {
            // Supprimer l'ID ventilation s'il existe
            if ($cout->id_ventilation) {
                Ventilation::destroy($cout->id_ventilation);
            }
            // Si l'ID depense existe déjà, le modifier
            if ($cout->id_depense) {
                $depense = Depense::findOrFail($cout->id_depense);
                // Modifier les détails de la dépense
                $depense->update([
                    // Mettre à jour les champs nécessaires
                ]);
            } else {
                // Sinon, créer une nouvelle entrée dans Depense
                $depense = Depense::create([
                    // Remplir les champs nécessaires
                ]);
                $cout->id_depense = $depense->id;
            }
        }
    }

    // Mettre à jour les autres champs de Cout
    $cout->update([
        'detail' => $request->detail,
        'montant' => $request->montant,
        'date' => $request->date,
        'type' => $request->type,
    ]);

    return response()->json([
        'success' => true,
        'message' => 'Cout mis à jour avec succès.',
        'cout' => $cout,
    ]);
}

public function show($id)

{
    $cout = Cout::findOrFail($id);

    return response()->json([
        'success' => true,
        'cout' => $cout,
    ]);
}

public function destroy($id)
{
    $cout = Cout::findOrFail($id);
    $cout->delete();

    return response()->json([
        'success' => true,
        'message' => 'Cout supprimé avec succès.',
    ]);
}

public function index()
{
    $couts = Cout::all();
    return response()->json($couts);

}













}
