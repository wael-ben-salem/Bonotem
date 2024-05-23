<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ChiffreAffaire extends Model
{
    protected $fillable = [
        'montant_total',
        'chiffre_total',
        'benefice',
        'date_debut',
        'date_fin',
    ];


}
