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
        Schema::create('users', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('email')->unique();
            $table->timestamp('email_verified_at')->nullable();
            $table->string('password');
            $table->integer('id_creator')->nullable();
            $table->dateTime('date_abonnement')->nullable(); // Changer le type de colonne en dateTime
            $table->dateTime('date_expiration_abonnement')->nullable(); // Ajouter la date d'expiration
            $table->decimal('montant', 8, 2)->default(0); // Montant avec deux décimales

            $table->string('photo')->nullable();

            $table->rememberToken();
            $table->timestamps();
            $table->enum('statut', ['activé', 'désactivé'])->default('activé');
            $table->string('adresse')->default('');
            $table->bigInteger('numero')->nullable(); // Supprimer la longueur et changer la valeur par défaut à NULL
        });
    }
    public function down(): void
    {
        Schema::dropIfExists('users');

    }
};
