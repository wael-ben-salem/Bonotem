<?php


use App\Http\Controllers\API\User\RoleController;
use App\Http\Controllers\CarteController;
use App\Http\Controllers\CategorieController;
use App\Http\Controllers\FournisseurController;
use App\Http\Controllers\IngredientController;
use App\Http\Controllers\ProduitController;
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
Route::put('usersupdate/{id}', [AuthController::class, 'updateUser']);
Route::post("adduser", [AuthController::class , 'addUser']);

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
Route::put("updatepackaging/{id}", [AuthPackagingController::class, 'updatePackaging']);
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
Route::put('/categorie/{id}', [CategorieController::class, 'updateCategorie']);
Route::delete('/categorie/{id}', [CategorieController::class, 'deleteCategorie']);

//Carte
Route::delete('/carte/{id}', [CarteController::class, 'destroy']);
Route::post('/carte', [CarteController::class, 'store']);
Route::get('/carte',[CarteController::class,'index']);
Route::get('/carte/{id}',[CarteController::class,'show']);
Route::put('/carte/{id}',[CarteController::class,'update']);

//ingredient
Route::delete('/ingredients/{id}', [IngredientController::class, 'destroy']);
Route::post('/ingredients', [IngredientController::class, 'store']);
Route::get('/ingredients',[IngredientController::class,'index']);
Route::get('/ingredients/{id}',[IngredientController::class,'show']);
Route::put('/ingredients/{id}',[IngredientController::class,'update']);

//fournisseur
Route::delete('/fournisseurs/{id}', [FournisseurController::class, 'destroy']);
Route::post('/fournisseurs', [FournisseurController::class, 'store']);
Route::get('/fournisseurs',[FournisseurController::class,'index']);
Route::get('/fournisseurs/{id}',[FournisseurController::class,'show']);
Route::put('/fournisseurs/{id}',[FournisseurController::class,'update']);

//Produit
Route::delete('/produit/{id}', [ProduitController::class, 'destroy']);
Route::post('/produit', [ProduitController::class, 'addProduit']);
Route::get('/produit',[ProduitController::class,'produit']);
Route::get('/produit/{id}',[ProduitController::class,'showProduit']);
Route::put('/produit/{id}',[ProduitController::class,'updateProduit']);
Route::post('/produits/{produitId}/associer-ingredients', [ProduitController::class, 'associerIngrédients']);


// Personnel
Route::get('/personnel', [PersonnelController::class, 'personnel']);
Route::get("/personnel/{id}", [PersonnelController::class ,'showPersonnel']);

Route::post('/addpersonnel', [PersonnelController::class, 'addPersonnel']);
Route::put("/updatepersonnel/{id}", [PersonnelController::class, 'updatePersonnel']);
Route::delete("/deletepersonnel/{id}", [PersonnelController::class, 'deletePersonnel']);

//type_personnel/
Route::get('/type_personnel',[TypePersonnelController::class,'TypePersonnel']);
Route::get('/type_personnel/{id}',[TypePersonnelController::class,'showTypePersonnel']);

Route::post('/addtype_personnel', [TypePersonnelController::class, 'addTypePersonnel']);
Route::put('/updatetype_personnel/{id}',[TypePersonnelController::class,'updateTypePersonnel']);
Route::delete('/deletetype_personnel/{id}', [TypePersonnelController::class, 'deleteTypePersonnel']);


// Planning
Route::get('/planning', [PlanningController::class, 'planning']);
Route::get("/planning/{id}", [PlanningController::class ,'showPlanning']);

Route::post('/addplanning', [PlanningController::class, 'addPlanning']);
Route::put("/updateplanning/{id}", [PlanningController::class, 'updatePlanning']);
Route::delete("/deleteplanning/{id}", [PlanningController::class, 'deletePlanning']);

//Jour
Route::get('/jour', [JourController::class, 'jour']);
Route::get("/jour/{id}", [JourController::class ,'showJour']);

Route::post('/addjour', [JourController::class, 'addJour']);
Route::put("/updatejour/{id}", [JourController::class, 'updateJour']);
Route::delete("/deletejour/{id}", [JourController::class, 'deleteJour']);

//Presence
Route::get('/presence', [PresenceController::class, 'presence']);
Route::get("/presence/{id}", [PresenceController::class ,'showPresence']);

Route::post('/addpresence', [PresenceController::class, 'addPresence']);
Route::put("/updatepresence/{id}", [PresenceController::class, 'updatePresence']);
Route::delete("/deletepresence/{id}", [PresenceController::class, 'deletePresence']);
