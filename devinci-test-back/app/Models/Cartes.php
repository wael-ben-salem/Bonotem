<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Cartes extends Model
{
    use HasFactory;


    protected $fillable = ['id_categorie', 'id_produit', 'prix'];


    public function produit()
    {
        return $this->belongsTo(Produit::class, 'id_produit');
    }
    public function categorie()
    {
        return $this->belongsTo(Categorie::class, 'id_categorie');
    }
}
