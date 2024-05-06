<?php

namespace App\Http\Controllers;

use App\Models\Cartes;
use App\Models\Produit;
use Illuminate\Http\Request;

class CartesController extends Controller
{
    public function store(Request $request)
    {
        $request->validate([
            'id_produit' => 'required|exists:produits,id',
            'prix' => 'required|numeric',
        ]);

        // Récupérer le produit associé à la carte
        $produit = Produit::findOrFail($request->id_produit);

        // Créer une nouvelle carte
        $carte = new Cartes();
        $carte->id_produit = $request->id_produit;
        $carte->id_categorie = $produit->id_categorie; // Récupérer l'ID de la catégorie du produit
        $carte->prix = $request->prix;
        $carte->save();

        return response()->json([
            'message' => "Ingredient successfully updated."
        ],200);    }


        public function cartes(Request $request)
        {
            // Eager load the products with each category
            $cartes = Cartes::with('produit','categorie')->get();

            return response()->json($cartes);
        }

        public function update(Request $request, $id)
        {
            // Valider les données de la requête
            $request->validate([
                'id_produit' => 'required|exists:produits,id',
                'prix' => 'required|numeric',
            ]);


                // Récupérer la carte à mettre à jour
                $carte = Cartes::findOrFail($id);
                $produit = Produit::findOrFail($request->id_produit);

                // Vérifier si le produit associé existe
                Produit::findOrFail($request->id_produit);

                // Mettre à jour les attributs de la carte
                $carte->id_produit = $request->id_produit;
                $carte->id_categorie = $produit->id_categorie; // Récupérer l'ID de la catégorie du produit

                $carte->prix = $request->prix;
                $carte->save();

                return response()->json([
                    'message' => "Carte successfully updated."
                ], 200);

        }
        public function show($id)
    {

            $carte = Cartes::with('produit')->findOrFail($id);

            return response()->json($carte);

    }

    public function destroy($id)
    {

            // Trouver la carte à supprimer
            $carte = Cartes::findOrFail($id);

            // Supprimer la carte
            $carte->delete();

            return response()->json(['message' => 'Carte successfully deleted.'], 200);

    }

}
