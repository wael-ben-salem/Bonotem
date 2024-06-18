<?php

namespace App\Http\Controllers;

use App\Models\Ingredient;
use App\Models\Marchandise;
use App\Models\Packaging\Packaging;
use App\Models\Unite;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class MarchandiseController extends Controller
{
    public function marchandise($id)
    {
        $marchandises = Marchandise::with('ingredient' , 'packaging' , 'fournisseur','unite')->where('id_creator', $id)
        ->get();
        return response()->json($marchandises);
    }





    public function addIngredient(Request $request,$id)
    {
        // Validate the incoming request data
        $validator = Validator::make($request->all(), [
            'nom' => ['required', 'string','regex:/^[A-Za-z0-9\s]+$/',function ($attribute, $value, $fail) use ($id) {
                $existingCategory = Marchandise::where('nom', $value)
                    ->where('id_creator', $id)
                    ->first();

                if ($existingCategory) {
                    $fail('Ce nom de Marchandise existe déjà pour cet utilisateur.');
                }
            }
        ],
            'reference' => 'required|string',
            'id_ingredient' => 'required|exists:ingredients,id',
            'quantite_achetee' => 'required|integer|min:0',
            'id_fournisseur' => 'nullable|exists:fournisseurs,id',
            'unite_id' => 'nullable|exists:unites,id',
            'prix' => 'required|numeric|min:0',
            'date_achat' => 'required|date',
        ], [
            'nom.regex' => 'Le champ nom d\'ingrédient doit contenir uniquement des lettres et des espaces.',

            'nom.required' => 'Le champ nom est requis.',
            'reference.required' => 'Le champ référence est requis.',
            'id_ingredient.required' => 'Le champ ID ingrédient est requis.',
            'id_ingredient.exists' => 'L\'ingrédient sélectionné n\'existe pas.',
            'quantite_achetee.required' => 'Le champ quantité achetée est requis.',
            'quantite_achetee.integer' => 'Le champ quantité achetée doit être un entier.',
            'quantite_achetee.min' => 'Le champ quantité achetée doit être supérieur ou égal à 0.',
            'id_fournisseur.exists' => 'Le fournisseur sélectionné n\'existe pas.',
            'unite_id.exists' => 'L\'unité sélectionnée n\'existe pas.',
            'prix.required' => 'Le champ prix est requis.',
            'prix.numeric' => 'Le champ prix doit être un nombre.',
            'prix.min' => 'Le champ prix doit être supérieur ou égal à 0.',
            'date_achat.required' => 'Le champ date d\'achat est requis.',
            'date_achat.date' => 'Le champ date d\'achat doit être une date valide.',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'validation_errors' => $validator->messages(),
            ]);
        } else {

             // Find the latest Marchandise with the same ingredient
        $latestMarchandise = Marchandise::where('id_ingredient', $request->id_ingredient)->where('id_creator', $id)->latest()->first();

        // Calculate the stock quantity for the new Marchandise
        // Calculate the stock quantity for the new Marchandise
    $stockQuantity = $request->quantite_achetee;
    if ($latestMarchandise) {
        $stockQuantity = ($latestMarchandise->quantite_achetee +$stockQuantity )-$latestMarchandise->quantite_consomee;
        // Create a new Marchandise instance
        $marchandise = Marchandise::create([
            'nom' => $request->nom,
            'reference' => $request->reference,
            'id_ingredient' => $request->id_ingredient,
            'quantite_achetee' => $request->quantite_achetee,
            'id_fournisseur' => $request->id_fournisseur,
            'prix' => $request->prix,
            'date_achat' => $request->date_achat,
            'id_creator' => $id,

            'unite_id' => $request->unite_id,
            'quantite_en_stock' => $stockQuantity,
        ]);

        return response()->json([
            'status' => 200,
            'message' => 'New Marchandise created after successfully!',
            'data' => $marchandise,
        ], 200);


    }else{



         // Create the Marchandise instance with the ingredient ID
         $marchandise = Marchandise::create([
            'nom' => $request->nom,
            'reference' => $request->reference,
            'id_ingredient' => $request->id_ingredient,
            'quantite_achetee' => $request->quantite_achetee,
            'id_fournisseur' => $request->id_fournisseur,
            'prix' => $request->prix,
            'id_creator' => $id,

            'date_achat' => $request->date_achat,
            'unite_id' => $request->unite_id,
        ]);

        return response()->json([
            'status' => 200,
            'message' => 'Marchandise created successfully!',
            'data' => $marchandise,
        ], 200);

    }

    }


    }

    public function updateIngredientMarchandise(Request $request, $id)
{
    // Validate the incoming request data
    $validator = Validator::make($request->all(), [
        'nom' => ['required', 'string','regex:/^[A-Za-z0-9\s]+$/'],
        'reference' => 'required|string',
        'id_ingredient' => 'required|exists:ingredients,id',
        'quantite_achetee' => 'required|integer|min:0',
        'id_fournisseur' => 'nullable|exists:fournisseurs,id',
        'unite_id' => 'nullable|exists:unites,id',
        'prix' => 'required|numeric|min:0',
        'date_achat' => 'required|date',
    ], [
        'nom.regex' => 'Le champ nom d\'ingrédient doit contenir uniquement des lettres et des espaces.',

        'nom.required' => 'Le champ nom est requis.',
        'reference.required' => 'Le champ référence est requis.',
        'id_ingredient.required' => 'Le champ ID ingrédient est requis.',
        'id_ingredient.exists' => 'L\'ingrédient sélectionné n\'existe pas.',
        'quantite_achetee.required' => 'Le champ quantité achetée est requis.',
        'quantite_achetee.integer' => 'Le champ quantité achetée doit être un entier.',
        'quantite_achetee.min' => 'Le champ quantité achetée doit être supérieur ou égal à 0.',
        'id_fournisseur.exists' => 'Le fournisseur sélectionné n\'existe pas.',
        'unite_id.exists' => 'L\'unité sélectionnée n\'existe pas.',
        'prix.required' => 'Le champ prix est requis.',
        'prix.numeric' => 'Le champ prix doit être un nombre.',
        'prix.min' => 'Le champ prix doit être supérieur ou égal à 0.',
        'date_achat.required' => 'Le champ date d\'achat est requis.',
        'date_achat.date' => 'Le champ date d\'achat doit être une date valide.',
    ]);

    if ($validator->fails()) {
        return response()->json([
            'validation_errors' => $validator->messages(),
        ]);
    }else {


        // Find the Marchandise to update
    $marchandise = Marchandise::findOrFail($id);

    if (!$marchandise) {
        return response()->json([
            'message' => 'Marchandise not found',
        ], 404);
    } else {
        // Calculate the stock quantity for the updated Marchandise
        $previousMarchandise = Marchandise::where('id_ingredient', $request->id_ingredient)
        ->where('id_creator', $id)
                                            ->orderBy('created_at', 'desc')
                                            ->skip(1) // Skip the latest Marchandise
                                            ->first();

        $stockQuantity = $request->quantite_achetee;
        if ($previousMarchandise) {
            $stockQuantity = ($previousMarchandise->quantite_achetee + $stockQuantity) - $previousMarchandise->quantite_consomee;

        // Update the Marchandise instance
        $marchandise->update([
            'nom' => $request->nom,
            'reference' => $request->reference,
            'id_ingredient' => $request->id_ingredient,
            'quantite_achetee' => $request->quantite_achetee,
            'id_fournisseur' => $request->id_fournisseur,
            'prix' => $request->prix,
            'date_achat' => $request->date_achat,
            'unite_id' => $request->unite_id,
            'quantite_en_stock' => $stockQuantity,
        ]);

        return response()->json([
            'status' => 200,
            'message' => 'Marchandise updated with quantite successfully!',
            'data' => $marchandise,
        ], 200);


        }else{
            $marchandise->update([
                'nom' => $request->nom,
                'reference' => $request->reference,
                'quantite_achetee' => $request->quantite_achetee,
                'id_ingredient' => $request->id_ingredient,
                'id_fournisseur' => $request->id_fournisseur,
                'prix' => $request->prix,
                'date_achat' => $request->date_achat,
                'unite_id' => $request->unite_id,
            ]);
            return response()->json([
                'status' => 200,
                'message' => 'Marchandise updated successfully!',
                'data' => $marchandise,
            ], 200);


        }

    }





    }


}





    public function addPackaging(Request $request,$id)
    {
        // Validate the incoming request data
        $validator = Validator::make($request->all(), [
            'nom' => ['required', 'string','regex:/^[A-Za-z0-9\s]+$/',function ($attribute, $value, $fail) use ($id) {
                $existingCategory = Marchandise::where('nom', $value)
                    ->where('id_creator', $id)
                    ->first();

                if ($existingCategory) {
                    $fail('Ce nom de Marchandise existe déjà pour cet utilisateur.');
                }
            }
        ],
            'reference' => 'required|string',
            'id_packaging' => 'required|exists:packagings,id', // Change to existing ingredient ID or remove if using packaging

            'quantite_achetee' => 'required|integer|min:0',
            'id_fournisseur' => 'nullable|exists:fournisseurs,id',
            'unite_id' => 'nullable|exists:unites,id',
            'prix' => 'required|numeric|min:0',
            'date_achat' => 'required|date',
        ], [
            'nom.required' => 'Le champ nom est requis.',
            'nom.regex' => 'Le champ nom d\'ingrédient doit contenir uniquement des lettres et des espaces.',

            'reference.required' => 'Le champ référence est requis.',
            'id_packaging.required' => 'Le champ ID d\'emballage est requis.',
            'id_packaging.exists' => 'L\'emballage sélectionné n\'existe pas.',

            'quantite_achetee.required' => 'Le champ quantité achetée est requis.',
            'quantite_achetee.integer' => 'Le champ quantité achetée doit être un entier.',
            'quantite_achetee.min' => 'Le champ quantité achetée doit être supérieur ou égal à 0.',
            'id_fournisseur.exists' => 'Le fournisseur sélectionné n\'existe pas.',
            'unite_id.exists' => 'L\'unité sélectionnée n\'existe pas.',
            'prix.required' => 'Le champ prix est requis.',
            'prix.numeric' => 'Le champ prix doit être un nombre.',
            'prix.min' => 'Le champ prix doit être supérieur ou égal à 0.',
            'date_achat.required' => 'Le champ date d\'achat est requis.',
            'date_achat.date' => 'Le champ date d\'achat doit être une date valide.',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'validation_errors' => $validator->messages(),
            ]);
        }else{



            // Retrieve the ingredient by its ID
        $latestMarchandise = Marchandise::where('id_packaging', $request->id_packaging)
        ->where('id_creator', $id)
        ->latest()->first();
        $stockQuantity = $request->quantite_achetee;
        if ($latestMarchandise) {
            $stockQuantity = ($latestMarchandise->quantite_achetee +$stockQuantity )-$latestMarchandise->quantite_consomee ;
            // Create a new Marchandise instance
            $marchandise = Marchandise::create([
                'nom' => $request->nom,
                'reference' => $request->reference,
                'id_packaging' => $request->id_packaging,
                'dimension' => $request->dimension,
                'quantite_achetee' => $request->quantite_achetee,
                'id_fournisseur' => $request->id_fournisseur,
                'prix' => $request->prix,
                'id_creator' => $id,

                'date_achat' => $request->date_achat,
                'unite_id' => $request->unite_id,
                'quantite_en_stock' => $stockQuantity,
            ]);

        return response()->json([
            'status' => 200,
            'message' => 'New Marchandise created after successfully!',
            'data' => $marchandise,
        ], 200);


    }else{

         // Create the Marchandise instance with the ingredient ID
         $marchandise = Marchandise::create([
            'nom' => $request->nom,
            'reference' => $request->reference,
            'id_packaging' => $request->id_packaging,
            'dimension' => $request->dimension,
            'quantite_achetee' => $request->quantite_achetee,
            'id_fournisseur' => $request->id_fournisseur,
            'prix' => $request->prix,
            'id_creator' => $id,

            'date_achat' => $request->date_achat,
            'unite_id' => $request->unite_id,
        ]);

        return response()->json([
            'status' => 200,
            'message' => 'Marchandise created successfully!',
            'data' => $marchandise,
        ], 200);





    }




        }


    }


    public function updatePackaging(Request $request, $id)
    {
        // Validate the incoming request data
        $validator = Validator::make($request->all(), [
            'nom' => ['required', 'string','regex:/^[A-Za-z0-9\s]+$/'],
            'reference' => 'required|string',
            'id_packaging' => 'required|exists:packagings,id',
            'quantite_achetee' => 'required|integer|min:0',
            'id_fournisseur' => 'nullable|exists:fournisseurs,id',
            'unite_id' => 'nullable|exists:unites,id',
            'prix' => 'required|numeric|min:0',
            'date_achat' => 'required|date',
        ], [
            'nom.regex' => 'Le champ nom d\'ingrédient doit contenir uniquement des lettres et des espaces.',

            'nom.required' => 'Le champ nom est requis.',
            'reference.required' => 'Le champ référence est requis.',
            'id_packaging.required' => 'Le champ ID d\'emballage est requis.',
            'id_packaging.exists' => 'L\'emballage sélectionné n\'existe pas.',

            'quantite_achetee.required' => 'Le champ quantité achetée est requis.',
            'quantite_achetee.integer' => 'Le champ quantité achetée doit être un entier.',
            'quantite_achetee.min' => 'Le champ quantité achetée doit être supérieur ou égal à 0.',
            'id_fournisseur.exists' => 'Le fournisseur sélectionné n\'existe pas.',
            'unite_id.exists' => 'L\'unité sélectionnée n\'existe pas.',
            'prix.required' => 'Le champ prix est requis.',
            'prix.numeric' => 'Le champ prix doit être un nombre.',
            'prix.min' => 'Le champ prix doit être supérieur ou égal à 0.',
            'date_achat.required' => 'Le champ date d\'achat est requis.',
            'date_achat.date' => 'Le champ date d\'achat doit être une date valide.',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'validation_errors' => $validator->messages(),
            ]);
        } else {



            // Retrieve the Marchandise instance by its ID
        $marchandise = Marchandise::find($id);

        if (!$marchandise) {
            return response()->json([
                'message' => 'Marchandise not found!',
            ], 404);
        }else{

             // Calculate the stock quantity for the updated Marchandise
        $previousMarchandise = Marchandise::where('id_packaging', $request->id_packaging)
        ->where('id_creator', $id)
        ->orderBy('created_at', 'desc')
        ->skip(1) // Skip the latest Marchandise
        ->first();

        $stockQuantity = $request->quantite_achetee;
        if ($previousMarchandise) {
        $stockQuantity = ($previousMarchandise->quantite_achetee + $stockQuantity) - $previousMarchandise->quantite_consomee;

        // Update the Marchandise instance
        $marchandise->update([
        'nom' => $request->nom,
        'reference' => $request->reference,
        'id_packaging' => $request->id_packaging,
        'dimension' => $request->dimension,
        'quantite_achetee' => $request->quantite_achetee,
        'id_fournisseur' => $request->id_fournisseur,
        'prix' => $request->prix,
        'date_achat' => $request->date_achat,
        'unite_id' => $request->unite_id,
        'quantite_en_stock' => $stockQuantity,
        ]);

        return response()->json([
        'status' => 200,
        'message' => 'Marchandise updated with quantite successfully!',
        'data' => $marchandise,
        ], 200);

        }else{
            $marchandise->update([
                'nom' => $request->nom,
                'reference' => $request->reference,
                'id_packaging' => $request->id_packaging,
                'dimension' => $request->dimension,
                'quantite_achetee' => $request->quantite_achetee,
                'id_fournisseur' => $request->id_fournisseur,
                'prix' => $request->prix,
                'date_achat' => $request->date_achat,
                'unite_id' => $request->unite_id,
            ]);
            return response()->json([
                'status' => 200,
                'message' => 'Marchandise updated successfully!',
                'data' => $marchandise,
            ], 200);

    }
}





        }


    }


    public function showMarchandise($id)
    {
        $marchandise = Marchandise::with('ingredient' , 'packaging' , 'fournisseur')->find($id); // Load the role information
        if (!$marchandise) {
            return response()->json([
                'message' => 'Marchandise Not Found.'
            ], 404);
        }
        return response()->json([
            'marchandise' => $marchandise
        ], 200);
    }







    public function destroy($id)
    {
        $marchandise = Marchandise::find($id);

        if (!$marchandise) {
            return response()->json([
                'success' => false,
                'message' => 'Marchandise non trouvé',
            ], 404);
        }

        try {
            $marchandise->delete();
            return response()->json([
                'success' => true,
                'message' => 'Marchandise supprimé avec succès',
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Erreur lors de la suppression du produit',
                'error' => $e->getMessage(),
            ], 500);
        }
    }


}
