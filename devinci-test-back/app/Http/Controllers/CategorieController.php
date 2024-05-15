<?php

namespace App\Http\Controllers;


use App\Http\Controllers\Controller;
use App\Models\Categorie;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;
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
{$validator = Validator::make($request->all(), [
    'name' => ['required', 'string','unique:categories','regex:/^[A-Za-z\s]+$/'],

    'description' => 'required|string',
    'photo' => 'required|nullable|file|mimes:jpeg,png,jpg,gif,svg|max:1999', // L'envoi de photo est facultatif
], [
    'name.required' => 'Le champ nom est requis.',
    'name.regex' => 'Le champ nom d\'ingrédient doit contenir uniquement des lettres et des espaces.',
    'name.unique' => 'Ce nom de categorie existe déjà.',

    'name.string' => 'Le champ nom doit être une chaîne de caractères.',
    'name.max' => 'Le champ nom ne doit pas dépasser :max caractères.',
    'description.required' => 'Le champ description est requis.',
    'description.string' => 'Le champ description doit être une chaîne de caractères.',
    'photo.required' => 'Le champ photo est requis.',

    'photo.file' => 'Le champ photo doit être un fichier.',
    'photo.mimes' => 'Le champ photo doit être un fichier de type : jpeg, png, jpg, gif ou svg.',
    'photo.max' => 'Le champ photo ne doit pas dépasser :max kilo-octets.',
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
        $categorie = Categorie::findOrFail($id);

        $validator = Validator::make($request->all(), [
            'name' => ['required', 'string','regex:/^[A-Za-z\s]+$/'],
            'description' => 'required|string',
            'photo' => 'nullable|file|mimes:jpeg,png,jpg,gif,svg|max:1999', // L'envoi de photo est facultatif

        ], [
            'name.required' => 'Le champ nom est requis.',
            'name.regex' => 'Le champ nom d\'ingrédient doit contenir uniquement des lettres et des espaces.',

            'name.string' => 'Le champ nom doit être une chaîne de caractères.',
            'name.max' => 'Le champ nom ne doit pas dépasser :max caractères.',
            'description.required' => 'Le champ description est requis.',
            'photo.required' => 'Le champ photo est requis.',

            'photo.file' => 'Le champ photo doit être un fichier.',
            'photo.mimes' => 'Le champ photo doit être un fichier de type : jpeg, png, jpg, gif ou svg.',
            'photo.max' => 'Le champ photo ne doit pas dépasser :max kilo-octets.',

            'description.string' => 'Le champ description doit être une chaîne de caractères.',
        ]);


        if ($validator->fails()) {
            return response()->json([
                'validation_errors' => $validator->messages(),
            ]);
        }
            else {
            $categorie->name = $request->name;
            $categorie->description = $request->description;

            // Check if 'photo_url' exists in the request and update the photo attribute
            if ($request->hasFile('photo')) {
                $photo = $request->file('photo');
                $filename = time() . '.' . $photo->getClientOriginalExtension();
                $photo->storeAs('public', $filename);
                $categorie->photo = $filename;
            }

            $categorie->save();

            return response()->json([
                'status' => 200,
                'message' => 'Catégorie mise à jour',
                'Categorie' => $categorie,
            ]);
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
