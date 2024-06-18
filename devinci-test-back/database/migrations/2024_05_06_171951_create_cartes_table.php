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
        Schema::create('cartes', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('id_produit')->nullable();
            $table->unsignedBigInteger('id_ingredient_compose')->nullable();

            $table->foreign('id_produit')->references('id')->on('produits')->onDelete('cascade');
            $table->unsignedBigInteger('id_categorie');
            $table->integer('id_creator')->nullable();
            $table->foreign('id_ingredient_compose')->references('id')->on('ingredient_composes')->onDelete('cascade');

            $table->float('prix');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('cartes');
    }
};
