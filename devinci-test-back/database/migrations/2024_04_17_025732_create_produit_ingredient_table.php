<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
  /**
     * Run the migrations.
     */
    public function up()
    {
        // Créer la table produit_ingredient
        Schema::create('produit_ingredient', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('id_produit');
            $table->unsignedBigInteger('id_ingredient');
            $table->decimal('quantite', 8, 2);


            $table->timestamps();
        });

        // Ajouter les clés étrangères après la création de la table
        Schema::table('produit_ingredient', function (Blueprint $table) {
            $table->foreign('id_produit')->references('id')->on('produits')->onDelete('cascade');
            $table->foreign('id_ingredient')->references('id')->on('ingredients')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down()
    {
        // Supprimer les clés étrangères avant de supprimer la table
        Schema::table('produit_ingredient', function (Blueprint $table) {
            $table->dropForeign(['id_produit']);
            $table->dropForeign(['id_ingredient']);
        });

        // Supprimer la table produit_ingredient
        Schema::dropIfExists('produit_ingredient');
    }

};
