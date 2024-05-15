<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Presence extends Model
{
    use HasFactory;
    protected $table = 'presences';

    protected $fillable = [
        'planning_id',
        'heure_debut_reelle',
        'heure_fin_reelle',
        'taux_horaire_reelle',
        'date'
    ];

    public function planning()
    {
        return $this->belongsTo(Planning::class, 'personnel_id');
    }
}
