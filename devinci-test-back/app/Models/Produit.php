<?php

namespace App\Models;

use App\Models\Packaging\Packaging;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Produit extends Model
{
    use HasFactory;
    protected $primaryKey = 'id';
    protected $fillable = ['name_produit', 'id_categorie', 'marge'];


    public function categorie()
    {
        return $this->belongsTo(Categorie::class, 'id_categorie');
    }
    public function carte()
    {
        return $this->hasOne(Cartes::class, 'id_produit');
    }
    public function ingredients()
{
    return $this->belongsToMany(Ingredient::class, 'produit_ingredient', 'id_produit', 'id_ingredient')
                ->withPivot('quantite');
}

public function packagings()
{
    return $this->belongsToMany(Packaging::class, 'packaging_produit', 'id_produit', 'id_packaging')
                ->withPivot('nombre_package');
}

}
