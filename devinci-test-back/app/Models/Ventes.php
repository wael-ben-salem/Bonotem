<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Ventes extends Model
{
    use HasFactory;
    protected $fillable = ['id_categorie','id_creator', 'id_produit', 'prixTTC','quantite','id_ingredient_compose'];


    public function carte()
    {
        return $this->belongsTo(Cartes::class, 'id_carte');
    }
    public function produit()
    {
        return $this->belongsTo(Produit::class, 'id_produit');
    } public function categorie()
    {
        return $this->belongsTo(Categorie::class, 'id_categorie');
    }
    public function ingredient_composee()
    {
        return $this->belongsTo(IngredientCompose::class, 'id_ingredient_compose');
    }

}
