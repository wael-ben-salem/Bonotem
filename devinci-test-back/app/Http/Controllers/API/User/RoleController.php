<?php

namespace App\Http\Controllers\API\User;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User\Role;
use Illuminate\Support\Facades\Validator;


class RoleController extends Controller
{


    public function role (Request $request){


            $roles = Role::all();
            return response()->json($roles);

    }


















    public function addRole(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name_role' => 'required|string|unique:roles,name_role',

        ]);
        if( $validator->fails() ){
            return response() ->json([
                'validation_errors' => $validator->messages(),


            ]);
        }else{
            $role = Role::create([
                    'name_role' => $request->name_role,


                ]);
                return response() ->json([
                        'status' => 200,
                        'name_role' => $role->name_role,
                        'message' => 'Added Success',

                ]);
        }

    }


    public function showRole($id)
    {
     
       $roles = Role::find($id);

       if(!$roles){
         return response()->json([
            'message'=>'Role Not Found.'
         ],404);
       }


       return response()->json([
          'roles' => $roles
       ],200);
    }

    public function updateRole(Request $request, $id)
    {
        try {
            // Find Role
            $role = Role::find($id);
            if(!$role){
                return response()->json([
                   'message'=>'Role Not Found.'
                ],404);
            }

            //echo "request : $request->image";
            $role->update($request->all());

            return response()->json([
                'message' => "Role successfully updated."
            ],200);
        } catch (\Exception $e) {

            return response()->json([
                'message' => "Something went really wrong!"
            ],500);
        }
    }

    public function deleteRole($id)
    {

        $roles = Role::find($id);
        if(!$roles){
          return response()->json([
             'message'=>'Role Not Found.'
          ],404);
        }


        $roles->delete();

        // Return Json Response
        return response()->json([
            'message' => "Role successfully deleted."
        ],200);
    }


    //
}
