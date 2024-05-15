<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Ingredient extends Model
{
    use HasFactory;
    protected $primaryKey = 'id';
    protected $morphClass = 'Ingredient';

    protected $fillable = [
        'name_ingredient',

    ];

    public function getPhotoAttribute($photo){
        return $photo ? asset("/storage/ingredients".$photo):null;
    }

    public function fournisseur()
    {
        return $this->belongsTo(Fournisseur::class, 'id_fournisseur');
    }
    public function pertes()
    {
        return $this->hasMany(Perte::class, 'id_ingredient');
    }

    public function produits()
    {
        return $this->belongsToMany(Produit::class, 'produit_ingredient', 'id_ingredient' ,'id_produit')
                    ->withPivot('quantite');
    }
    public function ingredientCompose()
    {
        return $this->belongsToMany(IngredientCompose::class, 'ingredient_compose_ingredient', 'id_ingredient' ,'id_ingredient_compose')
                    ->withPivot('quantite');
    }

    public function marchandise()
    {
        return $this->belongsTo(Marchandise::class);
    }



}
