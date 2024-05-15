<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Ventilation extends Model
{
    use HasFactory;


    public function cout()
    {
        return $this->hasMany(Cout::class);
    }
}
