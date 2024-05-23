<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{

    public function up(): void
    {
        Schema::create('type_personnels', function (Blueprint $table) {

                $table->id();
                $table->string('nom');
                $table->decimal('prix_heure', 8, 2);
                $table->integer('id_creator')->nullable();

                $table->timestamps();

        });
    }


    public function down(): void
    {
        Schema::dropIfExists('type_personnels');
    }
};
