<?php

namespace App\Http\Controllers\API\User;

use App\Http\Controllers\Controller;
use App\Models\User\Role;
use Illuminate\Http\Request;
use App\Models\User\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;


class AuthController extends Controller
{



   public function register(Request $request)
       {
           // Vérifier si l'ID de l'emballage existe dans la table packagings



           // Si l'ID de l'emballage existe, valider et créer la catégorie d'emballage
           $validator = Validator::make($request->all(), [
               'name' => 'required',
               'email'=>'required|max:191|unique:users,email',
               'password'=> 'required|min:8',
               // Ajoutez d'autres règles de validation si nécessaire
           ]);

           if ($validator->fails()) {
               return response()->json([
                   'validation_errors' => $validator->messages(),
               ], 422);
           } else {
               try {
                   $user = User::create([
                       'name' => $request->name,
                       'email'=> $request->email,
                       'password'=> Hash::make($request->password),

                   ]);

                   $token = $user->createToken($user-> email.'_Token') -> plainTextToken;
                   return response() ->json([
                           'status' => 200,
                           'username' => $user->name,
                           'token' => $token ,
                           'message' => 'Registered Success',

                   ],200);
               } catch (\Exception $e) {
                   // Gérer les erreurs d'insertion dans la base de données
                   return response()->json([
                       'status' => 500,
                       'message' => 'Error adding Role to User: ' . $e->getMessage(),
                   ], 500);

               }
           }
       }










    public function user (Request $request)   {
        $users = User::with('role')->get(); // Load the role information
        return response()->json($users);
    }
    // public function register(Request $request)
    // {
    //     $validator = Validator::make($request->all(), [
    //         'name' => 'required',
    //         'email'=>'required|max:191|unique:users,email',
    //         'password'=> 'required|min:8',
    //     ]);
    //     if( $validator->fails() ){
    //         return response() ->json([
    //             'validation_errors' => $validator->messages(),


    //         ]);
    //     }else{
    //         $user = User::create([
    //                 'name' => $request->name,
    //                 'email'=> $request->email,
    //                 'password'=> Hash::make($request->password),

    //             ]);
    //             $token = $user->createToken($user-> email.'_Token') -> plainTextToken;
    //             return response() ->json([
    //                     'status' => 200,
    //                     'username' => $user->name,
    //                     'token' => $token ,
    //                     'message' => 'Registered Success',

    //             ],200);
    //     }

    // }




    public function addUser(Request $request)
{
    $existingRole = Role::find($request->role_id);

    $validator = Validator::make($request->all(), [
        'name' => 'required',
        'email'=>'required|max:191|unique:users,email',
        'password'=> 'required|min:8',
        'statut' => 'required',
        'adresse' => 'required',
        'numero' => 'required|min:8'

    ]);

    if ($validator->fails()) {
        return response()->json([
            'validation_errors' => $validator->messages(),
        ]);
    } else if (!$existingRole) {
        return response()->json([
            'status' => 404,
            'message' => 'Role name not found',
        ], 404);
    } else {
        $user = User::create([
            'name' => $request->name,
            'email'=> $request->email,
            'password'=> Hash::make($request->password),
            'statut' => $request->statut,
            'adresse' => $request->adresse,
            'numero' => $request->numero,
            'role_id' => $request->role_id
        ]);

        $token = $user->createToken($user->email.'_Token')->plainTextToken;

        return response()->json([
            'status' => 200,
            'username' => $user->name,
            'id_role' => $user->role_id,

            'token' => $token,
            'message' => 'added Success',
        ],200);
    }
}



    public function showUser($id)
    {
        $user = User::with('role')->find($id); // Load the role information
        if (!$user) {
            return response()->json([
                'message' => 'User Not Found.'
            ], 404);
        }
        return response()->json([
            'user' => $user
        ], 200);
    }


    public function updateUser(Request $request, $id)
    {
        try {
            // Find User
            $user = User::find($id);
            if(!$user){
                return response()->json([
                   'message'=>'User Not Found.'
                ],404);
            }

            //echo "request : $request->image";
            $user->update($request->all());

            return response()->json([
                'message' => "User successfully updated."
            ],200);
        } catch (\Exception $e) {
            // Return Json Response
            return response()->json([
                'message' => "Something went really wrong!"
            ],500);
        }
    }

    public function deleteUser($id)
    {
        // Detail
        $users = User::find($id);
        if(!$users){
          return response()->json([
             'message'=>'User Not Found.'
          ],404);
        }

        // Delete User
        $users->delete();

        // Return Json Response
        return response()->json([
            'message' => "User successfully deleted."
        ],200);
    }



    public function login(Request $request){
        $validator = Validator::make($request->all(), [
            'email'=> 'required|max:191',
            'password'=> 'required'
        ]);


        if($validator->fails()){

            return response() ->json([
                'validation_errors' => $validator->messages(),


            ]);


        }else{
            $user = User::where('email', $request->email)->first();

            if (! $user || ! Hash::check($request->password, $user->password)) {
                return response() ->json([
                    'status'=> 401,
                    'message'=> 'Invalid Credentials',
                ]);
            }
            else{

                if ($user->role->name_role === "admin" )//Admin
                {
                    $token = $user->createToken($user-> email.'_AdminToken' , ['server:admin'])-> plainTextToken;

                }
                else{
                $token = $user->createToken($user-> email.'_Token', ['restauratuer']) -> plainTextToken;
                }
                return response() ->json([
                        'status' => 200,
                        'username' => $user->name,
                        'token' => $token ,
                        'message' => 'Logged Success',
                        'role' => $user->role->name_role ,
                        'statut' => $user->statut,

                ]);

            }


        }








    }

    // public function logout(){

    //     auth() -> user() -> tokens() -> delete();
    //     return response() -> json([
    //         'status' => 200 ,
    //         'message'=> 'Logged out Successfully',
    //     ]);


    // }



    public function logout(Request $request){

        $request -> user() -> currentAccessToken() -> delete();
        return response() -> json([
            'status' => 200 ,
            'message'=> 'Logged out Successfully',
        ]);


    }




    //
}
