<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {

    public function up(): void
    {
        Schema::create('personnels', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('num_telephone')->nullable();
            $table->decimal('salaire', 8, 2);
            $table->unsignedBigInteger('type_personnel_id');
            $table->integer('id_creator')->nullable();

            $table->foreign('type_personnel_id')->references('id')->on('type_personnels')->onDelete('cascade');
            $table->timestamps();
        });
    }


    public function down(): void
    {
        Schema::dropIfExists('personnels');
    }
};
