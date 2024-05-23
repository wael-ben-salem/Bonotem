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
        Schema::create('marchandises', function (Blueprint $table) {
            $table->id();
            $table->string('nom');
            $table->string('reference');
            $table->unsignedBigInteger('id_fournisseur')->nullable();
            $table->unsignedBigInteger('id_ingredient')->nullable();
            $table->unsignedBigInteger('id_packaging')->nullable();
            $table->unsignedBigInteger('unite_id')->nullable();

            $table->integer('quantite_achetee');
            $table->integer('quantite_en_stock')->nullable();
            $table->integer('quantite_consomee')->nullable();
            $table->integer('id_creator')->nullable();


            $table->float('prix');
            $table->date('date_achat');
            $table->timestamps();
            $table->foreign('unite_id')->references('id')->on('unites')->onDelete('set null');

            $table->foreign('id_fournisseur')->references('id')->on('fournisseurs')->onDelete('set null');
            $table->foreign('id_ingredient')->references('id')->on('ingredients')->onDelete('set null');
            $table->foreign('id_packaging')->references('id')->on('packagings')->onDelete('set null');

        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('marchandises');
    }
};
