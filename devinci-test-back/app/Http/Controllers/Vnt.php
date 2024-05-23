<?php

namespace App\Http\Controllers;

use App\Models\Cartes;
use App\Models\Marchandise;
use App\Models\Ventes;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class VentesController extends Controller
{
    public function ventes(Request $request,$id)
        {
            // Eager load the products with each category
            $ventes = Ventes::with('carte','produit','categorie')->where('id_creator', $id)
            ->get();

            return response()->json($ventes);
        }






        public function store(Request $request,$id)
        {
            $validator = Validator::make($request->all(), [
                'id_carte' => 'required|exists:cartes,id|unique:ventes',
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


                if ($carte->ingredient_compose !== null) {
                    $ingredientsCompose = $carte->ingredient_compose->ingredients;
                    foreach ($ingredientsCompose as $ingredient) {
                        $marchandiseIngredient = Marchandise::where('id_ingredient', $ingredient->id)->latest()->first();

                        $quantiteRequiseIngredient = $ingredient->pivot->quantite * $quantiteDemandee;
                    }
                    $validator->after(function ($validator) use ( $marchandiseIngredient, $quantiteRequiseIngredient) {
                        if ( is_null($marchandiseIngredient)) {
                            $validator->errors()->add('quantite', 'Pas de stock d ingredient pour cette quantité.');
                        } elseif (($marchandiseIngredient->quantite_achetee - $marchandiseIngredient->quantite_consomee) < $quantiteRequiseIngredient) {
                            $validator->errors()->add('quantite', 'Quantité insuffisante d ingredient pour ce produit.');
                        }
                    });

                    if ($validator->fails()) {
                        return response()->json([
                            'validation_errors' => $validator->messages(),
                        ]);
                    }else{
                        $prixTTC = ($carte->prix * $quantiteDemandee) * 1.18;

                                // Enregistrer la vente
                                $vente = new Ventes();
                                $vente->id_carte = $request->id_carte;
                                $vente->id_ingredient_compose = $carte->id_ingredient_compose;
                                $vente->id_categorie = $carte->id_categorie;
                                $vente->quantite = $quantiteDemandee;
                                $vente->prixTTC = $prixTTC;
                                $vente->id_creator = $id;


                                $vente->save();

                                // Mettre à jour les quantités consommées et en stock dans les marchandises
                                $quantiteConsomeeIngredientTotal = 0;
                                $quantiteEnStockIngredientTotal = 0;
                                foreach ($ingredientsCompose as $ingredient) {
                                    $marchandiseIngredient = Marchandise::where('id_ingredient', $ingredient->id)->latest()->first();
                                    $quantiteRequiseIngredient = $ingredient->pivot->quantite * $quantiteDemandee;
                                    $marchandiseIngredient->quantite_consomee += $quantiteRequiseIngredient;
                                    $marchandiseIngredient->quantite_en_stock = ($marchandiseIngredient->quantite_achetee + $marchandiseIngredient->quantite_en_stock)-  $quantiteRequiseIngredient;
                                    $marchandiseIngredient->save();
                                    $quantiteConsomeeIngredientTotal += $marchandiseIngredient->quantite_consomee;
                                    $quantiteEnStockIngredientTotal += $marchandiseIngredient->quantite_en_stock;
                                }




                    }
                    return response()->json([
                        'id_produit' => $carte->id_produit,
                        'id_categorie' => $carte->id_categorie,
                        'quantite' => $quantiteDemandee,
                        'prixTTC' => $prixTTC,


                        'quantite_consomee_ingredient_total' => $quantiteConsomeeIngredientTotal,
                        'quantite_en_stock_ingredient_total' => $quantiteEnStockIngredientTotal,
                        'message' => "Vente enregistrée avec succès."
                    ], 200);







                }else if($carte->produit !==null){


                $ingredients = $carte->produit->ingredients;
                $packagings = $carte->produit->packagings;
                // Si la carte n'a que des ingrédients
        if ($ingredients->isNotEmpty() && $packagings->isEmpty()) {
            // Traitement des ingrédients uniquement
            foreach ($ingredients as $ingredient) {
                $marchandiseIngredient = Marchandise::where('id_ingredient', $ingredient->id)->latest()->first();

                $quantiteRequiseIngredient = $ingredient->pivot->quantite * $quantiteDemandee;
            }
            $validator->after(function ($validator) use ( $marchandiseIngredient, $quantiteRequiseIngredient) {
                if ( is_null($marchandiseIngredient)) {
                    $validator->errors()->add('quantite', 'Pas de stock d ingredient pour cette quantité.');
                } elseif (($marchandiseIngredient->quantite_achetee - $marchandiseIngredient->quantite_consomee) < $quantiteRequiseIngredient) {
                    $validator->errors()->add('quantite', 'Quantité insuffisante d ingredient pour ce produit.');
                }
            });

            if ($validator->fails()) {
                return response()->json([
                    'validation_errors' => $validator->messages(),
                ]);
            }else{
                $prixTTC = ($carte->prix * $quantiteDemandee) * 1.18;

                        // Enregistrer la vente
                        $vente = new Ventes();
                        $vente->id_carte = $request->id_carte;
                        $vente->id_produit = $carte->id_produit;
                        $vente->id_categorie = $carte->id_categorie;
                        $vente->quantite = $quantiteDemandee;
                        $vente->prixTTC = $prixTTC;
                        $vente->id_creator = $id;


                        $vente->save();

                        // Mettre à jour les quantités consommées et en stock dans les marchandises
                        $quantiteConsomeeIngredientTotal = 0;
                        $quantiteEnStockIngredientTotal = 0;
                        foreach ($ingredients as $ingredient) {
                            $marchandiseIngredient = Marchandise::where('id_ingredient', $ingredient->id)->latest()->first();
                            $quantiteRequiseIngredient = $ingredient->pivot->quantite * $quantiteDemandee;
                            $marchandiseIngredient->quantite_consomee += $quantiteRequiseIngredient;
                            $marchandiseIngredient->quantite_en_stock = ($marchandiseIngredient->quantite_achetee + $marchandiseIngredient->quantite_en_stock)-  $quantiteRequiseIngredient;
                            $marchandiseIngredient->save();
                            $quantiteConsomeeIngredientTotal += $marchandiseIngredient->quantite_consomee;
                            $quantiteEnStockIngredientTotal += $marchandiseIngredient->quantite_en_stock;
                        }




            }


        }else if ($packagings->isNotEmpty() && $ingredients->isEmpty()) {
            // Traitement des emballages uniquement
            foreach ($packagings as $packaging) {
                $marchandisePackaging = Marchandise::where('id_packaging', $packaging->id)->latest()->first();

                $quantiteRequisePackaging = $packaging->pivot->nombre_package * $quantiteDemandee;
            }

            $validator->after(function ($validator) use ($marchandisePackaging, $quantiteRequisePackaging) {
                if (is_null($marchandisePackaging) ) {
                    $validator->errors()->add('quantite', 'Pas de stock de packaging pour cette quantité.');
                } elseif (($marchandisePackaging->quantite_achetee - $marchandisePackaging->quantite_consomee) < $quantiteRequisePackaging) {
                    $validator->errors()->add('quantite', 'Quantité insuffisante de packaging pour ce produit.');
                }
            });


            if ($validator->fails()) {
                return response()->json([
                    'validation_errors' => $validator->messages(),
                ]);
            }


        else{
            $prixTTC = ($carte->prix * $quantiteDemandee) * 1.18;

                        // Enregistrer la vente
                        $vente = new Ventes();
                        $vente->id_carte = $request->id_carte;
                        $vente->id_produit = $carte->id_produit;
                        $vente->id_categorie = $carte->id_categorie;
                        $vente->quantite = $quantiteDemandee;
                        $vente->prixTTC = $prixTTC;
                        $vente->id_creator = $id;

                        $vente->save();



                        $quantiteConsomeePackagingTotal = 0;
                        $quantiteEnStockPackagingTotal = 0;
                        foreach ($packagings as $packaging) {
                            $marchandisePackaging = Marchandise::where('id_packaging', $packaging->id)->latest()->first();
                            $quantiteRequisePackaging = $packaging->pivot->nombre_package * $quantiteDemandee;
                            $marchandisePackaging->quantite_consomee += $quantiteRequisePackaging;
                            $marchandisePackaging->quantite_en_stock = ($marchandisePackaging->quantite_achetee + $marchandisePackaging->quantite_en_stock)-  $quantiteRequisePackaging;
                            $marchandisePackaging->save();
                            $quantiteConsomeePackagingTotal += $marchandisePackaging->quantite_consomee;
                            $quantiteEnStockPackagingTotal += $marchandisePackaging->quantite_en_stock;
                        }
        }

        }else {
                // Vérifiez si les ingrédients nécessaires sont disponibles en quantité suffisante dans les marchandises
                $ingredients = $carte->produit->ingredients;
                foreach ($ingredients as $ingredient) {
                    $marchandiseIngredient = Marchandise::where('id_ingredient', $ingredient->id)->latest()->first();

                    $quantiteRequiseIngredient = $ingredient->pivot->quantite * $quantiteDemandee;
                }

                $packagings = $carte->produit->packagings;
                foreach ($packagings as $packaging) {
                    $marchandisePackaging = Marchandise::where('id_packaging', $packaging->id)->latest()->first();

                    $quantiteRequisePackaging = $packaging->pivot->nombre_package * $quantiteDemandee;
                }





                $validator->after(function ($validator) use ($marchandisePackaging, $marchandiseIngredient, $quantiteRequisePackaging, $quantiteRequiseIngredient) {
                    if (is_null($marchandisePackaging)  ) {
                        $validator->errors()->add('quantite', 'Pas de stock de packaging pour cette quantité.');
                    }else if (is_null($marchandiseIngredient)){
                        $validator->errors()->add('quantite', 'Pas de stock d ingredient pour cette quantité.');

                    }else if (($marchandisePackaging->quantite_achetee - $marchandisePackaging->quantite_consomee) < $quantiteRequisePackaging){
                        $validator->errors()->add('quantite', 'Quantité insuffisante de packaging pour ce produit.');

                    }



                    elseif (($marchandiseIngredient->quantite_achetee - $marchandiseIngredient->quantite_consomee) < $quantiteRequiseIngredient) {
                        $validator->errors()->add('quantite', 'Quantité insuffisante d ingredient pour ce produit.');
                    }
                });



                    if ($validator->fails()) {
                        return response()->json([
                            'validation_errors' => $validator->messages(),
                        ]);
                    }


                else{
                        $prixTTC = ($carte->prix * $quantiteDemandee) * 1.18;

                        // Enregistrer la vente
                        $vente = new Ventes();
                        $vente->id_carte = $request->id_carte;
                        $vente->id_produit = $carte->id_produit;
                        $vente->id_categorie = $carte->id_categorie;
                        $vente->quantite = $quantiteDemandee;
                        $vente->prixTTC = $prixTTC;
                        $vente->id_creator = $id;

                        $vente->save();

                        // Mettre à jour les quantités consommées et en stock dans les marchandises
                        $quantiteConsomeeIngredientTotal = 0;
                        $quantiteEnStockIngredientTotal = 0;
                        foreach ($ingredients as $ingredient) {
                            $marchandiseIngredient = Marchandise::where('id_ingredient', $ingredient->id)->latest()->first();
                            $quantiteRequiseIngredient = $ingredient->pivot->quantite * $quantiteDemandee;
                            $marchandiseIngredient->quantite_consomee += $quantiteRequiseIngredient;
                            $marchandiseIngredient->quantite_en_stock = ($marchandiseIngredient->quantite_achetee + $marchandiseIngredient->quantite_en_stock)-  $quantiteRequiseIngredient;
                            $marchandiseIngredient->save();
                            $quantiteConsomeeIngredientTotal += $marchandiseIngredient->quantite_consomee;
                            $quantiteEnStockIngredientTotal += $marchandiseIngredient->quantite_en_stock;
                        }

                        $quantiteConsomeePackagingTotal = 0;
                        $quantiteEnStockPackagingTotal = 0;
                        foreach ($packagings as $packaging) {
                            $marchandisePackaging = Marchandise::where('id_packaging', $packaging->id)->latest()->first();
                            $quantiteRequisePackaging = $packaging->pivot->nombre_package * $quantiteDemandee;
                            $marchandisePackaging->quantite_consomee += $quantiteRequisePackaging;
                            $marchandisePackaging->quantite_en_stock = ($marchandisePackaging->quantite_achetee + $marchandisePackaging->quantite_en_stock)-  $quantiteRequisePackaging;
                            $marchandisePackaging->save();
                            $quantiteConsomeePackagingTotal += $marchandisePackaging->quantite_consomee;
                            $quantiteEnStockPackagingTotal += $marchandisePackaging->quantite_en_stock;
                        }
                    }

                        return response()->json([
                            'id_produit' => $carte->id_produit,
                            'id_categorie' => $carte->id_categorie,
                            'quantite' => $quantiteDemandee,
                            'prixTTC' => $prixTTC,
                            'quantite_consomee_packaging_total' => $quantiteConsomeePackagingTotal,
                            'quantite_en_stock_packaging_total' => $quantiteEnStockPackagingTotal,

                            'quantite_consomee_ingredient_total' => $quantiteConsomeeIngredientTotal,
                            'quantite_en_stock_ingredient_total' => $quantiteEnStockIngredientTotal,
                            'message' => "Vente enregistrée avec succès."
                        ], 200);


                    }

                    }
                }


            }



// public function update(Request $request, $id)
// {
//     $validator = Validator::make($request->all(), [
//         'quantite' => 'required|integer|min:1',
//     ], [
//         'quantite.required' => 'Le champ quantité est requis.',
//         'quantite.integer' => 'Le champ quantité doit être un nombre entier.',
//         'quantite.min' => 'Le champ quantité doit être d\'au moins :min.',
//     ]);

//     if ($validator->fails()) {
//         return response()->json([
//             'validation_errors' => $validator->messages(),
//         ]);
//     }
//     else {
//         // Find the sale by ID
//         $vente = Ventes::findOrFail($id);

//         // Retrieve the card associated with the sale
//         $carte = Cartes::findOrFail($vente->id_carte);

//         // Calculate the new total price including tax based on the updated quantity
//         $prixTTC = ($carte->prix * $request->quantite) * 1.18;

//         // Update the sale's quantity and recalculated total price
//         $vente->quantite = $request->quantite;
//         $vente->prixTTC = $prixTTC;
//         $vente->save();

//         return response()->json([
//             'id_produit' => $carte->id_produit,
//             'id_categorie' => $carte->id_categorie,
//             'quantite' => $request->quantite,
//             'prixTTC' => $prixTTC,
//             'message' => "Sale successfully updated with new quantity."
//         ], 200);
//     }
// }


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

        $quantiteDemandee = $request->quantite_apres;
        $quantiteAvant = $request->quantite;


        // Vérifiez si les ingrédients nécessaires sont disponibles en quantité suffisante dans les marchandises
        $carte =  Cartes::findOrFail($request->id_carte);

        $ingredients = $carte->produit->ingredients;
        $packagings = $carte->produit->packagings;
         // Mettre à jour les quantités consommées et en stock dans les marchandises
         $quantiteIngredientConsomeeTotal = 0;
         $quantitePackagingConsomeeTotal = 0;
         $quantitePackagingEnStockTotal = 0;
         $quantiteIngredientEnStockTotal = 0;

        if ($ingredients->isNotEmpty() && $packagings->isEmpty()) {
            foreach ($ingredients as $ingredient) {
                $marchandiseIngredient = Marchandise::where('id_ingredient', $ingredient->id)->latest()->first();

                $quantiteRequiseIngredient = $ingredient->pivot->quantite * $quantiteDemandee;
                $quantiteRequiseAvantIngredient = $ingredient->pivot->quantite * $quantiteAvant;

            }
            $validator->after(function ($validator) use ( $marchandiseIngredient, $quantiteRequiseAvantIngredient, $quantiteRequiseIngredient) {

            if (is_null($marchandiseIngredient)){
                $validator->errors()->add('quantite', 'Pas de stock d ingredient pour cette quantité.');

            }else if((($marchandiseIngredient->quantite_achetee - ($marchandiseIngredient->quantite_consomee - $quantiteRequiseAvantIngredient)) < $quantiteRequiseIngredient) ) {
                $validator->errors()->add('quantite', 'Quantité insuffisante d ingredeint pour ce produit.');
            }
        });

        if ($validator->fails()) {
            return response()->json([
                'validation_errors' => $validator->messages(),
            ]);
        }else{
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


              foreach ($ingredients as $ingredient) {
                $marchandiseIngredient = Marchandise::where('id_ingredient', $ingredient->id)->latest()->first();
                $quantiteRequiseIngredient = $ingredient->pivot->quantite * $quantiteDemandee;
                $quantiteRequiseAvantIngredient = $ingredient->pivot->quantite * $quantiteAvant;
                if(($marchandiseIngredient ->quantite_consomee == null) && ($quantiteRequiseIngredient - $quantiteRequiseAvantIngredient < 0)){
                    $marchandiseIngredient->quantite_consomee = -($quantiteRequiseIngredient - $quantiteRequiseAvantIngredient);
                    $marchandiseIngredient->quantite_en_stock =  $marchandiseIngredient ->quantite_en_stock + ($quantiteRequiseIngredient - $quantiteRequiseAvantIngredient);
                    $marchandiseIngredient->save();

                    $quantiteIngredientEnStockTotal =$marchandiseIngredient->quantite_en_stock ;
                    $quantiteIngredientConsomeeTotal = $marchandiseIngredient->quantite_consomee;

                }else if(($marchandiseIngredient ->quantite_consomee == null) && ($quantiteRequiseIngredient - $quantiteRequiseAvantIngredient > 0) ){
                    $marchandiseIngredient->quantite_consomee = $quantiteRequiseIngredient - $quantiteRequiseAvantIngredient;

                    $marchandiseIngredient ->quantite_en_stock = $marchandiseIngredient ->quantite_en_stock - ($quantiteRequiseIngredient - $quantiteRequiseAvantIngredient);
                    $marchandiseIngredient->save();

                    $quantiteIngredientEnStockTotal =$marchandiseIngredient->quantite_en_stock ;
                    $quantiteIngredientConsomeeTotal = $marchandiseIngredient->quantite_consomee;

                }else if(($marchandiseIngredient ->quantite_consomee !== null) && ($quantiteRequiseIngredient - $quantiteRequiseAvantIngredient < 0) ){

                $marchandiseIngredient->quantite_consomee = -($quantiteRequiseIngredient - $quantiteRequiseAvantIngredient);
                $marchandiseIngredient->quantite_en_stock  = $marchandiseIngredient ->quantite_en_stock - ($quantiteRequiseIngredient - $quantiteRequiseAvantIngredient);
                $marchandiseIngredient->save();
                $quantiteIngredientConsomeeTotal = $marchandiseIngredient->quantite_consomee;
                $quantiteIngredientEnStockTotal = $marchandiseIngredient->quantite_en_stock;

            }else if(($marchandiseIngredient ->quantite_consomee !== null) && ($quantiteRequiseIngredient - $quantiteRequiseAvantIngredient > 0) ){
                $marchandiseIngredient->quantite_consomee = $quantiteRequiseIngredient - $quantiteRequiseAvantIngredient;
                $marchandiseIngredient->quantite_en_stock  = $marchandiseIngredient ->quantite_en_stock - ($quantiteRequiseIngredient - $quantiteRequiseAvantIngredient);
                $marchandiseIngredient->save();
                $quantiteIngredientConsomeeTotal = $marchandiseIngredient->quantite_consomee;
                $quantiteIngredientEnStockTotal = $marchandiseIngredient->quantite_en_stock;

            }else {
                $marchandiseIngredient->quantite_en_stock  = $marchandiseIngredient ->quantite_en_stock + ($quantiteRequiseIngredient - $quantiteRequiseAvantIngredient);
                $marchandiseIngredient->save();
                $quantiteIngredientEnStockTotal = $marchandiseIngredient->quantite_en_stock;



            }



        }
        return response()->json([
            'id_produit' => $carte->id_produit,
            'id_categorie' => $carte->id_categorie,
            'quantite' => $quantiteDemandee,
            'prixTTC' => $prixTTC,
            'quantiteIngredientConsomeeTotal' => $quantiteIngredientConsomeeTotal,
            'quantiteIngredientEnStockTotal' => $quantiteIngredientEnStockTotal,
            'message' => "Vente enregistrée avec succès."
        ], 200);


    }


        }else if ($packagings->isNotEmpty() && $ingredients->isEmpty()) {
            foreach ($packagings as $packaging) {
                $marchandisePackaging = Marchandise::where('id_packaging', $packaging->id)->latest()->first();

                $quantiteRequisePackaging = $packaging->pivot->nombre_package * $quantiteDemandee;
                $quantiteRequiseAvantPackaging = $packaging->pivot->nombre_package * $quantiteAvant;

            }

            $validator->after(function ($validator) use ($marchandisePackaging, $quantiteRequisePackaging,$quantiteRequiseAvantPackaging) {

                if(is_null($marchandisePackaging)){
                    $validator->errors()->add('quantite', 'Pas de stock de packaging pour cette quantité.');



            }else if ((($marchandisePackaging->quantite_achetee -( $marchandisePackaging->quantite_consomee - $quantiteRequiseAvantPackaging)) < $quantiteRequisePackaging)) {

                    $validator->errors()->add('quantite', 'Quantité insuffisante de packaging pour ce produit.');

                }
            });



                if ($validator->fails()) {
                    return response()->json([
                        'validation_errors' => $validator->messages(),
                    ]);
                }else{

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




                 foreach ($packagings as $packaging) {
                    $marchandisePackaging = Marchandise::where('id_packaging', $packaging->id)->latest()->first();
                    $quantiteRequisePackaging = $packaging->pivot->nombre_package * $quantiteDemandee;
                    $quantiteRequiseAvanatPackaging = $packaging->pivot->nombre_package * $quantiteAvant;


                    if(($marchandisePackaging ->quantite_consomee == null) && ($quantiteRequisePackaging - $quantiteRequiseAvanatPackaging < 0)){

                        $marchandisePackaging->quantite_consomee = -($quantiteRequisePackaging - $quantiteRequiseAvanatPackaging);
                        $marchandisePackaging->quantite_en_stock =  $marchandisePackaging ->quantite_en_stock + ($quantiteRequisePackaging - $quantiteRequiseAvanatPackaging);
                        $marchandisePackaging->save();

                        $quantitePackagingEnStockTotal = $marchandisePackaging ->quantite_en_stock ;

                        $quantitePackagingConsomeeTotal = $marchandisePackaging->quantite_consomee;

                    }else if(($marchandisePackaging ->quantite_consomee == null) && ($quantiteRequisePackaging - $quantiteRequiseAvanatPackaging > 0) ){
                        $marchandisePackaging->quantite_consomee = $quantiteRequisePackaging - $quantiteRequiseAvanatPackaging;
                        $marchandisePackaging ->quantite_en_stock = $marchandisePackaging ->quantite_en_stock - ($quantiteRequisePackaging - $quantiteRequiseAvanatPackaging);
                        $marchandisePackaging->save();
                        $quantitePackagingEnStockTotal = $marchandisePackaging ->quantite_en_stock ;
                        $quantitePackagingConsomeeTotal = $marchandisePackaging->quantite_consomee;





                    }elseif(($marchandisePackaging ->quantite_consomee !== null) && ($quantiteRequisePackaging - $quantiteRequiseAvanatPackaging < 0) ){
                        $marchandisePackaging->quantite_consomee = -($quantiteRequisePackaging - $quantiteRequiseAvanatPackaging);
                        $marchandisePackaging->quantite_en_stock  = $marchandisePackaging ->quantite_en_stock - ($quantiteRequisePackaging - $quantiteRequiseAvanatPackaging);
                        $marchandisePackaging->save();
                        $quantitePackagingEnStockTotal = $marchandisePackaging ->quantite_en_stock ;
                        $quantitePackagingConsomeeTotal = $marchandisePackaging->quantite_consomee;

                    }else if(($marchandisePackaging ->quantite_consomee !== null) && ($quantiteRequisePackaging - $quantiteRequiseAvanatPackaging > 0) ){
                        $marchandisePackaging->quantite_consomee = $quantiteRequisePackaging - $quantiteRequiseAvanatPackaging;
                        $marchandisePackaging->quantite_en_stock  = $marchandisePackaging ->quantite_en_stock - ($quantiteRequisePackaging - $quantiteRequiseAvanatPackaging);
                        $marchandisePackaging->save();
                        $quantitePackagingConsomeeTotal = $marchandisePackaging->quantite_consomee;
                        $quantitePackagingEnStockTotal = $marchandisePackaging->quantite_en_stock;


                    }else {
                        $marchandisePackaging->quantite_en_stock  = $marchandisePackaging ->quantite_en_stock + ($quantiteRequisePackaging - $quantiteRequiseAvanatPackaging);
                        $marchandisePackaging->save();
                        $quantitePackagingEnStockTotal = $marchandisePackaging->quantite_en_stock;



                    }


                }
                return response()->json([
                    'id_produit' => $carte->id_produit,
                    'id_categorie' => $carte->id_categorie,
                    'quantite' => $quantiteDemandee,
                    'prixTTC' => $prixTTC,
                    'quantite_consomeePackaging_total' => $quantitePackagingConsomeeTotal,
                    'quantite_en_stockPackaging_total' => $quantitePackagingEnStockTotal,
                    'message' => "Vente enregistrée avec succès."
                ], 200);

                }









        }else{












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

        $validator->after(function ($validator) use ($marchandisePackaging, $marchandiseIngredient, $quantiteRequiseAvantIngredient, $quantiteRequisePackaging, $quantiteRequiseIngredient,$quantiteRequiseAvantPackaging) {

            if(is_null($marchandisePackaging)){
                $validator->errors()->add('quantite', 'Pas de stock de packaging pour cette quantité.');



        }else if (is_null($marchandiseIngredient)){
            $validator->errors()->add('quantite', 'Pas de stock d ingredient pour cette quantité.');

        }

        else if ((($marchandiseIngredient->quantite_achetee - ($marchandiseIngredient->quantite_consomee - $quantiteRequiseAvantIngredient)) < $quantiteRequiseIngredient) ) {
                $validator->errors()->add('quantite', 'Quantité insuffisante d ingredeint pour ce produit.');
            }else if ((($marchandisePackaging->quantite_achetee -( $marchandisePackaging->quantite_consomee - $quantiteRequiseAvantPackaging)) < $quantiteRequisePackaging)) {

                $validator->errors()->add('quantite', 'Quantité insuffisante de packaging pour ce produit.');

            }
        });



            if ($validator->fails()) {
                return response()->json([
                    'validation_errors' => $validator->messages(),
                ]);
            }else{


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



                foreach ($ingredients as $ingredient) {
                    $marchandiseIngredient = Marchandise::where('id_ingredient', $ingredient->id)->latest()->first();
                    $quantiteRequiseIngredient = $ingredient->pivot->quantite * $quantiteDemandee;
                    $quantiteRequiseAvantIngredient = $ingredient->pivot->quantite * $quantiteAvant;
                    if(($marchandiseIngredient ->quantite_consomee == null) && ($quantiteRequiseIngredient - $quantiteRequiseAvantIngredient < 0)){
                        $marchandiseIngredient->quantite_consomee = -($quantiteRequiseIngredient - $quantiteRequiseAvantIngredient);
                        $marchandiseIngredient->quantite_en_stock =  $marchandiseIngredient ->quantite_en_stock + ($quantiteRequiseIngredient - $quantiteRequiseAvantIngredient);
                        $marchandiseIngredient->save();

                        $quantiteIngredientEnStockTotal =$marchandiseIngredient->quantite_en_stock ;
                        $quantiteIngredientConsomeeTotal = $marchandiseIngredient->quantite_consomee;

                    }else if(($marchandiseIngredient ->quantite_consomee == null) && ($quantiteRequiseIngredient - $quantiteRequiseAvantIngredient > 0) ){
                        $marchandiseIngredient->quantite_consomee = $quantiteRequiseIngredient - $quantiteRequiseAvantIngredient;

                        $marchandiseIngredient ->quantite_en_stock = $marchandiseIngredient ->quantite_en_stock - ($quantiteRequiseIngredient - $quantiteRequiseAvantIngredient);
                        $marchandiseIngredient->save();

                        $quantiteIngredientEnStockTotal =$marchandiseIngredient->quantite_en_stock ;
                        $quantiteIngredientConsomeeTotal = $marchandiseIngredient->quantite_consomee;

                    }else if(($marchandiseIngredient ->quantite_consomee !== null) && ($quantiteRequiseIngredient - $quantiteRequiseAvantIngredient < 0) ){

                    $marchandiseIngredient->quantite_consomee = -($quantiteRequiseIngredient - $quantiteRequiseAvantIngredient);
                    $marchandiseIngredient->quantite_en_stock  = $marchandiseIngredient ->quantite_en_stock - ($quantiteRequiseIngredient - $quantiteRequiseAvantIngredient);
                    $marchandiseIngredient->save();
                    $quantiteIngredientConsomeeTotal = $marchandiseIngredient->quantite_consomee;
                    $quantiteIngredientEnStockTotal = $marchandiseIngredient->quantite_en_stock;

                }else if(($marchandiseIngredient ->quantite_consomee !== null) && ($quantiteRequiseIngredient - $quantiteRequiseAvantIngredient > 0) ){
                    $marchandiseIngredient->quantite_consomee = $quantiteRequiseIngredient - $quantiteRequiseAvantIngredient;
                    $marchandiseIngredient->quantite_en_stock  = $marchandiseIngredient ->quantite_en_stock - ($quantiteRequiseIngredient - $quantiteRequiseAvantIngredient);
                    $marchandiseIngredient->save();
                    $quantiteIngredientConsomeeTotal = $marchandiseIngredient->quantite_consomee;
                    $quantiteIngredientEnStockTotal = $marchandiseIngredient->quantite_en_stock;

                }else {
                    $marchandiseIngredient->quantite_en_stock  = $marchandiseIngredient ->quantite_en_stock + ($quantiteRequiseIngredient - $quantiteRequiseAvantIngredient);
                    $marchandiseIngredient->save();
                    $quantiteIngredientEnStockTotal = $marchandiseIngredient->quantite_en_stock;



                }







                foreach ($packagings as $packaging) {
                    $marchandisePackaging = Marchandise::where('id_packaging', $packaging->id)->latest()->first();
                    $quantiteRequisePackaging = $packaging->pivot->nombre_package * $quantiteDemandee;
                    $quantiteRequiseAvanatPackaging = $packaging->pivot->nombre_package * $quantiteAvant;


                    if(($marchandisePackaging ->quantite_consomee == null) && ($quantiteRequisePackaging - $quantiteRequiseAvanatPackaging < 0)){

                        $marchandisePackaging->quantite_consomee = -($quantiteRequisePackaging - $quantiteRequiseAvanatPackaging);
                        $marchandisePackaging->quantite_en_stock =  $marchandisePackaging ->quantite_en_stock + ($quantiteRequisePackaging - $quantiteRequiseAvanatPackaging);
                        $marchandisePackaging->save();

                        $quantitePackagingEnStockTotal = $marchandisePackaging ->quantite_en_stock ;

                        $quantitePackagingConsomeeTotal = $marchandisePackaging->quantite_consomee;

                    }else if(($marchandisePackaging ->quantite_consomee == null) && ($quantiteRequisePackaging - $quantiteRequiseAvanatPackaging > 0) ){
                        $marchandisePackaging->quantite_consomee = $quantiteRequisePackaging - $quantiteRequiseAvanatPackaging;
                        $marchandisePackaging ->quantite_en_stock = $marchandisePackaging ->quantite_en_stock - ($quantiteRequisePackaging - $quantiteRequiseAvanatPackaging);
                        $marchandisePackaging->save();
                        $quantitePackagingEnStockTotal = $marchandisePackaging ->quantite_en_stock ;
                        $quantitePackagingConsomeeTotal = $marchandisePackaging->quantite_consomee;





                    }elseif(($marchandisePackaging ->quantite_consomee !== null) && ($quantiteRequisePackaging - $quantiteRequiseAvanatPackaging < 0) ){
                        $marchandisePackaging->quantite_consomee = -($quantiteRequisePackaging - $quantiteRequiseAvanatPackaging);
                        $marchandisePackaging->quantite_en_stock  = $marchandisePackaging ->quantite_en_stock - ($quantiteRequisePackaging - $quantiteRequiseAvanatPackaging);
                        $marchandisePackaging->save();
                        $quantitePackagingEnStockTotal = $marchandisePackaging ->quantite_en_stock ;
                        $quantitePackagingConsomeeTotal = $marchandisePackaging->quantite_consomee;

                    }else if(($marchandisePackaging ->quantite_consomee !== null) && ($quantiteRequisePackaging - $quantiteRequiseAvanatPackaging > 0) ){
                        $marchandisePackaging->quantite_consomee = $quantiteRequisePackaging - $quantiteRequiseAvanatPackaging;
                        $marchandisePackaging->quantite_en_stock  = $marchandisePackaging ->quantite_en_stock - ($quantiteRequisePackaging - $quantiteRequiseAvanatPackaging);
                        $marchandisePackaging->save();
                        $quantitePackagingConsomeeTotal = $marchandisePackaging->quantite_consomee;
                        $quantitePackagingEnStockTotal = $marchandisePackaging->quantite_en_stock;


                    }else {
                        $marchandisePackaging->quantite_en_stock  = $marchandisePackaging ->quantite_en_stock + ($quantiteRequisePackaging - $quantiteRequiseAvanatPackaging);
                        $marchandisePackaging->save();
                        $quantitePackagingEnStockTotal = $marchandisePackaging->quantite_en_stock;



                    }

                }
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
