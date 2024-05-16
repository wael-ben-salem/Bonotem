<?php

namespace App\Http\Controllers;

use App\Models\User\User;
use App\Models\Ventes;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class StatisticsController extends Controller
{

        public function UserStatistics()
        {
            // Nombre total de restaurateurs
            $totalAchat = Ventes::sum('prixTTc');
            $totalVentes = Ventes::sum('quantite');

            // Nombre total de managers
              // Meilleur produit (celui avec la quantité maximale vendue)
              $meilleurProduit = Ventes::select('produits.name_produit')
              ->join('produits', 'ventes.id_produit', '=', 'produits.id')
              ->groupBy('produits.name_produit')
              ->orderByRaw('SUM(ventes.quantite) DESC')
              ->first();

            return response()->json([
                'status' => 200,
                'totales achats' => $totalAchat,
                'total ventes' => $totalVentes,
                'meilleur_produit' => $meilleurProduit->name_produit,


            ]);

     }


        }



