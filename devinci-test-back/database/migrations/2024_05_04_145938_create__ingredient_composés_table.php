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
        Schema::create('ingredient_composes', function (Blueprint $table) {
            $table->id();
              $table->string('name_ingredient_compose')->nullable();
              $table->string('photo')->nullable();

              $table->timestamps();

          });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('ingredient_composes');

    }
};
