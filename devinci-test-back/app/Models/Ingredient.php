<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Ingredient extends Model
{
    use HasFactory;
    protected $table = 'ingredients';
    protected $primaryKey = 'id_ingredient';
    protected $fillable = [
        'name_ingredient',
        'unit_measure',
        'id_fournisseur',
    ];


    public function fournisseur()
    {
        return $this->belongsTo(Fournisseur::class, 'id_fournisseur');
    }
    public function produits()
    {
        return $this->belongsToMany(Produit::class, 'produit_ingredient')
                    ->withPivot('quantite', 'unite_id');
    }

}
