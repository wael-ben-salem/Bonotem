<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Jour extends Model
{
    use HasFactory;
    protected $table = 'jours';

    protected $fillable = [
        'name',
    ];
    public function plannings() {

        return $this->hasMany(Planning::class, 'jour_id');
    }
}
