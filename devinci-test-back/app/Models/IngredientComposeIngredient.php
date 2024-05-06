<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class IngredientComposeIngredient extends Model
{
    use HasFactory;
    protected $fillable = ['id_ingredient_compose', 'id_ingredient'];

    public function ingredientCompose()
    {
        return $this->belongsTo(IngredientComposeIngredient::class, 'id_ingredient_compose');
    }

    public function ingredient()
    {
        return $this->belongsTo(Ingredient::class, 'id_ingredient');
    }
}
