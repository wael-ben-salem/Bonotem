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
            $table->unsignedBigInteger('id_produit');
            $table->unsignedBigInteger('id_carte');

            $table->foreign('id_carte')->references('id')->on('cartes')->onDelete('cascade');
            $table->unsignedBigInteger('id_categorie');
            $table->integer('quantite');
            $table->float('prixTTc');
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
