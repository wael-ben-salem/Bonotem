<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
return new class extends Migration
{
    public function up(): void
    {
        Schema::create('plannings', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('personnel_id');
            $table->unsignedBigInteger('jour_id');
            $table->time('heure_debut');
            $table->time('heure_fin');
            $table->decimal('taux_heure', 8, 2);
            $table->timestamps();
            $table->foreign('personnel_id')->references('id')->on('personnels')->onDelete('cascade');
            $table->foreign('jour_id')->references('id')->on('jours')->onDelete('cascade');
        });
    }


    public function down(): void {
        Schema::dropIfExists('plannings');
    }
};
