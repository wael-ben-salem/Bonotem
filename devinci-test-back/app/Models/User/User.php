<?php

namespace App\Models\User;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use App\Models\User\Role;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
        'statut',
        'role_id',
        'id_creator',
        'numero',
        'adresse',
        'date_abonnement',
        'photo',
        'montant',
        'date_expiration_abonnement'
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];





    public function getPhotoAttribute($photo){
        return $photo ? asset("/storage/users".$photo):null;
    }

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
        'password' => 'hashed',
        'date_abonnement' => 'datetime', // Convertir date_abonnement en objet DateTime

    ];
    public function role()
    {
        return $this->belongsTo(Role::class);
    }
    public function createdUsers()
{
    return $this->hasMany(User::class, 'id_creator');
}

}
