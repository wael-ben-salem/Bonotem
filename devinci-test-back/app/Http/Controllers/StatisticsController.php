<?php

namespace App\Http\Controllers;

use App\Models\Cartes;
use App\Models\Cout;
use App\Models\Marchandise;
use App\Models\Perte;
use App\Models\User\User;
use App\Models\Ventes;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class StatisticsController extends Controller
{

    // public function UserStatistics($id)
    // {
    //     // Total des achats et des ventes pour un créateur spécifique
    //     $totalAchat = Ventes::where('id_creator', $id)->sum('prixTTc');
    //     $totalVentes = Ventes::where('id_creator', $id)->sum('quantite');

    //     // Ventes pour ce créateur
    //     $ventes = Ventes::with('produit', 'ingredient_composee')
    //         ->where('id_creator', $id)
    //         ->get();

    //     // Informations détaillées sur chaque vente
    //     $ventesDetails = [];
    //     foreach ($ventes as $vente) {
    //         $venteDetails = [
    //             'nom' => $vente->produit ? $vente->produit->name_produit : ($vente->ingredient_composee ? $vente->ingredient_composee->name_ingredient_compose : ''),
    //             'quantite' => $vente->quantite,
    //             'prixTTc' => $vente->prixTTc
    //         ];
    //         $ventesDetails[] = $venteDetails;
    //     }

    //     // Calcul des quantités vendues pour chaque produit et ingrédient composé
    // $produitQuantites = [];
    // $ingredientQuantites = [];

    // foreach ($ventes as $vente) {
    //     if ($vente->produit) {
    //         if (!isset($produitQuantites[$vente->produit->name_produit])) {
    //             $produitQuantites[$vente->produit->name_produit] = $vente->quantite;
    //         } else {
    //             $produitQuantites[$vente->produit->name_produit] += $vente->quantite;
    //         }
    //     }
    //     if ($vente->ingredient_composee) {
    //         if (!isset($ingredientQuantites[$vente->ingredient_composee->name_ingredient_compose])) {
    //             $ingredientQuantites[$vente->ingredient_composee->name_ingredient_compose] = $vente->quantite;
    //         } else {
    //             $ingredientQuantites[$vente->ingredient_composee->name_ingredient_compose] += $vente->quantite;
    //         }
    //     }
    // }

    // // Trouver le meilleur produit et ingrédient composé en termes de quantité vendue
    // $meilleurProduit = null;
    // $maxProduitQuantite = 0;
    // foreach ($produitQuantites as $produit => $quantite) {
    //     if ($quantite > $maxProduitQuantite) {
    //         $meilleurProduit = $produit;
    //         $maxProduitQuantite = $quantite;
    //     }
    // }

    // $meilleurIngredient = null;
    // $maxIngredientQuantite = 0;
    // foreach ($ingredientQuantites as $ingredient => $quantite) {
    //     if ($quantite > $maxIngredientQuantite) {
    //         $meilleurIngredient = $ingredient;
    //         $maxIngredientQuantite = $quantite;
    //     }
    // }

    //     return response()->json([
    //         'status' => 200,
    //         'total_achats' => $totalAchat,
    //         'total_ventes' => $totalVentes,
    //         'ventes_details' => $ventesDetails,
    //         'produit' => [
    //             'meilleur_produit' => $meilleurProduit,
    //             'quantite' => $maxProduitQuantite,
    //         ],
    //         'ingredientCompose' => [
    //             'meilleur_ingredient_compose' => $meilleurIngredient,
    //             'quantite' => $maxIngredientQuantite,
    //         ],
    //     ]);

    // }

//     public function UserStatistics($id)
// {
//     $totalPerte = Perte::where('id_creator', $id)->sum('montant');
//     $totalCout = Cout::where('id_creator', $id)->sum('montant');
//     $totalMarchandise = Marchandise::where('id_creator', $id)->sum('prix');

//     $totalAchat = Ventes::where('id_creator', $id)->sum('prixTTc');
//     $totalVentes = Ventes::where('id_creator', $id)->sum('quantite');

//     // Ventes pour ce créateur
//     $ventes = Ventes::with('produit', 'ingredient_composee')
//         ->where('id_creator', $id)
//         ->get();

//     // Informations détaillées sur chaque vente
//     $ventesDetails = [];

//     // Tableau associatif pour stocker les données agrégées
//     $aggregatedData = [];

//     foreach ($ventes as $vente) {
//         $nom = $vente->produit ? $vente->produit->name_produit : ($vente->ingredient_composee ? $vente->ingredient_composee->name_ingredient_compose : '');

//         if (!isset($aggregatedData[$nom])) {
//             $aggregatedData[$nom] = [
//                 'quantite' => $vente->quantite,
//                 'prixTTc' => $vente->prixTTc,
//                 'date'=> $vente->created_at
//              ];
//         } else {
//             $aggregatedData[$nom]['quantite'] += $vente->quantite;
//             $aggregatedData[$nom]['prixTTc'] += $vente->prixTTc;
//         }
//     }

//     // Convertir les données agrégées en format souhaité
//     foreach ($aggregatedData as $nom => $data) {
//         $ventesDetails[] = [
//             'nom' => $nom,
//             'quantite' => $data['quantite'],
//             'prixTTc' => $data['prixTTc'],
//             'date' => $data['date']


//         ];
//     }

//     // Calcul des quantités vendues pour chaque produit et ingrédient composé
//     $produitQuantites = [];
//     $ingredientQuantites = [];

//     foreach ($ventes as $vente) {
//         if ($vente->produit) {
//             if (!isset($produitQuantites[$vente->produit->name_produit])) {
//                 $produitQuantites[$vente->produit->name_produit] = $vente->quantite;
//             } else {
//                 $produitQuantites[$vente->produit->name_produit] += $vente->quantite;
//             }
//         }
//         if ($vente->ingredient_composee) {
//             if (!isset($ingredientQuantites[$vente->ingredient_composee->name_ingredient_compose])) {
//                 $ingredientQuantites[$vente->ingredient_composee->name_ingredient_compose] = $vente->quantite;
//             } else {
//                 $ingredientQuantites[$vente->ingredient_composee->name_ingredient_compose] += $vente->quantite;
//             }
//         }
//     }

//     // Trouver le meilleur produit et ingrédient composé en termes de quantité vendue
//     $meilleurProduit = null;
//     $maxProduitQuantite = 0;
//     foreach ($produitQuantites as $produit => $quantite) {
//         if ($quantite > $maxProduitQuantite) {
//             $meilleurProduit = $produit;
//             $maxProduitQuantite = $quantite;
//             $maxProduitPrix = $aggregatedData[$produit]['prixTTc'];


//         }
//     }

//     $meilleurIngredient = null;
//     $maxIngredientQuantite = 0;
//     foreach ($ingredientQuantites as $ingredient => $quantite) {
//         if ($quantite > $maxIngredientQuantite) {
//             $meilleurIngredient = $ingredient;
//             $maxIngredientQuantite = $quantite;
//             if (isset($aggregatedData[$ingredient]['prixTTc'])) {
//                 $maxIngredientPrix = $aggregatedData[$ingredient]['prixTTc'];
//             }else {
//                 // Définissez une valeur par défaut pour $maxIngredientPrix si elle n'est pas définie dans $aggregatedData
//                 $maxIngredientPrix = 0;
//             }

//         }
//     }
//     // Comparer entre le meilleur produit et le meilleur ingrédient composé
// if ($maxProduitQuantite > $maxIngredientQuantite) {
//     $meilleurVenteIngProduit = $meilleurProduit;
//     $meilleurtQuantiteIngProduit = $maxProduitQuantite;
//     $meilleurtPrixIngProduit = $maxProduitPrix;


// } else {
//     $meilleurVenteIngProduit = $meilleurIngredient;
//     $meilleurtQuantiteIngProduit = $maxIngredientQuantite;
//     $meilleurtPrixIngProduit = $maxIngredientPrix;


// }

// return response()->json([
//     'status' => 200,
//     'total_achats' => $totalAchat,
//     'total_perte' => $totalPerte,
//     'total_cout' => $totalCout,
//     'total_marchandise' => $totalMarchandise,


//     'total_ventes' => $totalVentes,
//     'ventes_details' => $ventesDetails,
//     'produit' => [
//         'meilleur_produit' => $meilleurProduit,
//         'quantite' => $maxProduitQuantite,
//         'maxProduitPrix' =>$maxProduitPrix
//     ],
//     'ingredientCompose' => [
//         'meilleur_ingredient_compose' => $meilleurIngredient,
//         'quantite' => $maxIngredientQuantite,
//         'maxIngredientPrix' =>$maxIngredientPrix


//     ],
//         'meilleur_nom' => $meilleurVenteIngProduit,
//         'meilleur_quantite' => $meilleurtQuantiteIngProduit,
//         'meilleur_prixTtc' => $meilleurtPrixIngProduit,


// ]);


// }
public function UserStatistics($id)
{
    // Calculate current month totals
    $currentMonth = date('m');
    $currentYear = date('Y');
    $dateStart = "$currentYear-$currentMonth-01";
    $dateEnd = date('Y-m-t', strtotime($dateStart));

    // Calculating the total for the current month for Marchandise, Perte, and Cout
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

    $totalAchat = Ventes::where('id_creator', $id)->sum('prixTTc');
    $totalVentes = Ventes::where('id_creator', $id)->sum('quantite');

    // Ventes for this creator
    $ventes = Ventes::with('produit', 'ingredient_composee')
        ->where('id_creator', $id)
        ->get();

    // Detailed information about each sale
    $ventesDetails = [];

    // Associative array to store aggregated data
    $aggregatedData = [];

    foreach ($ventes as $vente) {
        $nom = $vente->produit ? $vente->produit->name_produit : ($vente->ingredient_composee ? $vente->ingredient_composee->name_ingredient_compose : '');
        $date = $vente->created_at->format('Y-m-d');

        if (!isset($aggregatedData[$nom][$date])) {
            $aggregatedData[$nom][$date] = [
                'quantite' => $vente->quantite,
                'prixTTc' => $vente->prixTTc,
                'date' => $vente->created_at
            ];
        } else {
            $aggregatedData[$nom][$date]['quantite'] += $vente->quantite;
            $aggregatedData[$nom][$date]['prixTTc'] += $vente->prixTTc;
        }
    }

    // Convert aggregated data into desired format
    foreach ($aggregatedData as $nom => $dates) {
        foreach ($dates as $date => $data) {
            $ventesDetails[] = [
                'nom' => $nom,
                'quantite' => $data['quantite'],
                'prixTTc' => $data['prixTTc'],
                'date' => $data['date']
            ];
        }
    }

    // Calculate sold quantities for each product and composed ingredient
    $produitQuantites = [];
    $ingredientQuantites = [];

    foreach ($ventes as $vente) {
        if ($vente->produit) {
            if (!isset($produitQuantites[$vente->produit->name_produit])) {
                $produitQuantites[$vente->produit->name_produit] = $vente->quantite;
            } else {
                $produitQuantites[$vente->produit->name_produit] += $vente->quantite;
            }
        }
        if ($vente->ingredient_composee) {
            if (!isset($ingredientQuantites[$vente->ingredient_composee->name_ingredient_compose])) {
                $ingredientQuantites[$vente->ingredient_composee->name_ingredient_compose] = $vente->quantite;
            } else {
                $ingredientQuantites[$vente->ingredient_composee->name_ingredient_compose] += $vente->quantite;
            }
        }
    }


    // Find the best-selling product in terms of quantity sold
    $meilleurProduit = null;
    $maxProduitQuantite = 0;
    $maxProduitPrix = 0;
    foreach ($produitQuantites as $produit => $quantite) {
        if ($quantite > $maxProduitQuantite) {
            $meilleurProduit = $produit;
            $maxProduitQuantite = $quantite;
            if (isset($aggregatedData[$produit]['prixTTc'])) {
                $maxProduitPrix = $aggregatedData[$produit]['prixTTc'];
            }
        }
    }

    // Find the best-selling composed ingredient in terms of quantity sold
    $meilleurIngredient = null;
    $maxIngredientQuantite = 0;
    $maxIngredientPrix = 0;
    foreach ($ingredientQuantites as $ingredient => $quantite) {
        if ($quantite > $maxIngredientQuantite) {
            $meilleurIngredient = $ingredient;
            $maxIngredientQuantite = $quantite;
            if (isset($aggregatedData[$ingredient]['prixTTc'])) {
                $maxIngredientPrix = $aggregatedData[$ingredient]['prixTTc'];
            }
        }
    }

    // Compare the best product and best composed ingredient
    if ($maxProduitQuantite > $maxIngredientQuantite) {
        $meilleurVenteIngProduit = $meilleurProduit;
        $meilleurtQuantiteIngProduit = $maxProduitQuantite;
        $meilleurtPrixIngProduit = $maxProduitPrix;
    } else {
        $meilleurVenteIngProduit = $meilleurIngredient;
        $meilleurtQuantiteIngProduit = $maxIngredientQuantite;
        $meilleurtPrixIngProduit = $maxIngredientPrix;
    }

    return response()->json([
        'status' => 200,
        'total_achats' => $totalAchat,
        'total_perte' => $totalPerte,
        'total_cout' => $totalCout,
        'total_marchandise' => $totalMarchandise,
        'total_ventes' => $totalVentes,
        'ventes_details' => $ventesDetails,
        'produit' => [
            'meilleur_produit' => $meilleurProduit,
            'quantite' => $maxProduitQuantite,
            'maxProduitPrix' => $maxProduitPrix
        ],
        'ingredientCompose' => [
            'meilleur_ingredient_compose' => $meilleurIngredient,
            'quantite' => $maxIngredientQuantite,
            'maxIngredientPrix' => $maxIngredientPrix
        ],
        'meilleur_nom' => $meilleurVenteIngProduit,
        'meilleur_quantite' => $meilleurtQuantiteIngProduit,
        'meilleur_prixTtc' => $meilleurtPrixIngProduit
    ]);
}
 

public function CarteStatistics($id)
{


    // Ventes pour ce créateur
    $cartes = Cartes::with('produit', 'ingredient_compose','categorie')
        ->where('id_creator', $id)
        ->get();

    // Informations détaillées sur chaque vente
    $cartesDetails = [];

    // Tableau associatif pour stocker les données agrégées
    $aggregatedData = [];

    foreach ($cartes as $carte) {
        $nom = $carte->produit ? $carte->produit->name_produit : ($carte->ingredient_compose ? $carte->ingredient_compose->name_ingredient_compose : '');

        if (!isset($aggregatedData[$nom])) {
            $aggregatedData[$nom] = [
                'prixTTc' => $carte->prix*1.18,
                'photo'=> $carte->categorie->photo
             ];
        }



    }
    // Convertir les données agrégées en format souhaité
    foreach ($aggregatedData as $nom => $data) {
        $cartesDetails[] = [
            'nom' => $nom,
            'prixTTc' => $data['prixTTc'],
            'photo' => $data['photo']


        ];
    }


    return response()->json([
        'status' => 200,
        'cartes_details' => $cartesDetails,

    ]);

}




}



