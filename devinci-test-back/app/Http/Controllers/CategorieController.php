<?php

namespace App\Http\Controllers;


use App\Http\Controllers\Controller;
use App\Models\Categorie;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Validator;
class CategorieController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function categorie(Request $request)
{
    // Eager load the products with each category
    $categories = Categorie::with('produits')->get();

    return response()->json($categories);
}


    /**
     * Store a newly created resource in storage.
     */
    public function addCategorie(Request $request)
{
    $validator = Validator::make($request->all(), [
        'name' => 'required|string|max:255',
        'description' => 'required|string',
        'photo' => 'nullable|file|mimes:jpeg,png,jpg,gif,svg|max:1999', // Image upload is optional
    ]);

    if ($validator->fails()) {
        return response()->json([
            'validation_errors' => $validator->messages(),
        ]);
    } else {
        $categorie = new Categorie();
        $categorie->name = $request->name;
        $categorie->description = $request->description;

        // Handle the photo upload if it's present in the request
        if ($request->hasFile('photo')) {
            $photo = $request->file('photo');
            $filename = time() . '.' . $photo->getClientOriginalExtension();
            $photo->storeAs('public', $filename);
            $categorie->photo = $filename;
        }

        $categorie->save();

        return response()->json([
            'status' => 201,
            'message' => 'Catégorie Ajoutée',
            'Categorie' => $categorie,
        ], 201);
    }
}


    /**
     * Display the specified resource.
     */
    public function showCategorie($id)
    {
       // Role Detail
       $categories = Categorie::find($id);

       if(!$categories){
         return response()->json([
            'message'=>'Category Not Found.'
         ],404);
       }

       // Return Json Response
       return response()->json([
          'categories' => $categories
       ],200);
    }


    public function updateCategorie(Request $request, $id)
    {
        try {
            $categorie = Categorie::find($id);

            if(!$categorie){
                return response()->json([
                   'message'=>'Category Not Found.'
                ],404);
            }

            $validator = Validator::make($request->all(), [
                'name' => 'string|max:255',
                'description' => 'string',
                'photo' => 'nullable|file|mimes:jpeg,png,jpg,gif,svg|max:1999', // Image upload is optional
            ]);

            if ($validator->fails()) {
                return response()->json([
                    'validation_errors' => $validator->messages(),
                ]);
            } else {
                $categorie->fill($request->except('photo'));

                // Handle the photo update if it's present in the request
                if ($request->hasFile('photo')) {
                    $photo = $request->file('photo');
                    $filename = time() . '.' . $photo->getClientOriginalExtension();
                    $photo->storeAs('public', $filename);
                    $categorie->photo = $filename;
                }

                $categorie->save();

                return response()->json([
                    'message' => "Category successfully updated."
                ],200);
            }
        } catch (\Exception $e) {
            // Return Json Response
            return response()->json([
                'message' => "Something went really wrong!"
            ],500);
        }
    }


    /**
     * Remove the specified resource from storage.
     */
    public function deleteCategorie($id)
    {
        // Detail
        $categories = Categorie::find($id);
        if(!$categories){
          return response()->json([
             'message'=>'Category Not Found.'
          ],404);
        }

        // Delete Role
        $categories->delete();

        // Return Json Response
        return response()->json([
            'message' => "Category successfully deleted."
        ],200);
    }
}
