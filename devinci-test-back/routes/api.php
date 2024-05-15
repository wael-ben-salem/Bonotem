<?php


use App\Http\Controllers\API\User\RoleController;
use App\Http\Controllers\CartesController;
use App\Http\Controllers\CategorieController;
use App\Http\Controllers\CoutController;
use App\Http\Controllers\FournisseurController;
use App\Http\Controllers\IngredientComposeController;
use App\Http\Controllers\IngredientController;
use App\Http\Controllers\IngredientProduitController;
use App\Http\Controllers\MarchandiseController;
use App\Http\Controllers\PerteController;
use App\Http\Controllers\ProduitController;
use App\Http\Controllers\UniteController;
use App\Http\Controllers\UserStatisticsController;
use App\Http\Controllers\VentesController;
use App\Models\Ventes;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\API\User\AuthController;
use App\Http\Controllers\Api\Packaging\AuthPackagingController;
use App\Http\Controllers\Api\Packaging\AuthPackagingCategoryController;
use App\Http\Controllers\PersonnelController;
use App\Http\Controllers\JourController;
use App\Http\Controllers\PlanningController;
use App\Http\Controllers\TypePersonnelController;
use App\Http\Controllers\PresenceController;
use App\Http\Controllers\ChargeFixeController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/
// Route::middleware(['auth:sanctum'])->group(function () {
//     Route::post("logout", [AuthController::class,"logout"]);
// });


Route::post("register", [AuthController::class , 'register']);

Route::post('login', [AuthController::class ,'login']);
Route::get('user', [AuthController::class ,'user']);
Route::get('user/{id}', [AuthController::class ,'showUser']);
Route::post('usersupdate/{id}', [AuthController::class, 'updateUser']);
Route::post("adduser/{id}", [AuthController::class , 'addUser']);
Route::post("addmanageruser/{id}", [AuthController::class , 'addManagerUser']);
Route::post('usersmanagerupdate/{id}', [AuthController::class, 'updateManagerUser']);

Route::get('/user-statistics', [UserStatisticsController::class, 'getUserStatistics']);

Route::delete('deleteuser/{id}', [AuthController::class, 'deleteUser']);


// Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
//     return $request->user();
// });

Route::post('logout', [AuthController::class ,'logout']) -> middleware ('auth:sanctum');

Route::middleware(['auth:sanctum','isAPIAdmin'])->group(function () {
    Route::get("/checkingAuthenticated",function (){
        return response()->json(['message' => 'You are in ' , 'status' => 200 ],200);
    });
});




// Packaging routes
Route::get("packaging", [AuthPackagingController::class, 'packaging']);
Route::get("packaging/{id}", [AuthPackagingController::class ,'showPackaging']);

Route::post("addpackaging", [AuthPackagingController::class, 'createpackaging']);
Route::post("updatepackaging/{id}", [AuthPackagingController::class, 'updatePackaging']);
Route::delete("deletepackaging/{id}", [AuthPackagingController::class, 'deletePackage']);



// Packaging Category routes
Route::get('packaging-categorie', [AuthPackagingCategoryController::class, 'packagingCategories']);
Route::get("packaging-categorie/{id}", [AuthPackagingCategoryController::class ,'showPackagingCategory']);

Route::post('addpackaging-categorie', [AuthPackagingCategoryController::class, 'createPackagingCategory']);
Route::put("updatepackaging-categorie/{id}", [AuthPackagingCategoryController::class, 'updatePackagingCategory']);
Route::delete("deletepackaging-categorie/{id}", [AuthPackagingCategoryController::class, 'deletePackagingCategory']);




// Role routes
Route::get('role', [RoleController::class, 'role']);
Route::get("role/{id}", [RoleController::class ,'showRole']);

Route::post('addrole', [RoleController::class, 'addRole']);
Route::put("updaterole/{id}", [RoleController::class, 'updateRole']);
Route::delete("deleterole/{id}", [RoleController::class, 'deleteRole']);






//categorie
Route::post('/categori', [CategorieController::class, 'addCategorie']);
Route::get('/categorie',[CategorieController::class,'Categorie']);
Route::get('/categorie/{id}',[CategorieController::class,'showCategorie']);
Route::post('/categori/{id}', [CategorieController::class, 'updateCategorie']);
Route::delete('/categorie/{id}', [CategorieController::class, 'deleteCategorie']);



//ingredient
Route::delete('/ingredients/{id}', [IngredientController::class, 'destroy']);
Route::post('/ingredients', [IngredientController::class, 'addIngredient']);
Route::get('/ingredients',[IngredientController::class,'ingredient']);
Route::get('/ingredients/{id}',[IngredientController::class,'show']);
Route::post('/ingredients/{id}',[IngredientController::class,'updateIngredient']);

//fournisseur
Route::delete('/fournisseurs/{id}', [FournisseurController::class, 'destroy']);
Route::post('/fournisseurs', [FournisseurController::class, 'store']);
Route::get('/fournisseurs',[FournisseurController::class,'fournisseur']);
Route::get('/fournisseurs/{id}',[FournisseurController::class,'show']);
Route::post('/fournisseurs/{id}',[FournisseurController::class,'update']);

//Produit
Route::delete('/produit/{id}', [ProduitController::class, 'destroy']);
Route::post('/produit', [ProduitController::class, 'addProduit']);
Route::get('/produit',[ProduitController::class,'produit']);
Route::get('/produit/{id}',[ProduitController::class,'showProduit']);
Route::put('/produit/{id}',[ProduitController::class,'updateProduit']);
Route::post('/produits/{produitId}/associer-ingredients', [ProduitController::class, 'associerIngrédients']);

//Unite
Route::post('/unite', [UniteController::class, 'addUnite']);
Route::get('/unite',[UniteController::class,'unite']);

