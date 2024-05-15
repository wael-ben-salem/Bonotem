<?php

namespace App\Models;

use App\Models\Packaging\Packaging;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\MorphTo;


class Marchandise extends Model
{
    use HasFactory;

    protected $fillable = ['reference', 'nom', 'quantite_achetee','quantite_en_stock','quantite_consomee', 'prix','unite_id' ,'date_achat','id_ingredient','id_packaging','id_fournisseur','unite_id'];
    protected $morphClass = 'ingredient';


    public function marchandisable(): MorphTo
    {
        return $this->morphTo()->withDefault();
    }


    // Define relationships
    public function ingredient()
    {
        return $this->belongsTo(Ingredient::class  ,'id_ingredient');
    }
    public function unite()
    {
        return $this->belongsTo(Unite::class, 'unite_id');
    }

    public function packaging()
    {
        return $this->belongsTo(Packaging::class ,'id_packaging');
    }
    public function fournisseur()
    {
        return $this->belongsTo(Fournisseur::class , 'id_fournisseur');
    }



    public function pertes()
{
    return $this->hasMany(Perte::class, 'id_marchandise');
}
}
