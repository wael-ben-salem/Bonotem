<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Planning extends Model {

    use HasFactory;

    protected $fillable = ['personnel_id', 'jour_id','id_creator', 'heure_debut', 'heure_fin','taux_heure'];


    public function personnel() {
        return $this->belongsTo(Personnel::class, 'personnel_id');
    }


    public function jour() {
        return $this->belongsTo(Jour::class, 'jour_id');
    }

    public function presence() {
        return $this->belongsTo(Presence::class, 'presence_id');
    }
    public function typePersonnel() {
        return $this->hasOneThrough(TypePersonnel::class, Personnel::class, 'id', 'personnel_id');
    }
}
