<?php

namespace App\Http\Controllers;
use App\Models\TypePersonnel;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class TypePersonnelController extends Controller
{

    public function TypePersonnel($id)
    {
        $types = TypePersonnel::where('id_creator', $id)->get();
        return response()->json($types);
    }

    public function addTypePersonnel(Request $request, $id)
    {
        $validator = Validator::make($request->all(), [
            'nom' => 'required|string|max:255',
            'prix_heure' => 'required|numeric'
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 400);
        }

        // Add the id_creator to the validated data
        $validatedData = $validator->validated();
        $validatedData['id_creator'] = $id;

        // Create the TypePersonnel instance
        $typePersonnel = TypePersonnel::create($validatedData);

        return response()->json([
            'message' => 'Type de personnel créé avec succès',
            'typePersonnel' => $typePersonnel
        ], 201);
    }


    public function showTypePersonnel($id)
    {
        $typePersonnel = TypePersonnel::find($id);
        if (!$typePersonnel) {
            return response()->json(['message' => 'Type de personnel non trouvé'], 404);
        }

        return response()->json($typePersonnel);
    }


    public function updateTypePersonnel(Request $request, $id)
    {
        $typePersonnel = TypePersonnel::find($id);
        if (!$typePersonnel) {
            return response()->json(['message' => 'Type de personnel non trouvé'], 404);
        }

        $validator = Validator::make($request->all(), [
            'nom' => 'required|string|max:255',
            'prix_heure' => 'required|numeric'
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 400);
        }

        $typePersonnel->update($validator->validated());

        return response()->json([
            'message' => 'Type de personnel mis à jour avec succès',
            'typePersonnel' => $typePersonnel
        ], 200);
    }

    // Méthode pour supprimer un type de personnel
    public function deleteTypePersonnel($id)
    {
        $typePersonnel = TypePersonnel::find($id);
        if (!$typePersonnel) {
            return response()->json(['message' => 'Type de personnel non trouvé'], 404);
        }

        $typePersonnel->delete();

        return response()->json(['message' => 'Type de personnel supprimé avec succès'], 200);
    }
}


