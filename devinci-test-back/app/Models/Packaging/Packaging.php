<?php

namespace App\Models\Packaging;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use App\Models\Marchandise;
use App\Models\Packaging\PackagingCategory;
use App\Models\Perte;
use App\Models\Produit;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Notifiable;

class Packaging extends Model
{
    use  HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */

    // Define the table associated with the model
    protected $table = 'packagings';

    protected $morphClass = 'Packaging';



/**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    // Specify which attributes can be mass assigned
    protected $fillable = [
        'name_packaging',
        'dimension',
        'photo',
        'id_creator'

    ];

    public function getPhotoAttribute($photo){
        return $photo ? asset("/storage/packagings".$photo):null;
    }


    public function packagingCategory()
    {
        return $this->hasOne(PackagingCategory::class, 'id_packaging');
    }
    public function produits()
    {
        return $this->belongsToMany(Produit::class, 'packaging_produit', 'id_packaging','id_produit' )
                    ->withPivot('nombre_package','id_creator');
    }

    public function pertes()
    {
        return $this->hasMany(Perte::class, 'id_packaging');
    }


    public function marchandises()
    {
        return $this->hasMany(Marchandise::class);
    }


}
