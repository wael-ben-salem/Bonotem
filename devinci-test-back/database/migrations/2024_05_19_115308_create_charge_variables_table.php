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
        Schema::create('charge_variables', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('id_creator');
            $table->date('date');
            $table->decimal('chiffre', 15, 2);
            $table->string('nom');

            $table->timestamps();
        });

    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('charge_variables');
    }
};
