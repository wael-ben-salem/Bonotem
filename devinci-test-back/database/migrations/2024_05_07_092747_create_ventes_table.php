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
        Schema::create('ventes', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('id_produit')->nullable();
            $table->unsignedBigInteger('id_carte');
            $table->unsignedBigInteger('id_ingredient_compose')->nullable();

            $table->integer('id_creator')->nullable();


            $table->foreign('id_ingredient_compose')->references('id')->on('ingredient_composes')->onDelete('cascade');

            $table->foreign('id_carte')->references('id')->on('cartes')->onDelete('cascade');
            $table->unsignedBigInteger('id_categorie');
            $table->integer('quantite');
            $table->float('prixTTc');
            $table->float('prixTVA');
            $table->float('marge');

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('ventes');
    }
};
