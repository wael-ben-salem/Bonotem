<?php

namespace App\Http\Controllers;

use App\Models\Marchandise;
use App\Models\Perte;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class PerteController extends Controller
{
    /**
     * Display a listing of the resource.
     */
//     public function addPerte(Request $request)
// {
//     // Valider les données de la requête
//     $request->validate([
//         'id_ingredient' => 'nullable|required_without:id_packaging|exists:ingredients,id',
//         'id_packaging' => 'nullable|required_without:id_ingredient|exists:packagings,id',
//         'quantite' => 'required|integer|min:1',
//     ]);

//     $marchandiseIngredient = null;
//     $marchandisePackaging = null;

//     // Recherche de la marchandise pour l'ingrédient s'il est spécifié
//     if ($request->has('id_ingredient')) {
//         $marchandiseIngredient = Marchandise::where('id_ingredient', $request->id_ingredient)
//             ->latest()->first();
//     }

//     // Recherche de la marchandise pour l'emballage s'il est spécifié
//     if ($request->has('id_packaging')) {
//         $marchandisePackaging = Marchandise::where('id_packaging', $request->id_packaging)
//             ->latest()->first();
//     }

//     // Vérifier si au moins une marchandise a été trouvée
//     if (!$marchandiseIngredient && !$marchandisePackaging) {
//         return response()->json(['message' => 'Marchandise introuvable.'], 404);
//     }

//     // Sélectionner la marchandise appropriée en fonction de ce qui est trouvé
//     $marchandise = $marchandiseIngredient ?? $marchandisePackaging;

//     // Vérifier s'il existe déjà une perte pour cette marchandise
//     $existingPerte = Perte::where('id_marchandise', $marchandise->id)->first();

//     if ($existingPerte) {
//         // Si une perte existe déjà pour cette marchandise, mettre à jour la quantité
//         $existingPerte->quantite += $request->quantite;
//         $existingPerte->montant += $request->quantite * $marchandise->prix;
//         $existingPerte->save();

//         // Mettre à jour la quantité en stock de la marchandise
//         $marchandise->quantite_en_stock -= $request->quantite;
//         $marchandise->save();

//         // Si une marchandise différente est spécifiée dans la requête, créer une nouvelle perte pour cette marchandise
//         if (($marchandiseIngredient && $request->id_packaging) || ($marchandisePackaging && $request->id_ingredient)) {
//             $marchandiseDifferent = $marchandiseIngredient ? $marchandisePackaging : $marchandiseIngredient;
//             $montant = $request->quantite * $marchandiseDifferent->prix;

//             $perte = new Perte();
//             $perte->id_marchandise = $marchandiseDifferent->id;
//             $perte->quantite = $request->quantite;
//             $perte->montant = $montant;
//             $perte->save();

//             // Mettre à jour la quantité en stock de la marchandise différente
//             $marchandiseDifferent->quantite_en_stock -= $request->quantite;
//             $marchandiseDifferent->save();
//         }

//         return response()->json(['message' => 'Perte mise à jour avec succès.']);
//     }

//     // Créer une nouvelle perte pour la marchandise spécifiée
//     $montant = $request->quantite * $marchandise->prix;

//     $perte = new Perte();
//     $perte->id_marchandise = $marchandise->id;
//     $perte->quantite = $request->quantite;
//     $perte->montant = $montant;
//     $perte->save();

//     // Mettre à jour la quantité en stock de la marchandise
//     $marchandise->quantite_en_stock -= $request->quantite;
//     $marchandise->save();

//     // Si une marchandise différente est spécifiée dans la requête, créer une nouvelle perte pour cette marchandise
//     if (($marchandiseIngredient && $request->id_packaging) || ($marchandisePackaging && $request->id_ingredient)) {
//         $marchandiseDifferent = $marchandiseIngredient ? $marchandisePackaging : $marchandiseIngredient;
//         $montantDifferent = $request->quantite * $marchandiseDifferent->prix;

//         $perteDifferent = new Perte();
//         $perteDifferent->id_marchandise = $marchandiseDifferent->id;
//         $perteDifferent->quantite = $request->quantite;
//         $perteDifferent->montant = $montantDifferent;
//         $perteDifferent->save();

//         // Mettre à jour la quantité en stock de la marchandise différente
//         $marchandiseDifferent->quantite_en_stock -= $request->quantite;
//         $marchandiseDifferent->save();
//     }

//     return response()->json(['message' => 'Perte ajoutée avec succès.']);
// }

public function addPerte(Request $request)
{
    // Valider les données de la requête
    $request->validate([
        'id_ingredient' => 'nullable|required_without:id_packaging|exists:ingredients,id',
        'id_packaging' => 'nullable|required_without:id_ingredient|exists:packagings,id',
        'quantiteIngredient' => 'nullable|integer|min:1',
        'quantitePackaging' => 'nullable|integer|min:1',
    ]);

    // Initialisation des variables pour stocker les marchandises
    $marchandiseIngredient = null;
    $marchandisePackaging = null;

    // Recherche de la marchandise pour l'ingrédient s'il est spécifié
    if ($request->has('id_ingredient')) {
        $marchandiseIngredient = Marchandise::where('id_ingredient', $request->id_ingredient)
            ->latest()->first();
    }

    // Recherche de la marchandise pour l'emballage s'il est spécifié
    if ($request->has('id_packaging')) {
        $marchandisePackaging = Marchandise::where('id_packaging', $request->id_packaging)
            ->latest()->first();
    }

    // Vérifier si au moins une marchandise a été trouvée
    if (!$marchandiseIngredient && !$marchandisePackaging) {
        return response()->json(['message' => 'Marchandise introuvable.'], 404);
    }

    // Traitement de la quantité d'ingrédient
    if ($request->has('quantiteIngredient')) {
        $quantiteIngredient = $request->quantiteIngredient;
        $montantIngredient = $quantiteIngredient * $marchandiseIngredient->prix;

        // Vérifier s'il existe déjà une perte pour cet ingrédient
        $existingPerteIngredient = Perte::where('id_marchandise', $marchandiseIngredient->id)->first();

        if ($existingPerteIngredient) {
            // Si une perte existe déjà pour cet ingrédient, mettre à jour la quantité
            $existingPerteIngredient->quantite += $quantiteIngredient;
            $existingPerteIngredient->montant += $montantIngredient;
            $existingPerteIngredient->save();
        } else {
            // Créer une nouvelle perte pour cet ingrédient
            $perteIngredient = new Perte();
            $perteIngredient->id_marchandise = $marchandiseIngredient->id;
            $perteIngredient->quantite = $quantiteIngredient;
            $perteIngredient->id_ingredient = $request->id_ingredient;
            $perteIngredient->montant = $montantIngredient;
            $perteIngredient->save();
        }

        // Mettre à jour la quantité en stock de l'ingrédient
        $marchandiseIngredient->quantite_en_stock -= $quantiteIngredient;
        $marchandiseIngredient->save();
    }

    // Traitement de la quantité d'emballage
    if ($request->has('quantitePackaging')) {
        $quantitePackaging = $request->quantitePackaging;
        $montantPackaging = $quantitePackaging * $marchandisePackaging->prix;

        // Vérifier s'il existe déjà une perte pour cet emballage
        $existingPertePackaging = Perte::where('id_marchandise', $marchandisePackaging->id)->first();

        if ($existingPertePackaging) {
            // Si une perte existe déjà pour cet emballage, mettre à jour la quantité
            $existingPertePackaging->quantite += $quantitePackaging;
            $existingPertePackaging->montant += $montantPackaging;
            $existingPertePackaging->save();
        } else {
            // Créer une nouvelle perte pour cet emballage
            $pertePackaging = new Perte();
            $pertePackaging->id_marchandise = $marchandisePackaging->id;
            $pertePackaging->id_packaging = $request->id_packaging;
            $pertePackaging->quantite = $quantitePackaging;
            $pertePackaging->montant = $montantPackaging;
            $pertePackaging->save();
        }

        // Mettre à jour la quantité en stock de l'emballage
        $marchandisePackaging->quantite_en_stock -= $quantitePackaging;
        $marchandisePackaging->save();
    }

    return response()->json(['message' => 'Perte ajoutée avec succès.']);
}


     public function updatePerte(Request $request, $id)
     {
         // Validate the request data
         $validator = Validator::make($request->all(), [
            'quantite' => 'required|integer|min:1',
            'quantite_apres' => 'required|integer|min:1',


        ], [
            'quantite.required' => 'Le champ quantité avant est requis.',
            'quantite.integer' => 'Le champ quantité avant doit être un nombre entier.',
            'quantite.min' => 'Le champ quantité doit être d\'au moins :min.',
            'quantite_apres.required' => 'Le champ quantité est requis.',
            'quantite_apres.integer' => 'Le champ quantité doit être un nombre entier.',
            'quantite_apres.min' => 'Le champ quantité doit être d\'au moins :min.',

        ]);

        if ($validator->fails()) {
            return response()->json([
                'validation_errors' => $validator->messages(),
            ]);
        } else {
         // Find the Perte record by its ID
         $perte = Perte::find($id);

         // Check if the Perte record exists
         if (!$perte) {
             return response()->json(['message' => 'Perte not found.'], 404);
         }

         // Get the associated Marchandise
         $marchandise = $perte->marchandise;

         // Check if the associated Marchandise exists
         if (!$marchandise) {
             return response()->json(['message' => 'Associated Marchandise not found.'], 404);
         }
         $difference = $request->quantite_apres - $perte->quantite;


         // Check if the new quantity is greater than the available quantity in stock
         if ($difference > $marchandise->quantite_en_stock) {
             return response()->json(['message' => 'Cannot update this Perte, the requested quantity exceeds the available quantity in stock.'], 400);
         }

         // Calculate the difference in quantity after the update

         // Update the Perte record with the new quantity
         $perte->quantite = $request->quantite_apres;

         // Calculate the new montant based on the updated quantity and price
         $perte->montant = $request->quantite_apres * $marchandise->prix;

         // Save the updated Perte record
         $perte->save();

         // Update the quantity in stock of the associated Marchandise
         if($difference <0){
            $marchandise->quantite_en_stock = $marchandise->quantite_en_stock - $difference;
            $marchandise->save();
         }else if($difference >0){
            $marchandise->quantite_en_stock = $marchandise->quantite_en_stock - $difference;
            $marchandise->save();

         }else{
         $marchandise->save();
         }


         return response()->json(['message' => 'Perte updated successfully.']);
        }
     }


     public function show($id)
     {
         $perte = Perte::find($id);
         if (!$perte) {
             return response()->json(['error' => 'Perte nexiste pas'], 404);
         }
         return response()->json($perte);
     }




     public function destroy($id)
     {
         $perte = Perte::findOrFail($id);
         $perte->delete();

         return response()->json([
             'success' => true,
             'message' => 'Perte supprimé avec succès',
         ], 200);
     }





    public function perte()
    {
        $pertes = Perte::with('marchandise','ingredient','packaging')->get();
        return response()->json($pertes);
    }

   }
