<?php

namespace App\Http\Controllers\API\User;

use App\Http\Controllers\Controller;
use App\Models\User\Role;
use Carbon\Carbon;
use Illuminate\Http\Request;
use App\Models\User\User;

use Illuminate\Support\Facades\Auth;
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
            'email' => 'required|max:191|unique:users,email',
            'password' => 'required|min:8',
            // Add other validation rules if needed
        ], [
            'name.required' => 'Le champ nom est requis.',
            'email.required' => 'Le champ email est requis.',
            'email.max' => 'Le champ email ne doit pas dépasser :max caractères.',
            'email.unique' => 'Cet email est déjà utilisé.',
            'password.required' => 'Le champ mot de passe est requis.',
            'password.min' => 'Le mot de passe doit comporter au moins :min caractères.',
        ]);


        if ($validator->fails()) {
            return response()->json([
                'validation_errors' => $validator->messages(),
            ]);
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
        $users = User::with('role')->get();
        return response()->json($users);
    }
    public function usertoken (Request $request)   {
        $users = person::with('role')->get();
        return response()->json($users);
    }




    public function addManagerUser(Request $request, $id)
    {
        $existingRole = Role::where('name_role', 'restaurateur')->first();

        $validator = Validator::make($request->all(), [
            'name' => 'required',
            'email' => 'required|max:191|unique:users,email',
            'password' => 'required|min:8',
            'adresse' => 'required',
            'numero' => 'required|min:8'
        ], [
            'name.required' => 'Le champ nom est requis.',
            'email.required' => 'Le champ email est requis.',
            'email.max' => 'Le champ email ne doit pas dépasser :max caractères.',
            'email.unique' => 'Cet email est déjà utilisé.',
            'password.required' => 'Le champ mot de passe est requis.',
            'password.min' => 'Le mot de passe doit comporter au moins :min caractères.',
            'adresse.required' => 'Le champ adresse est requis.',
            'numero.required' => 'Le champ numéro est requis.',
            'numero.min' => 'Le champ numéro doit comporter au moins :min caractères.'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'validation_errors' => $validator->messages(),
            ]);
        } else if (!$existingRole) {
            return response()->json([
                'status' => 404,
                'message' => 'Role "restaurateur" not found',
            ], 404);
        } else {
            $user = User::find($id);
            if (!$user) {
                return response()->json([
                    'success' => false,
                    'message' => 'Produit non trouvé',
                ], 404);
            } else {

                // Extraction de la première partie de l'e-mail du créateur
                $creatorEmailParts = explode('@', $user->email);
                $creatorPrefix = $creatorEmailParts[0];


                // Création du nouvel e-mail en utilisant le préfixe
                $newEmail = $creatorPrefix . '_' .$request->email ; // Mettre en place la variable email_domain pour définir le domaine

                // Création du nouveau nom d'utilisateur avec le préfixe approprié
                $newUsername = $creatorPrefix . '_' . $request->name;





                $newUser = User::create([
                    'name' => $newUsername,
                    'email'=> $newEmail,
                    'password'=> Hash::make($request->password),
                    'statut' => 'désactivé', // Définir le statut à "désactivé"
                    'adresse' => $request->adresse,
                    'numero' => $request->numero,
                    'role_id' => $existingRole->id, // Définir le rôle à "restaurateur"
                    'id_creator'=> $id, // Change to $id
                    'date_abonnement' => now(),
                    'date_expiration_abonnement' => $user->date_expiration_abonnement // Nouvelle donnée

                ]);
                if ($request->hasFile('photo')) {
                    $photo = $request->file('photo');
                    $filename = time() . '.' . $photo->getClientOriginalExtension();
                    $photo->storeAs('public', $filename);
                    $newUser->photo = $filename;
                }
                $newUser->save();

                $user->montant=  $user->montant + 5;
                $user->save();

                $token = $newUser->createToken($newUser->email.'_Token')->plainTextToken;

                return response()->json([
                    'status' => 200,
                    'username' => $newUser->name,
                    'id_role' => $existingRole->id,
                    'id_creator'=> $id, // Change to $id
                    'token' => $token,
                    'message' => 'added Success',
                ],200);
            }
        }
    }










    public function addUser(Request $request, $id)
    {
        $existingRole = Role::find($request->role_id);
        $validator = Validator::make($request->all(), [
            'name' => 'required',
            'email' => 'required|max:191|unique:users,email',
            'password' => 'required|min:8',
            'statut' => 'required',
            'adresse' => 'required',
            'numero' => 'required|min:8',
        ], [
            'name.required' => 'Le champ nom est requis.',
            'email.required' => 'Le champ email est requis.',
            'email.max' => 'Le champ email ne doit pas dépasser :max caractères.',
            'email.unique' => 'Cet email est déjà utilisé.',
            'password.required' => 'Le champ mot de passe est requis.',
            'password.min' => 'Le mot de passe doit comporter au moins :min caractères.',
            'statut.required' => 'Le champ statut est requis.',
            'adresse.required' => 'Le champ adresse est requis.',
            'numero.required' => 'Le champ numéro est requis.',
            'numero.min' => 'Le champ numéro doit comporter au moins :min caractères.',
            'date_abonnement.required' => 'Le champ date d\'abonnement est requis.', // Message de validation pour la nouvelle donnée
            'date_abonnement.date_format' => 'Le format de la date d\'abonnement doit être :format' // Message de validation pour le format de la nouvelle donnée
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
            $montant = ($request->role_id == 1) ? 5 : (($request->role_id == 3) ? 30 : 0);

            // Définir la date d'expiration de l'abonnement (30 minutes plus tard)
            $dateAbonnement = Carbon::parse($request->input('date_abonnement'));
            $dateExpirationAbonnement = $dateAbonnement->addMinutes(10);

            $newUser = User::create([
                'name' => $request->name,
                'email'=> $request->email,
                'password'=> Hash::make($request->password),
                'statut' => $request->statut,
                'adresse' => $request->adresse,
                'numero' => $request->numero,
                'role_id' => $request->role_id,
                'id_creator'=> $id,
                'date_abonnement' => now(),
                'date_expiration_abonnement' => $dateExpirationAbonnement, // Nouvelle donnée
                'montant' => $montant // Nouvelle colonne pour le montant

            ]);
            if ($request->hasFile('photo')) {
                $photo = $request->file('photo');
                $filename = time() . '.' . $photo->getClientOriginalExtension();
                $photo->storeAs('public', $filename);
                $newUser->photo = $filename;
            }
            $newUser->save();

            $token = $newUser->createToken($newUser->email.'_Token')->plainTextToken;

            return response()->json([
                'status' => 200,
                'username' => $newUser->name,
                'id_role' => $newUser->role_id,
                'id_creator'=> $id,
                'token' => $token,
                'message' => 'added Success',
            ],200);
        }
    }

    public function updateUser(Request $request, $id)
{
    // Find the user
    $user = User::find($id);
    if (!$user) {
        return response()->json([
            'message' => 'User not found.'
        ], 404);
    }

    // Validate the request data
    $validator = Validator::make($request->all(), [
        'name' => 'required',
        'email' => 'required|max:191|',
        'password' => 'nullable|min:8', // Password is optional for update
        'statut' => 'required',
        'adresse' => 'required',
        'numero' => 'required|min:8',
    ]);

    if ($validator->fails()) {
        return response()->json([
            'validation_errors' => $validator->messages(),
        ], 400);
    }

    // Update the user data
    $user->name = $request->name;
    $user->email = $request->email;
    if ($request->has('password')) {
        $user->password = Hash::make($request->password);
    }
    $user->statut = $request->statut;
    $user->adresse = $request->adresse;
    $user->numero = $request->numero;
    if ($request->has('date_abonnement')) {
        // Mettre à jour la date_abonnement avec la date de mise à jour
        $dateAbonnement = Carbon::parse($request->input('date_abonnement'));
        $user->update(['date_abonnement' => $dateAbonnement]);

        // Recalculer date_expiration_abonnement en ajoutant 10 minutes à la nouvelle date_abonnement
        $dateExpirationAbonnement = $dateAbonnement->addMinutes(10);
        $user->update(['date_expiration_abonnement' => $dateExpirationAbonnement]);
        User::where('id_creator', $user->id)->update(['date_abonnement' => $dateAbonnement]);
        User::where('id_creator', $user->id)->update(['date_expiration_abonnement' => $dateExpirationAbonnement]);
    }
    User::where('id_creator', $user->id)->update(['statut' => $request->statut]);




        // If photo is updated, handle it
    if ($request->hasFile('photo')) {
    $photo = $request->file('photo');
    $filename = time() . '.' . $photo->getClientOriginalExtension();
    $photo->storeAs('public', $filename);
    $user->photo = $filename;
}


    $user->save();



    // Generate a new token for the updated user
    $token = $user->createToken($user->email.'_Token')->plainTextToken;

    return response()->json([
        'status' => 200,
        'username' => $user->name,
        'id_role' => $user->role_id,
        'id_creator' => $user->id_creator,
        'token' => $token,
        'message' => 'User updated successfully.',
    ], 200);
}











    public function updateManagerUser(Request $request, $id)
    {
        // Valider les données de la requête
        $validator = Validator::make($request->all(), [
            'name' => 'required',
            'email' => 'required|max:191|unique:users,email,' . $id,
            'adresse' => 'required',
            'numero' => 'required|min:8'
        ], [
            'name.required' => 'Le champ nom est requis.',
            'email.required' => 'Le champ email est requis.',
            'email.max' => 'Le champ email ne doit pas dépasser :max caractères.',
            'email.unique' => 'Cet email est déjà utilisé.',
            'adresse.required' => 'Le champ adresse est requis.',
            'numero.required' => 'Le champ numéro est requis.',
            'numero.min' => 'Le champ numéro doit comporter au moins :min caractères.'
        ]);

        // Vérifier si la validation a échoué
        if ($validator->fails()) {
            return response()->json([
                'validation_errors' => $validator->messages(),
            ]);
        }else{


                // Trouver l'utilisateur
                $user = User::find($id);
                if (!$user) {
                    return response()->json([
                        'message' => 'Utilisateur non trouvé.'
                    ], 404);
                }

                // Extraction de la première partie de l'e-mail du créateur
                $creatorEmailParts = explode('@', $user->email);
                $creatorPrefix = $creatorEmailParts[0];

                // Vérifier si le nom ou l'email a été modifié
                if ($request->name !== $user->name || $request->email !== $user->email) {
                    // Création du nouvel e-mail en utilisant le préfixe
                    $newEmail = $creatorPrefix . '_' . $request->email; // Mettre en place la variable email_domain pour définir le domaine
                    $newUsername = $creatorPrefix . '_' . $request->name;
                } else {
                    // Garder les mêmes valeurs pour le nom et l'e-mail
                    $newEmail = $user->email;
                    $newUsername = $user->name;
                }

                // Mettre à jour l'utilisateur avec les données fournies
                $user->update([
                    'name' => $newUsername,
                    'email'=> $newEmail,
                    'password'=> Hash::make($request->password),
                    'adresse' => $request->adresse,
                    'numero' => $request->numero,
                    'date_abonnement' => $user->date_abonnement,
                    'date_expiration_abonnement' => $user->date_expiration_abonnement // Nouvelle donnée

                ]);


                 // If photo is updated, handle it
                if ($request->hasFile('photo')) {
                    $photo = $request->file('photo');
                    $filename = time() . '.' . $photo->getClientOriginalExtension();
                    $photo->storeAs('public', $filename);
                    $user->photo = $filename;
                }


                 $user->save();

                // Mettre à jour le statut des utilisateurs avec le même id_creator que l'utilisateur en cours de mise à jour

                return response()->json([
                    'message' => "Utilisateur mis à jour avec succès.",
                    'id' => $user->id
                ], 200);




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
            'email' => 'required|max:191',
            'password' => 'required'
        ], [
            'email.required' => 'Le champ email est requis.',
            'email.max' => 'Le champ email ne doit pas dépasser :max caractères.',
            'password.required' => 'Le champ mot de passe est requis.'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'validation_errors' => $validator->messages(),
            ]);
        } else {
            $user = User::where('email', $request->email)->first();

            if (!$user || !Hash::check($request->password, $user->password)) {
                return response()->json([
                    'status'=> 401,
                    'message'=> 'Invalid Credentials',
                ]);
            } else {
                // Set the default value of last_used_at before creating the token
                $lastUsedAt = now();

                if ($user->role->name_role === "admin") {
                    $token = $user->createToken($user->email.'_AdminToken', ['server:admin'])->plainTextToken;
                } else {
                    $token = $user->createToken($user->email.'_Token', ['restauratuer'])->plainTextToken;
                }

                // Update last_used_at only if the token was just created
                $tokenModel = $user->tokens()->where('name', $user->email.'_Token')->latest()->first();
                if ($tokenModel && $tokenModel->created_at == $tokenModel->updated_at) {
                    $tokenModel->update(['last_used_at' => $lastUsedAt]);
                }

                return response()->json([
                    'status' => 200,
                    'username' => $user->name,
                    'id' => $user->id ,
                    'token' => $token ,
                    'photo' => $user->photo ,
                    'email' => $user->email ,
                    'message' => 'Logged Success',
                    'role' => $user->role->name_role ,
                    'statut' => $user->statut,
                ]);
            }
        }
    }



    public function logout(Request $request){

        $request -> user() -> currentAccessToken() -> delete();
        return response() -> json([
            'status' => 200 ,
            'message'=> 'Logged out Successfully',
        ]);


    }




    //
}
