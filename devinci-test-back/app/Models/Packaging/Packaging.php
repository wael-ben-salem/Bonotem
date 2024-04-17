<?php

namespace App\Models\Packaging;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use App\Models\Packaging\PackagingCategory;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Notifiable;

class Packaging extends Model
{
    use  HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */

    // Define the table associated with the model
    protected $table = 'packagings';




/**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    // Specify which attributes can be mass assigned
    protected $fillable = [
        'name_packaging',
        'nombre_package',
        'validate'


    ];

    public function packagingCategory()
    {
        return $this->hasOne(PackagingCategory::class, 'id_packaging');
    }
}
