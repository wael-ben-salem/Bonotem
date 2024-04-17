<?php

namespace App\Http\Controllers;

use App\Models\Fournisseur;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Validator;

class FournisseurController extends Controller
{
    /**
     *Liste tous les fournisseurs disponibles.
     */
    public function index()
    {
        $fournisseurs = Fournisseur::all();
        return response()->json($fournisseurs);
    }

    /**
     * Ajout un nouveau fournisseur après une validation .
     */
    public function store(Request $request)
    {
        Log::info($request->all());
        $validator = Validator::make($request->all(), [
            'nom' => 'required|string|max:255',
            'num_telephone' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:fournisseurs',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 400);
        }

        $validatedData = $validator->validated();

        $fournisseur = new Fournisseur();
        $fournisseur->nom = $validatedData['nom'];
        $fournisseur->num_telephone = $validatedData['num_telephone'];
        $fournisseur->email = $validatedData['email'];
        $fournisseur->save();

        return response()->json([
            'success' => true,
            'message' => 'Fournisseur ajouté avec succès',
            'fournisseur' => $fournisseur
        ], 201);
    }

    /**
     * les détails d'un fournisseur.
     */
    public function show($id)
    {
        $fournisseur = Fournisseur::find($id);
        if (!$fournisseur) {
            return response()->json(['error' => 'Fournisseur non trouvé'], 404);
        }
        return response()->json($fournisseur);
    }

    /**
     * Met à jour les informations d'un fournisseur après validation .
     */
    public function update(Request $request, $id)
    {
        $fournisseur = Fournisseur::find($id);
        if (!$fournisseur) {
            return response()->json(['error' => 'Fournisseur non trouvé'], 404);
        }

        $validator = Validator::make($request->all(), [
            'nom' => 'required|string|max:255',
            'num_telephone' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:fournisseurs,email,' . $fournisseur->id,
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 400);
        }

        $fournisseur->update($validator->validated());

        return response()->json([
            'success' => true,
            'message' => 'Fournisseur mis à jour avec succès',
            'fournisseur' => $fournisseur
        ], 200);
    }

    /**
     * Supprission d'un fournisseur en utilisant son ID.
     */
    public function destroy($id)
    {
        $fournisseur = Fournisseur::findOrFail($id);
        $fournisseur->delete();

        return response()->json([
            'success' => true,
            'message' => 'Fournisseur supprimé avec succès',
        ], 200);
    }
}
