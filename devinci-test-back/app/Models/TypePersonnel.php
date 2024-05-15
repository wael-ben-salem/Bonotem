<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TypePersonnel extends Model
{
    use HasFactory;

    protected $fillable = ['nom', 'prix_heure'];

    public function personnel() {
        
        return $this->hasMany(Personnel::class, 'type_personnel_id');
    }
}

