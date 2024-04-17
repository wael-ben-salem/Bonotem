<?php

namespace App\Http\Controllers\API\Packaging;

use App\Http\Controllers\Controller;
use App\Models\Packaging\Packaging;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;


class AuthPackagingController extends Controller


{
    public function createpackaging (Request $request)
{
    $validator = Validator::make($request->all(), [
        'name_packaging' => 'required|string|min:3|unique:packagings,name_packaging',
        'nombre_package' => 'required|int',
        'validate' => 'required|boolean',
        // Add more validation rules as needed
    ]);

    if ($validator->fails()) {
        return response()->json([
            'validation_errors' => $validator->messages(),


        ],422);
    } else {
        $packaging = Packaging::create([
            'name_packaging' => $request->name_packaging,
            'nombre_package' => $request->nombre_package,
            'validate' => $request->validate,
        ]);

        return response()->json([
            'status' => 200,
            'name_packaging' => $packaging->name_packaging,
            'message' => ' Package Added Success',
        ], 200);
    }
}


    public function packaging(Request $request)
    {
        $packagings = Packaging::all();
        return response()->json($packagings);
    }





    public function showPackaging($id)
    {
       // User Detail
       $packagins = Packaging::find($id);

       if(!$packagins){
         return response()->json([
            'message'=>'Package Not Found.'
         ],404);
       }

       // Return Json Response
       return response()->json([
          'packagins' => $packagins
       ],200);
    }






    public function deletePackage($id)
    {
        // Detail
        $packagings = Packaging::find($id);
        if(!$packagings){
          return response()->json([
             'message'=>'Package Not Found.'
          ],404);
        }

        // Delete User
        $packagings->delete();

        // Return Json Response
        return response()->json([
            'message' => "Package successfully deleted."
        ],200);
    }





    public function updatePackaging(Request $request, $id)
    {
        try {
            $packaging = Packaging::find($id);
            if(!$packaging){
                return response()->json([
                   'message'=>'Packaging Not Found.'
                ],404);
            }

            //echo "request : $request->image";
            $packaging->update($request->all());

            return response()->json([
                'message' => "Packaging successfully updated."
            ],200);
        } catch (\Exception $e) {
            // Return Json Response
            return response()->json([
                'message' => "Something went really wrong!"
            ],500);
        }
    }
}
