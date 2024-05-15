<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Categorie extends Model
{
    use HasFactory;
    protected $table = 'categories';
    protected $fillable = [
        'name',
        'description',
        'photo',
    ];

    public function getPhotoAttribute($photo){
        return $photo ? asset("/storage/categories".$photo):null;
    }








    public function produits()
    {
        return $this->hasMany(Produit::class, 'id_categorie');
    }
}
