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
        Schema::create('categories', function (Blueprint $table) {
            $table->id();
            $table->string('name');

            $table->string('description')->nullable();
            $table->string('photo')->nullable();
            $table->timestamps();
        });
        Schema::table('produits', function (Blueprint $table) {
            $table->unsignedBigInteger('id_categorie')->nullable();
            $table->foreign('id_categorie')->references('id')->on('categories')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('produits', function (Blueprint $table) {
            $table->dropForeign(['id_categorie']);
            $table->dropColumn('id_categorie');
        });

        Schema::dropIfExists('categories');
    }
};
