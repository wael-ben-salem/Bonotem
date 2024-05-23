<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Cartes extends Model
{
    use HasFactory;


    protected $fillable = ['id_categorie', 'id_produit', 'prix','id_creator','id_ingredient_compose'];


    public function produit()
    {
        return $this->belongsTo(Produit::class, 'id_produit');
    }
    public function ingredient_compose()
{
    return $this->belongsTo(IngredientCompose::class, 'id_ingredient_compose');
}

    public function categorie()
    {
        return $this->belongsTo(Categorie::class, 'id_categorie');
    }
    public function vente()
    {
        return $this->hasOne(Ventes::class, 'id_carte');
    }
}
