<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('packagings', function (Blueprint $table) {
            $table->id();
            $table->string('name_packaging')->unique(); // Add unique constraint
            $table->integer('nombre_package')->default(0);
            $table->boolean('validate')->default(0);
            // Add other columns as needed
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('packagings');
    }
};
