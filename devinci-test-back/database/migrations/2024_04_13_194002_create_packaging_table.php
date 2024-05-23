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
            $table->string('name_packaging'); // Add unique constraint
            $table->string('dimension')->default('');
            $table->string('photo')->nullable();
            $table->integer('id_creator')->nullable();

            // Add other columns as needed
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('packagings');
    }
};
