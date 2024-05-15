<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ChargeFixe extends Model
{
    use HasFactory;
    use HasFactory;

    protected $table = 'charges_fixes';

    protected $fillable = [
        'nom',
        'montant',
        'frequence',
        'date_paiement',
        'personnel_id'
    ];


    public function personnel()
    {
        return $this->belongsTo(Personnel::class, 'personnel_id');
    }
}

