<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ProduitIngredient extends Model
{
    protected $fillable = ['id_produit', 'id_ingredient'];

    public function produit()
    {
        return $this->belongsTo(Produit::class, 'id_produit');
    }

    public function ingredient()
    {
        return $this->belongsTo(Ingredient::class, 'id_ingredient');
    }

}
