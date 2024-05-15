    <?php

    use Illuminate\Database\Migrations\Migration;
    use Illuminate\Database\Schema\Blueprint;
    use Illuminate\Support\Facades\Schema;

    return new class extends Migration
    {
        public function up(): void
    {
        Schema::create('roles', function (Blueprint $table) {
            $table->id();
            $table->string('name_role');
            $table->timestamps();
        });

        Schema::table('users', function (Blueprint $table) {
            $table->unsignedBigInteger('role_id')->nullable();
            $table->foreign('role_id')->references('id')->on('roles')->onDelete('cascade');
        });

        DB::table('roles')->insert([
            ['id' => 1, 'name_role' => 'restaurateur'],
            ['id' => 2, 'name_role' => 'admin'],
            ['id' => 3, 'name_role' => 'manager'],
        ]);

        $passwordAdmin = Hash::make('adminadmin'); // Mot de passe pour l'administrateur
        $passwordTest = Hash::make('testtest'); // Mot de passe pour le test

        // Insertion du compte administrateur
        DB::table('users')->insert([
            'name' => 'admin',
            'email' => 'admin@admin.com',
            'password' => $passwordAdmin,
            'role_id' => 2, // ID du rôle administrateur
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        // Insertion du compte test
        DB::table('users')->insert([
            'name' => 'test',
            'email' => 'test@test.com',
            'password' => $passwordTest,
            'role_id' => 1, // ID du rôle restaurateur
            'created_at' => now(),
            'updated_at' => now(),
        ]);
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropForeign(['role_id']);
            $table->dropColumn('role_id');
        });

        Schema::dropIfExists('roles');
    }
};
