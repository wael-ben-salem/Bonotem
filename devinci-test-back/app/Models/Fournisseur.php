<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Fournisseur extends Model
{
    protected $table = 'fournisseurs';
 protected $primaryKey = 'id';
    protected $fillable = [
        'nom',
        'num_telephone',
        'email',
        'id_creator'
    ];


    public function getPhotoAttribute($photo){
        return $photo ? asset("/storage/fournisseurs".$photo):null;
    }
    public function marchandises()
    {
        return $this->hasMany(Marchandise::class, 'id_fournissseur');
    }
}
