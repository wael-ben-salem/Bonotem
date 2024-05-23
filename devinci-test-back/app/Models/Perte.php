<?php

namespace App\Models;

use App\Models\Packaging\Packaging;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Perte extends Model
{

    use HasFactory;

    protected $fillable = [
        'id_marchandise',
        'quantite',
        'montant',
        'id_packaging',
        'id_ingredient',
        'id_creator'

    ];

    public function marchandise()
    {
        return $this->belongsTo(Marchandise::class, 'id_marchandise');
    }
    public function ingredient()
    {
        return $this->belongsTo(Ingredient::class, 'id_ingredient');
    } public function packaging()
    {
        return $this->belongsTo(Packaging::class, 'id_packaging');
    }


}
