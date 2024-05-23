<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up()
    {
        Schema::create('unites', function (Blueprint $table) {
            $table->id();
            $table->string('name_unite');
            $table->timestamps();
        });

        // Insertion des données directement après la création de la table
        DB::table('unites')->insert([
            ['name_unite' => 'Kilogramme'],
            ['name_unite' => 'Litre'],
            ['name_unite' => 'Mètre'],
            ['name_unite' => 'Centimètre'],
            ['name_unite' => 'Milligramme'],
            ['name_unite' => 'Millilitre'],
            // Ajoutez toutes les autres unités que vous souhaitez insérer
        ]);
    }

    /**
     * Reverse the migrations.
     */
    public function down()
    {
        Schema::dropIfExists('unites');
    }
};
