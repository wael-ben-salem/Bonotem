<?php

namespace App\Models;

use App\Models\Packaging\Packaging;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PackagingProduit extends Model
{
    use HasFactory;

    protected $fillable = ['id_produit', 'id_packaging', 'nombre_package',,'id_creator'];



    public function produit()
    {
        return $this->belongsTo(Produit::class, 'id_produit');
    }


    public function packaging()
    {
        return $this->belongsTo(Packaging::class, 'id_packaging');
    }
}
