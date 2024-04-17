<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ProduitIngredient extends Model
{
    protected $fillable = ['produit_id', 'ingredient_id', 'quantite', 'unite_id'];

    public function produit()
    {
        return $this->belongsTo(Produit::class);
    }

    public function ingredient()
    {
        return $this->belongsTo(Ingredient::class);
    }

    public function unite()
    {
        return $this->belongsTo(Unite::class);
    }
}
