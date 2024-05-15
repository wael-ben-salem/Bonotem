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
        Schema::create('pertes', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('id_marchandise');
            $table->unsignedBigInteger('id_packaging');
            $table->unsignedBigInteger('id_ingredient');

            $table->foreign('id_marchandise')->references('id')->on('marchandises')->onDelete('cascade');
            $table->integer('quantite');
            $table->float('montant');

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('pertes');
    }
};
