<?php

namespace App\Http\Controllers\API\Packaging;

use App\Http\Controllers\Controller;
use App\Models\Packaging\Packaging;
use App\Models\Packaging\PackagingCategory;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class AuthPackagingCategoryController extends Controller
{
    public function createPackagingCategory(Request $request)
    {
        // Vérifier si l'ID de l'emballage existe dans la table packagings
        $existingPackaging = Packaging::find($request->id_packaging);



        // Si l'ID de l'emballage existe, valider et créer la catégorie d'emballage
        $validator = Validator::make($request->all(), [
            'id_packaging' => 'required|int|unique:packaging_categories,id_packaging',
            // Ajoutez d'autres règles de validation si nécessaire
        ]);

        if ($validator->fails()) {
            return response()->json([
                'validation_errors' => $validator->messages(),
            ], 422);
        } else  if (!$existingPackaging) {
            return response()->json([
                'status' => 404,
                'message' => 'Package id not found',
            ], 404);
        }else {
            try {
                $packagingCategory = PackagingCategory::create([
                    'id_packaging' => $request->id_packaging,
                ]);

                return response()->json([
                    'status' => 200,
                    'id_packaging' => $packagingCategory->id_packaging,
                    'message' => 'Packaging Category Added Successfully',
                ], 200);
            } catch (\Exception $e) {
                // Gérer les erreurs d'insertion dans la base de données
                return response()->json([
                    'status' => 500,
                    'message' => 'Error adding packaging category: ' . $e->getMessage(),
                ], 500);
            }
        }
    }




    public function packagingCategories(Request $request)
    {
        $packagingCategories = PackagingCategory::with('packaging')->get();
        return response()->json($packagingCategories);
    }




    public function showPackagingCategory($id)
    {
        $packagingCategory = PackagingCategory::find($id);

        if (!$packagingCategory) {
            return response()->json([
                'message' => 'Packaging Category Not Found.',
            ], 404);
        }

        return response()->json([
            'packaging_category' => $packagingCategory,
        ], 200);
    }





    public function deletePackagingCategory($id)
    {
        $packagingCategory = PackagingCategory::find($id);

        if (!$packagingCategory) {
            return response()->json([
                'message' => 'Packaging Category Not Found.',
            ], 404);
        }

        $packagingCategory->delete();

        return response()->json([
            'message' => 'Packaging Category successfully deleted.',
        ], 200);
    }

    public function updatePackagingCategory(Request $request, $id)
    {
        try {
            $packagingCategory = PackagingCategory::find($id);

            if (!$packagingCategory) {
                return response()->json([
                    'message' => 'Packaging Category Not Found.',
                ], 404);
            }

            $packagingCategory->update($request->all());

            return response()->json([
                'message' => 'Packaging Category successfully updated.',
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Something went wrong!',
            ], 500);
        }
    }
}
