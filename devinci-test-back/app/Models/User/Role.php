<?php

namespace App\Models\User;

use App\Models\User\User;
use Illuminate\Database\Eloquent\Model;

class Role extends Model
{

    protected $fillable = ['name_role'];

    /**
     * Define the relationship between Role and User.
     */
    public function users()
    {
        return $this->hasMany(User::class);
    }
}
