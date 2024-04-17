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
            $table->unsignedBigInteger('produit_id');
            $table->unsignedBigInteger('ingredient_id');
            $table->decimal('quantite', 8, 2);
            $table->unsignedBigInteger('unite_id')->nullable();
            $table->timestamps();
        });

        // Ajouter les clés étrangères après la création de la table
        Schema::table('produit_ingredient', function (Blueprint $table) {
            $table->foreign('produit_id')->references('id')->on('produits')->onDelete('cascade');
            $table->foreign('ingredient_id')->references('id_ingredient')->on('ingredients')->onDelete('cascade');
            $table->foreign('unite_id')->references('id')->on('unites')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down()
    {
        // Supprimer les clés étrangères avant de supprimer la table
        Schema::table('produit_ingredient', function (Blueprint $table) {
            $table->dropForeign(['produit_id']);
            $table->dropForeign(['ingredient_id']);
            $table->dropForeign(['unite_id']);
        });

        // Supprimer la table produit_ingredient
        Schema::dropIfExists('produit_ingredient');
    }

};
