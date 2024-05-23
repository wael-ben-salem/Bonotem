<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ChargeVariable extends Model
{
    protected $fillable = ['id_creator','nom' ,'date', 'chiffre'];


}
