<?php

namespace App\Models\Packaging;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use App\Models\Packaging\Packaging;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Notifiable;

class PackagingCategory extends Model
{
    use  HasFactory, Notifiable;

    // Define the table associated with the model
    protected $table = 'packaging_categories';


/**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    // Specify which attributes can be mass assigned

    protected $fillable = [
        'id_packaging',



    ];
    public function packaging()
    {
        return $this->belongsTo(Packaging::class, 'id_packaging');
    }


}
