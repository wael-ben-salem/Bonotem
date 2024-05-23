<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\MorphTo;

class Cout extends Model
{
    use HasFactory;


    protected $fillable = ['detail', 'montant', 'type','date','id_depense','id_ventilation','id_creator'];


    public function coutable(): MorphTo
    {
        return $this->morphTo()->withDefault();
    }
    public function ventilation()
    {
        return $this->belongsTo(Ventilation::class ,'id_ventilation');
    }
    public function packaging()
    {
        return $this->belongsTo(Depense::class ,'id_depense');
    }


}
