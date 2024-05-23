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
        Schema::create('couts', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('id_depense')->nullable();
            $table->unsignedBigInteger('id_ventilation')->nullable();
            $table->string('detail');
            $table->integer('id_creator')->nullable();

            $table->decimal('montant', 8, 2)->default(0); // Montant avec deux décimales
            $table->dateTime('date')->nullable(); // Changer le type de colonne en dateTime
            $table->enum('type', ['depense', 'ventilation']); // Ajout du champ type avec les valeurs possibles 'depense' ou 'ventilation'

            $table->foreign('id_depense')->references('id')->on('depenses')->onDelete('set null');
            $table->foreign('id_ventilation')->references('id')->on('ventilations')->onDelete('set null');

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('couts');
    }
};
