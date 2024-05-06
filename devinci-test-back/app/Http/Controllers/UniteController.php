<?php

namespace App\Http\Controllers;
use App\Models\Ingredient;
use App\Models\Unite;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Log;

class UniteController extends Controller
{
    public function unite()
    {
        $unites = Unite::all();
        return response()->json($unites);
    }



    public function addUnite(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name_unite' => 'required|unique:unites',
        ]);
        if ($validator->fails()) {
            return response()->json([
            'validation_errors' => $validator->messages(),
            ]);
        } else {
            $produit = Unite::create([
            'name_unite' => $request->name_unite,
            ]);
                return response()->json([
                'status' => 200,
                'nom Unite' => $produit->name_unite,

               'message' => 'added Success',
            ],200);
        }
    }

}
