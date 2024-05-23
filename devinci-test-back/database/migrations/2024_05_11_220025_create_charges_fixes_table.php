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
        Schema::create('charges_fixes', function (Blueprint $table) {
            $table->id();
            $table->string('nom');
            $table->decimal('montant', 15, 2);
            $table->enum('frequence', ['journalière', 'hebdomadaire', 'mensuelle', 'annuelle']);
            $table->date('date_paiement');
            $table->integer('id_creator')->nullable();

            $table->unsignedBigInteger('personnel_id')->nullable();
            $table->foreign('personnel_id')->references('id')->on('personnels');
            $table->timestamps();

        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('charges_fixes');
    }
};
