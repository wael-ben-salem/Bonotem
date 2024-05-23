{
                $carte = Cartes::findOrFail($request->id_carte);
                $quantiteDemandee = $request->quantite;
                if ($carte->ingredient_compose) {
                    $ingredientsCompose = $carte->ingredient_compose->ingredients;
                    // Your existing foreach loop and logic here...
                    if ($ingredientsCompose->isNotEmpty()) {
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



                }
