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
        Schema::create('ingredient_compose_ingredient', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('id_ingredient_compose');
            $table->unsignedBigInteger('id_ingredient');
            $table->decimal('quantite', 8, 2);
            $table->integer('id_creator')->nullable();



            $table->timestamps();
        });

        // Ajouter les clés étrangères après la création de la table
        Schema::table('ingredient_compose_ingredient', function (Blueprint $table) {
            $table->foreign('id_ingredient_compose')->references('id')->on('ingredient_composes')->onDelete('cascade');
            $table->foreign('id_ingredient')->references('id')->on('ingredients')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('ingredient_compose_ingredient', function (Blueprint $table) {
            $table->dropForeign(['id_ingredient_compose']);
            $table->dropForeign(['id_ingredient']);
        });

        Schema::dropIfExists('ingredient_compose_ingredient');
    }
};
