<?php

namespace App\Http\Controllers;
use App\Models\Carte;
use Illuminate\Http\Request;


class CarteController extends Controller
{
    public function index()
    {
        $carte = Carte::with(['categorie', 'produit'])->get();
        return response()->json($carte);
    }

    public function store(Request $request)
    {
        $carte = Carte::create($request->all());
        return response()->json(['message' => 'Carte created successfully', 'carte' => $carte]);
    }

    public function show($id)
    {
        $carte = Carte::findOrFail($id);
        return response()->json($carte);
    }


    public function update(Request $request, $id)
        {
            try {

                $carte = Carte::find($id);
                if(!$carte){
                    return response()->json([
                       'message'=>'Carte introuvable.'
                    ],404);
                }


                $carte->update($request->all());

                return response()->json([
                    'message' => "Carte successfully updated."
                ],200);
            } catch (\Exception $e) {

                return response()->json([
                    'message' => "Something went really wrong!"
                ],500);
            }
        }

    public function destroy($id)
    {
        Carte::destroy($id);
        return response()->json(['message' => 'Carte deleted successfully']);
    }
}
