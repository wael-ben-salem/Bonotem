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
        'name_packaging' => ['required', 'unique:packagings', 'regex:/^[A-Za-z\s]+$/'],
        'dimension' => 'nullable|string|max:255',
        'photo' => 'nullable|file|mimes:jpeg,png,jpg,gif,svg|max:1999', // Image upload is optional
    ]);

    if ($validator->fails()) {
        return response()->json([
            'validation_errors' => $validator->messages(),


        ],422);
    } else {
        $packaging = new Packaging();
        $packaging->name_packaging = $request->name_packaging;
        $packaging->dimension = $request->dimension;

        // Handle the photo upload if it's present in the request
        if ($request->hasFile('photo')) {
            $photo = $request->file('photo');
            $filename = time() . '.' . $photo->getClientOriginalExtension();
            $photo->storeAs('public', $filename);
            $packaging->photo = $filename;
        }

        $packaging->save();


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

            // Find Ingredient
            $packaging = Packaging::find($id);

            if(!$packaging){
                return response()->json([
                   'message'=>'Packaging Not Found.'
                ],404);
            }

            // Validation
            $validator = Validator::make($request->all(), [
                'name_packaging' => ['required', 'regex:/^[A-Za-z\s]+$/'],
                'dimension' => 'nullable|string|max:255',

            ]);

            if ($validator->fails()) {
                return response()->json([
                    'validation_errors' => $validator->messages(),
                ]);
            }else {
                $packaging->name_packaging = $request->name_packaging;
                $packaging->dimension = $request->dimension;

                // Check if 'photo_url' exists in the request and update the photo attribute
                if ($request->hasFile('photo')) {
                    $photo = $request->file('photo');
                    $filename = time() . '.' . $photo->getClientOriginalExtension();
                    $photo->storeAs('public', $filename);
                    $packaging->photo = $filename;
                }

                $packaging->save();

            return response()->json([
                'message' => "Packaging successfully updated."
            ],200);
        }

    }
}
