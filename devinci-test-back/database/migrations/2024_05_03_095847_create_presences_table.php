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
        Schema::create('presences', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('planning_id');
            $table->time('heure_debut_reelle');
            $table->time('heure_fin_reelle');
            $table->date('date');
            $table->decimal('taux_horaire_reelle');
            $table->foreign('planning_id')->references('id')->on('plannings');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('presences', function (Blueprint $table) {
            Schema::dropIfExists('presences');
        });
    }
};
