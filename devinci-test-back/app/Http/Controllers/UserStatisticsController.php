<?php

namespace App\Http\Controllers;

use App\Models\User\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class UserStatisticsController extends Controller
{

        public function getUserStatistics()
        {
            // Nombre total de restaurateurs
            $totalRestaurateurs = User::where('role_id', 1)->count();

            // Nombre total de managers
            $totalManagers = User::where('role_id', 3)->count();

            // Montant total des managers
            $totalAmountManagers = User::where('role_id', 3)->sum('montant');

            // Identifiant du meilleur manager (celui avec le plus d'utilisateurs créés)
            $bestManagerId = User::where('role_id', 3)->withCount('createdUsers')->orderByDesc('created_users_count')->value('id');

            // Nom du meilleur manager
            $bestManagerName = User::find($bestManagerId)->name;

            // Nombre d'utilisateurs créés par le meilleur manager
            $numUsersByBestManager = User::find($bestManagerId)->createdUsers()->count();

     // Récupérer tous les utilisateurs avec leurs jetons
    $users = User::whereHas('role', function ($query) {
            $query->whereIn('id', [1, 3]);
        })
        ->with('tokens')
        ->get();
     // Initialiser un tableau pour stocker les statistiques des utilisateurs
     $userStatistics = [];

     // Boucler à travers les utilisateurs pour collecter les statistiques
    foreach ($users as $user) {
        $userData = [
            'name' => $user->name,
            'num_logins' => $user->tokens->count(),
            'logins_per_date' => [] // Ajout d'un tableau pour les connexions par date
        ];

        // Initialiser un tableau pour compter les connexions par date
        $loginCountPerDate = [];

        // Compter les connexions par date
        foreach ($user->tokens as $token) {
            $date = $token->created_at->toDateString(); // Obtenir la date sous forme de chaîne (YYYY-MM-DD)

            // Incrémenter le compteur de connexion pour cette date
            if (array_key_exists($date, $loginCountPerDate)) {
                $loginCountPerDate[$date]++;
            } else {
                $loginCountPerDate[$date] = 1;
            }
        }

        // Ajouter le nombre de connexions par date au tableau des statistiques de l'utilisateur
        foreach ($loginCountPerDate as $date => $count) {
            $userData['logins_per_date'][] = [
                'date' => $date,
                'count' => $count
            ];
        }

        // Ajouter les statistiques de l'utilisateur au tableau
        $userStatistics[] = $userData;

     }

            return response()->json([
                'status' => 200,
                'total_restaurateurs' => $totalRestaurateurs,
                'total_managers' => $totalManagers,
                'total_amount_managers' => $totalAmountManagers,
                'best_manager_name' => $bestManagerName, // Nom du meilleur manager
                'num_users_by_best_manager' => $numUsersByBestManager,
                'user_statistics' => $userStatistics,


            ]);
        }
    }

