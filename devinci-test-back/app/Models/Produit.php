<?php

namespace App\Models;

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
    public function ingredients()
    {
        return $this->belongsToMany(Ingredient::class, 'produit_ingredient')
                    ->withPivot('quantite', 'unite_id');
    }

}
