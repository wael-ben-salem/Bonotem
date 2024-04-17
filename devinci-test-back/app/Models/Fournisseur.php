<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Fournisseur extends Model
{
    protected $table = 'fournisseurs';
 protected $primaryKey = 'id_fournisseur';
    protected $fillable = [
        'nom',
        'num_telephone',
        'email',
    ];
   public function ingredient()
    {
        return $this->hasMany(Ingredient::class, 'id_fournisseur');
    }
}
