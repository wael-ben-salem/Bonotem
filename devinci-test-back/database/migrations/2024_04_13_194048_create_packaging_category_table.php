<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('packaging_categories', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('id_packaging');
            // Add other columns as needed
            $table->timestamps();

            $table->foreign('id_packaging')->references('id')->on('packagings')->onDelete('cascade');
        });
    }

    public function down()
    {
        Schema::dropIfExists('packaging_categories');
    }
};
