<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class IngredientCompose extends Model
{
    use HasFactory;
    use HasFactory;
    protected $primaryKey = 'id';

    protected $fillable = [
        'name_ingredient_compose',
        'id_creator',
        'photo',
        'id_categorie'

    ];

    public function getPhotoAttribute($photo){
        return $photo ? asset("/storage/ingredientscompose".$photo):null;
    }

    public function ingredients()
    {
        return $this->belongsToMany(Ingredient::class, 'ingredient_compose_ingredient', 'id_ingredient_compose','id_ingredient' )
                    ->withPivot('quantite','id_creator');
    }
    public function carte()
    {
        return $this->hasOne(Cartes::class, 'id_ingredient_compose');
    }
    public function categorie()
    {
        return $this->belongsTo(Categorie::class, 'id_categorie');
    }
    public function vente()
    {
        return $this->hasMany(Ventes::class, 'id_produit');
    }




}
