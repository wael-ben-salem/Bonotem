<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('packaging_produit', function (Blueprint $table) {
                $table->id();
                $table->unsignedBigInteger('id_produit');
                $table->unsignedBigInteger('id_packaging');
                $table->integer('id_creator')->nullable();
                $table->integer('id_creator')->nullable();

                $table->integer('nombre_package');


                $table->timestamps();
            });

            // Ajouter les clés étrangères après la création de la table
            Schema::table('packaging_produit', function (Blueprint $table) {
                $table->foreign('id_produit')->references('id')->on('produits')->onDelete('cascade');
                $table->foreign('id_packaging')->references('id')->on('packagings')->onDelete('cascade');
            });

    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {

        Schema::table('packaging_produit', function (Blueprint $table) {
            $table->dropForeign(['id_produit']);
            $table->dropForeign(['id_packaging']);
        });


        Schema::dropIfExists('packaging_produit');
    }
};
