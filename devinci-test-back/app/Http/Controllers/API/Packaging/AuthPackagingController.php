<?php

namespace App\Http\Controllers\API\Packaging;

use App\Http\Controllers\Controller;
use App\Models\Packaging\Packaging;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;


class AuthPackagingController extends Controller


{
    public function createpackaging (Request $request,$id)
{
    $validator = Validator::make($request->all(), [
        'name_packaging' => ['required', 'regex:/^[A-Za-z\s]+$/',
        function ($attribute, $value, $fail) use ($id) {
            $existingCategory = Packaging::where('name_packaging', $value)
                ->where('id_creator', $id)
                ->first();

            if ($existingCategory) {
                $fail('Ce nom de package existe déjà pour cet utilisateur.');
            }
        }
    ],
        'dimension' => 'nullable|string|max:255',
        'photo' => 'required|nullable|file|mimes:jpeg,png,jpg,gif,svg|max:1999', // L'envoi de photo est facultatif
    ], [
        'name_packaging.required' => 'Le champ nom de l\'emballage est requis.',
        'name_packaging.regex' => 'Le champ nom de l\'emballage doit contenir uniquement des lettres et des espaces.',
        'dimension.string' => 'Le champ dimension doit être une chaîne de caractères.',
        'dimension.max' => 'Le champ dimension ne doit pas dépasser :max caractères.',
        'photo.file' => 'Le champ photo doit être un fichier.',
        'photo.mimes' => 'Le champ photo doit être un fichier de type : jpeg, png, jpg, gif ou svg.',
        'photo.max' => 'Le champ photo ne doit pas dépasser :max kilo-octets.',
        'photo.required' => 'Le champ photo rest requis.',

    ]);


    if ($validator->fails()) {
        return response()->json([
            'validation_errors' => $validator->messages(),
        ]);
    } else {
        $packaging = new Packaging();
        $packaging->name_packaging = $request->name_packaging;
        $packaging->dimension = $request->dimension;
        $packaging->id_creator = $id;


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


    public function packaging(Request $request,$id)
    {
        $packagings = Packaging::where('id_creator', $id)->get();
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



            // Validation
            $validator = Validator::make($request->all(), [
                'name_packaging' => ['required', 'regex:/^[A-Za-z\s]+$/'],
                'dimension' => 'required|nullable|string|max:255',
            ], [
                'name_packaging.required' => 'Le champ nom de l\'emballage est requis.',
                'name_packaging.regex' => 'Le champ nom de l\'emballage doit contenir uniquement des lettres et des espaces.',
                'dimension.string' => 'Le champ dimension doit être une chaîne de caractères.',
                'dimension.max' => 'Le champ dimension ne doit pas dépasser :max caractères.',
                'dimension.required' => 'Le champ dimension est requis.',

            ]);

            if ($validator->fails()) {
                return response()->json([
                    'validation_errors' => $validator->messages(),
                ]);
            }else {
                // Find Ingredient
            $packaging = Packaging::find($id);

            if(!$packaging){
                return response()->json([
                   'message'=>'Packaging Not Found.'
                ],404);
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
}
