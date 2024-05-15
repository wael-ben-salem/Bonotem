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
    public function fournisseur()
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
            'nom' => ['required', 'string','regex:/^[A-Za-z\s]+$/'],
            'num_telephone' => 'required|integer',
            'email' => 'required|string|email|max:255|unique:fournisseurs',
        ], [
            'nom.required' => 'Le champ nom est requis.',
            'nom.string' => 'Le champ nom doit être une chaîne de caractères.',
            'nom.regex' => 'Le champ nom d\'ingrédient doit contenir uniquement des lettres et des espaces.',

            'nom.max' => 'Le champ nom ne doit pas dépasser :max caractères.',
            'num_telephone.required' => 'Le champ numéro de téléphone est requis.',
            'num_telephone.integer' => 'Le champ numéro de téléphone doit être un nombre entier.',
            'email.required' => 'Le champ email est requis.',
            'email.string' => 'Le champ email doit être une chaîne de caractères.',
            'email.email' => 'Le champ email doit être une adresse email valide.',
            'email.max' => 'Le champ email ne doit pas dépasser :max caractères.',
            'email.unique' => 'Cette adresse email est déjà utilisée par un fournisseur.',
        ]);


        if ($validator->fails()) {
            return response()->json([
                'validation_errors' => $validator->messages(),
            ]);
        }else{
         $fournisseur = new Fournisseur();
        $fournisseur->nom = $request->nom;
        $fournisseur->num_telephone = $request->num_telephone;
        $fournisseur->email = $request->email;
        if ($request->hasFile('photo')) {
            $photo = $request->file('photo');
            $filename = time() . '.' . $photo->getClientOriginalExtension();
            $photo->storeAs('public', $filename);
            $fournisseur->photo = $filename;
        }
        $fournisseur->save();

        }

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
            'nom' => ['required', 'string','regex:/^[A-Za-z\s]+$/'],
            'num_telephone' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:fournisseurs,email,' . $fournisseur->id,
        ], [
            'nom.required' => 'Le champ nom est requis.',
            'nom.regex' => 'Le champ nom d\'ingrédient doit contenir uniquement des lettres et des espaces.',

            'nom.string' => 'Le champ nom doit être une chaîne de caractères.',
            'nom.max' => 'Le champ nom ne doit pas dépasser :max caractères.',
            'num_telephone.required' => 'Le champ numéro de téléphone est requis.',
            'num_telephone.string' => 'Le champ numéro de téléphone doit être une chaîne de caractères.',
            'num_telephone.max' => 'Le champ numéro de téléphone ne doit pas dépasser :max caractères.',
            'email.required' => 'Le champ email est requis.',
            'email.string' => 'Le champ email doit être une chaîne de caractères.',
            'email.email' => 'Le champ email doit être une adresse email valide.',
            'email.max' => 'Le champ email ne doit pas dépasser :max caractères.',
            'email.unique' => 'Cette adresse email est déjà utilisée par un fournisseur.',
        ]);


        if ($validator->fails()) {
            return response()->json([
                'validation_errors' => $validator->messages(),
            ]);
        }
        else{
            $fournisseur->nom = $request->nom;
            $fournisseur->num_telephone = $request->num_telephone;
            $fournisseur->email = $request->email;
            // Check if 'photo_url' exists in the request and update the photo attribute
            if ($request->hasFile('photo')) {
                $photo = $request->file('photo');
                $filename = time() . '.' . $photo->getClientOriginalExtension();
                $photo->storeAs('public', $filename);
                $fournisseur->photo = $filename;
            }

            $fournisseur->save();

        }
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
