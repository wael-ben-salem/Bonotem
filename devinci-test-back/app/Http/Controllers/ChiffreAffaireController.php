<?php

namespace App\Http\Controllers;

use App\Models\ChargeFixe;
use App\Models\ChargeVariable;
use App\Models\Cout;
use App\Models\Marchandise;
use App\Models\Personnel;
use App\Models\Perte;
use App\Models\Ventes;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class ChiffreAffaireController extends Controller
{
    public function getChiffreAffaireEtBeneficeParCreator($id)
    {

        $totalchargefix = ChargeFixe::where('id_creator', $id)->sum('montant');


        $totalSalairePersonnel = Personnel::where('id_creator', $id)->sum('salaire');


        $totalchargefix += $totalSalairePersonnel;


        $currentMonth = date('m');
        $currentYear = date('Y');
        $dateStart = "$currentYear-$currentMonth-01";
        $dateEnd = date('Y-m-t', strtotime($dateStart));


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

        // Calcul de la somme des charges variables (y compris les pertes, coûts et marchandises)
        $totalchargevariable = ChargeVariable::where('id_creator', $id)->sum('chiffre');
        $totalchargevariable += $totalMarchandise + $totalPerte + $totalCout;

        // Calcul de la somme des ventes pour l'id_creator donné
        $chiffreTotal = Ventes::where('id_creator', $id)->sum('prixTTC');

        // Calcul du bénéfice
        $montantTotal = $totalchargefix + $totalchargevariable;
        $benefice = $chiffreTotal - $montantTotal;

        // Date de début et de fin (vous pouvez ajuster cette logique en fonction de vos besoins)
        $dateDebut = now()->startOfMonth();
        $dateFin = now()->endOfMonth();

        // Retourner les informations sous forme de réponse JSON
        return response()->json([
            'montant_total' => $montantTotal,
            'chiffre_total' => $chiffreTotal,
            'benefice' => $benefice,
            'totalchargefix' => $totalchargefix,
            'totalchargevariable' => $totalchargevariable,
            'date_debut' => $dateDebut,
            'date_fin' => $dateFin,
        ]);
    }

}
