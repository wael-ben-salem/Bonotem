<?php

namespace App\Http\Controllers;

use App\Models\Cartes;
use App\Models\Marchandise;
use App\Models\Ventes;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class VentesController extends Controller
{
    public function ventes(Request $request)
        {
            // Eager load the products with each category
            $ventes = Ventes::with('carte','produit','categorie')->get();

            return response()->json($ventes);
        }






        public function store(Request $request)
        {
            $validator = Validator::make($request->all(), [
                'quantite' => 'required|integer|min:1',
            ], [
                'id_carte.unique' => 'Ce produit est déjà utilisé dans les ventes.',
                'id_carte.required' => 'Le champ produit est requis.',
                'quantite.required' => 'Le champ quantité est requis.',
                'quantite.integer' => 'Le champ quantité doit être un nombre entier.',
                'quantite.min' => 'Le champ quantité doit être d\'au moins :min.',
            ]);

            if ($validator->fails()) {
                return response()->json([
                    'validation_errors' => $validator->messages(),
                ]);
            } else {
                $carte = Cartes::findOrFail($request->id_carte);
                $quantiteDemandee = $request->quantite;

                // Vérifiez si les ingrédients nécessaires sont disponibles en quantité suffisante dans les marchandises
                $ingredients = $carte->produit->ingredients;
                $packagings = $carte->produit->packagings;

                foreach ($ingredients as $ingredient) {
                    $marchandiseIngredient = Marchandise::where('id_ingredient', $ingredient->id)->latest()->first();

                    $quantiteRequiseIngredient = $ingredient->pivot->quantite * $quantiteDemandee;
                }
                foreach ($packagings as $packaging) {
                    $marchandisePackaging = Marchandise::where('id_packaging', $packaging->id)->latest()->first();

                    $quantiteRequisePackaging = $packaging->pivot->nombre_package * $quantiteDemandee;
                }
                    if ((($marchandiseIngredient->quantite_achetee - $marchandiseIngredient->quantite_consomee) < $quantiteRequiseIngredient) && (($marchandisePackaging->quantite_achetee - $marchandisePackaging->quantite_consomee) < $quantiteRequisePackaging)) {
                        return response()->json([
                            'message' => 'Il n\'y a pas assez de quantité disponible pour ce produit.',
                        ], 400);
                    }else{
                        $prixTTC = ($carte->prix * $quantiteDemandee) * 1.18;

                        // Enregistrer la vente
                        $vente = new Ventes();
                        $vente->id_carte = $request->id_carte;
                        $vente->id_produit = $carte->id_produit;
                        $vente->id_categorie = $carte->id_categorie;
                        $vente->quantite = $quantiteDemandee;
                        $vente->prixTTC = $prixTTC;
                        $vente->save();

                        // Mettre à jour les quantités consommées et en stock dans les marchandises
                        $quantiteIngredientConsomeeTotal = 0;
                        $quantitePackagingConsomeeTotal = 0;
                        $quantitePackagingEnStockTotal = 0;

                        $quantiteIngredientEnStockTotal = 0;
                        foreach ($ingredients as $ingredient) {
                            $marchandiseIngredient = Marchandise::where('id_ingredient', $ingredient->id)->latest()->first();
                            $quantiteRequiseIngredient = $ingredient->pivot->quantite * $quantiteDemandee;
                            $marchandiseIngredient->quantite_consomee += $quantiteRequiseIngredient;
                            $marchandiseIngredient->quantite_en_stock = ($marchandiseIngredient->quantite_achetee + $quantiteRequiseIngredient)- $marchandiseIngredient->quantite_en_stock;
                            $marchandiseIngredient->save();
                            $quantiteIngredientConsomeeTotal += $marchandiseIngredient->quantite_consomee;
                            $quantiteIngredientEnStockTotal += $marchandiseIngredient->quantite_en_stock;
                        }


                        foreach ($packagings as $packaging) {
                            $marchandisePackaging = Marchandise::where('id_packaging', $packaging->id)->latest()->first();
                            $quantiteRequisePackaging = $packaging->pivot->nombre_package * $quantiteDemandee;
                            $marchandisePackaging->quantite_consomee += $quantiteRequisePackaging;
                            $marchandisePackaging->quantite_en_stock = ($marchandisePackaging->quantite_achetee + $quantiteRequisePackaging)- $marchandisePackaging->quantite_en_stock;
                            $marchandisePackaging->save();
                            $quantitePackagingConsomeeTotal += $marchandisePackaging->quantite_consomee;
                            $quantitePackagingEnStockTotal += $marchandisePackaging->quantite_en_stock;
                        }

                        return response()->json([
                            'id_produit' => $carte->id_produit,
                            'id_categorie' => $carte->id_categorie,
                            'quantite' => $quantiteDemandee,
                            'prixTTC' => $prixTTC,
                            'quantite_consomeeIngredient_total' => $quantiteIngredientConsomeeTotal,
                            'quantite_en_stockIngredient_total' => $quantiteIngredientEnStockTotal,
                            'quantite_consomeePackaging_total' => $quantitePackagingConsomeeTotal,
                            'quantite_en_stockPackaging_total' => $quantitePackagingEnStockTotal,
                            'message' => "Vente enregistrée avec succès."
                        ], 200);




                    }


                // Calculer le prix TT

            }
        }



// public function update(Request $request , $id)
//         {
//             $validator = Validator::make($request->all(), [
//                 'quantite' => 'required|integer|min:1',
//                 'quantite_avant' => 'required|integer|min:1',

//             ], [
//                 'id_carte.unique' => 'Ce produit est déjà utilisé dans les ventes.',
//                 'id_carte.required' => 'Le champ produit est requis.',
//                 'quantite.required' => 'Le champ quantité est requis.',
//                 'quantite.integer' => 'Le champ quantité doit être un nombre entier.',
//                 'quantite.min' => 'Le champ quantité doit être d\'au moins :min.',
//                 'quantite_avant.required' => 'Le champ quantité est requis.',
//                 'quantite_avant.integer' => 'Le champ quantité doit être un nombre entier.',
//                 'quantite_avant.min' => 'Le champ quantité doit être d\'au moins :min.',

//             ]);

//             if ($validator->fails()) {
//                 return response()->json([
//                     'validation_errors' => $validator->messages(),
//                 ]);
//             } else {

//                $carte = Cartes::findOrFail($request->id_carte);
//                 $quantiteDemandee = $request->quantite;
//                 $quantiteAvant = $request->quantite_avant;


//                 // Vérifiez si les ingrédients nécessaires sont disponibles en quantité suffisante dans les marchandises
//                 $ingredients = $carte->produit->ingredients;
//                 $packagings = $carte->produit->packagings;

//                 foreach ($ingredients as $ingredient) {
//                     $marchandiseIngredient = Marchandise::where('id_ingredient', $ingredient->id)->latest()->first();

//                     $quantiteRequiseIngredient = $ingredient->pivot->quantite * $quantiteDemandee;
//                     $quantiteRequiseAvantIngredient = $ingredient->pivot->quantite * $quantiteAvant;

//                 }
//                 foreach ($packagings as $packaging) {
//                     $marchandisePackaging = Marchandise::where('id_packaging', $packaging->id)->latest()->first();

//                     $quantiteRequisePackaging = $packaging->pivot->nombre_package * $quantiteDemandee;
//                     $quantiteRequiseAvantPackaging = $packaging->pivot->nombre_package * $quantiteAvant;

//                 }
//                     if ((($marchandiseIngredient->quantite_achetee - ($marchandiseIngredient->quantite_consomee - $quantiteRequiseAvantIngredient)) < $quantiteRequiseIngredient) && (($marchandisePackaging->quantite_achetee -( $marchandisePackaging->quantite_consomee - $quantiteRequiseAvantPackaging)) < $quantiteRequisePackaging)) {
//                         return response()->json([
//                             'message' => 'Il n\'y a pas assez de quantité disponible pour ce produit.',
//                         ], 400);
//                     }else{


//                          // Mettre à jour la vente existant
//                          $prixTTC = ($carte->prix * $quantiteDemandee) * 1.18;

//                          // Mettre à jour la vente existante
//                          $vente = Ventes::findOrFail($id);
//                          $vente->id_carte = $request->id_carte;
//                          $vente->id_produit = $carte->id_produit;
//                          $vente->id_categorie = $carte->id_categorie;
//                          $vente->quantite = $quantiteDemandee;
//                          $vente->prixTTC = $prixTTC;
//                          $vente->save();


//                         // Mettre à jour les quantités consommées et en stock dans les marchandises
//                         $quantiteIngredientConsomeeTotal = 0;
//                         $quantitePackagingConsomeeTotal = 0;
//                         $quantitePackagingEnStockTotal = 0;

//                         $quantiteIngredientEnStockTotal = 0;
//                         foreach ($ingredients as $ingredient) {
//                             $marchandiseIngredient = Marchandise::where('id_ingredient', $ingredient->id)->latest()->first();
//                             $quantiteRequiseIngredient = $ingredient->pivot->quantite * $quantiteDemandee;
//                             $quantiteRequiseAvantIngredient = $ingredient->pivot->quantite * $quantiteAvant;

//                             $marchandiseIngredient->quantite_consomee += $quantiteRequiseIngredient - $quantiteRequiseAvantIngredient;
//                             $marchandiseIngredientquantite_en_stock = ($marchandiseIngredient->quantite_achetee + $quantiteRequiseIngredient)- $marchandiseIngredient->quantite_en_stock ;
//                             $marchandiseIngredient->quantite_en_stock = $marchandiseIngredientquantite_en_stock + ($marchandiseIngredient->quantite_achetee + $quantiteRequiseAvantIngredient);
//                             $marchandiseIngredient->save();
//                             $quantiteIngredientConsomeeTotal += $marchandiseIngredient->quantite_consomee;
//                             $quantiteIngredientEnStockTotal += $marchandiseIngredient->quantite_en_stock;
//                         }







//                         foreach ($packagings as $packaging) {
//                             $marchandisePackaging = Marchandise::where('id_packaging', $packaging->id)->latest()->first();
//                             $quantiteRequisePackaging = $packaging->pivot->nombre_package * $quantiteDemandee;
//                             $quantiteRequiseAvanatPackaging = $packaging->pivot->nombre_package * $quantiteAvant;


//                             $marchandisePackaging->quantite_consomee += $quantiteRequisePackaging -$quantiteRequiseAvanatPackaging;
//                             $marchandisePackagingquantite_en_stock = ($marchandisePackaging->quantite_achetee + $quantiteRequisePackaging)- $marchandisePackaging->quantite_en_stock ;
//                             $marchandisePackaging->quantite_en_stock  = $marchandisePackagingquantite_en_stock + ($marchandisePackaging->quantite_achetee + $quantiteRequiseAvantPackaging);

//                             $marchandisePackaging->save();
//                             $quantitePackagingConsomeeTotal += $marchandisePackaging->quantite_consomee;
//                             $quantitePackagingEnStockTotal += $marchandisePackaging->quantite_en_stock;
//                         }

//                         return response()->json([
//                             'id_produit' => $carte->id_produit,
//                             'id_categorie' => $carte->id_categorie,
//                             'quantite' => $quantiteDemandee,
//                             'prixTTC' => $prixTTC,
//                             'quantite_consomeeIngredient_total' => $quantiteIngredientConsomeeTotal,
//                             'quantite_en_stockIngredient_total' => $quantiteIngredientEnStockTotal,
//                             'quantite_consomeePackaging_total' => $quantitePackagingConsomeeTotal,
//                             'quantite_en_stockPackaging_total' => $quantitePackagingEnStockTotal,
//                             'message' => "Vente enregistrée avec succès."
//                         ], 200);




//                     }


//                 // Calculer le prix TT


//         }
//         }




        public function update(Request $request , $id)
        {
            $validator = Validator::make($request->all(), [
                'quantite' => 'required|integer|min:1',
                'quantite_apres' => 'required|integer|min:1',

            ], [
                'id_carte.unique' => 'Ce produit est déjà utilisé dans les ventes.',
                'id_carte.required' => 'Le champ produit est requis.',
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

               $carte = Cartes::findOrFail($request->id_carte);
                $quantiteDemandee = $request->quantite_apres;
                $quantiteAvant = $request->quantite;


                // Vérifiez si les ingrédients nécessaires sont disponibles en quantité suffisante dans les marchandises
                $ingredients = $carte->produit->ingredients;
                $packagings = $carte->produit->packagings;

                foreach ($ingredients as $ingredient) {
                    $marchandiseIngredient = Marchandise::where('id_ingredient', $ingredient->id)->latest()->first();

                    $quantiteRequiseIngredient = $ingredient->pivot->quantite * $quantiteDemandee;
                    $quantiteRequiseAvantIngredient = $ingredient->pivot->quantite * $quantiteAvant;

                }
                foreach ($packagings as $packaging) {
                    $marchandisePackaging = Marchandise::where('id_packaging', $packaging->id)->latest()->first();

                    $quantiteRequisePackaging = $packaging->pivot->nombre_package * $quantiteDemandee;
                    $quantiteRequiseAvantPackaging = $packaging->pivot->nombre_package * $quantiteAvant;

                }
                    if ((($marchandiseIngredient->quantite_achetee - ($marchandiseIngredient->quantite_consomee - $quantiteRequiseAvantIngredient)) < $quantiteRequiseIngredient) && (($marchandisePackaging->quantite_achetee -( $marchandisePackaging->quantite_consomee - $quantiteRequiseAvantPackaging)) < $quantiteRequisePackaging)) {
                        return response()->json([
                            'message' => 'Il n\'y a pas assez de quantité disponible pour ce produit.',
                        ], 400);
                    }else{

                        $carte = Cartes::findOrFail($request->id_carte);

                         // Mettre à jour la vente existant
                         $prixTTC = ($carte->prix * $quantiteDemandee) * 1.18;

                         // Mettre à jour la vente existante
                         $vente = Ventes::findOrFail($id);
                         $vente->id_carte = $request->id_carte;
                         $vente->id_produit = $carte->id_produit;
                         $vente->id_categorie = $carte->id_categorie;
                         $vente->quantite = $quantiteDemandee;

                         $vente->prixTTC = $prixTTC;
                         $vente->save();


                        // Mettre à jour les quantités consommées et en stock dans les marchandises
                        $quantiteIngredientConsomeeTotal = 0;
                        $quantitePackagingConsomeeTotal = 0;
                        $quantitePackagingEnStockTotal = 0;

                        $quantiteIngredientEnStockTotal = 0;
                        foreach ($ingredients as $ingredient) {
                            $marchandiseIngredient = Marchandise::where('id_ingredient', $ingredient->id)->latest()->first();
                            $quantiteRequiseIngredient = $ingredient->pivot->quantite * $quantiteDemandee;
                            $quantiteRequiseAvantIngredient = $ingredient->pivot->quantite * $quantiteAvant;

                            $marchandiseIngredient->quantite_consomee += $quantiteRequiseIngredient - $quantiteRequiseAvantIngredient;
                            $marchandiseIngredientquantite_en_stock = ($marchandiseIngredient->quantite_achetee + $quantiteRequiseIngredient)- $marchandiseIngredient->quantite_en_stock ;
                            $marchandiseIngredient->quantite_en_stock = $marchandiseIngredientquantite_en_stock + ($marchandiseIngredient->quantite_achetee + $quantiteRequiseAvantIngredient);
                            $marchandiseIngredient->save();
                            $quantiteIngredientConsomeeTotal += $marchandiseIngredient->quantite_consomee;
                            $quantiteIngredientEnStockTotal += $marchandiseIngredient->quantite_en_stock;
                        }







                        foreach ($packagings as $packaging) {
                            $marchandisePackaging = Marchandise::where('id_packaging', $packaging->id)->latest()->first();
                            $quantiteRequisePackaging = $packaging->pivot->nombre_package * $quantiteDemandee;
                            $quantiteRequiseAvanatPackaging = $packaging->pivot->nombre_package * $quantiteAvant;


                            $marchandisePackaging->quantite_consomee += $quantiteRequisePackaging -$quantiteRequiseAvanatPackaging;
                            $marchandisePackagingquantite_en_stock = ($marchandisePackaging->quantite_achetee + $quantiteRequisePackaging)- $marchandisePackaging->quantite_en_stock ;
                            $marchandisePackaging->quantite_en_stock  = $marchandisePackagingquantite_en_stock + ($marchandisePackaging->quantite_achetee + $quantiteRequiseAvantPackaging);

                            $marchandisePackaging->save();
                            $quantitePackagingConsomeeTotal += $marchandisePackaging->quantite_consomee;
                            $quantitePackagingEnStockTotal += $marchandisePackaging->quantite_en_stock;
                        }

                        return response()->json([
                            'id_produit' => $carte->id_produit,
                            'id_categorie' => $carte->id_categorie,
                            'quantite' => $quantiteDemandee,
                            'prixTTC' => $prixTTC,
                            'quantite_consomeeIngredient_total' => $quantiteIngredientConsomeeTotal,
                            'quantite_en_stockIngredient_total' => $quantiteIngredientEnStockTotal,
                            'quantite_consomeePackaging_total' => $quantitePackagingConsomeeTotal,
                            'quantite_en_stockPackaging_total' => $quantitePackagingEnStockTotal,
                            'message' => "Vente enregistrée avec succès."
                        ], 200);




                    }


                // Calculer le prix TT


        }
        }















public function show($id)
{
    // Find the sale by ID
    $vente = Ventes::findOrFail($id);

    return response()->json($vente);
}

public function destroy($id)
{
    // Find the sale by ID
    $vente = Ventes::findOrFail($id);

    // Delete the sale
    $vente->delete();

    return response()->json(['message' => 'Sale successfully deleted.'], 200);
}


}
