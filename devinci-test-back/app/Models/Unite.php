<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Unite extends Model
{
    protected $fillable = ['name_unite'];

    public function produitIngredients()
    {
        return $this->hasMany(ProduitIngredient::class);
    }}
