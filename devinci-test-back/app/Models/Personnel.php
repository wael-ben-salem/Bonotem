<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Personnel extends Model
{
    use HasFactory;


    protected $table = 'personnels';

    protected $fillable = [
        'name',
        'salaire',
        'num_telephone',
        'type_personnel_id'
    ];


    public function typePersonnel() {
        return $this->belongsTo(TypePersonnel::class, 'type_personnel_id');
    }

    public function plannings() {
        return $this->hasMany(Planning::class, 'personnel_id');
    }

    public function presence()
    {
        return $this->hasMany(Presence::class);
    }

}
