<?php

namespace App\Http\Controllers;

use App\Models\Personnel;
use App\Models\TypePersonnel;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Log;

class PersonnelController extends Controller
{
    public function personnel()
    {
        $personnels = Personnel::with('typePersonnel')->get();
        return response()->json($personnels);
    }

    public function addPersonnel(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'num_telephone' => 'nullable|string|max:255',
            'salaire' => 'required|numeric',
            'type_personnel_id' => 'exists:type_personnels,id'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'validation_errors' => $validator->messages(),
            ], 422);
        }

        $personnel = Personnel::create($request->all());

        return response()->json([
            'status' => 200,
            'personnel' => $personnel,
            'message' => 'Personnel successfully added',
        ], 200);
    }

    public function updatePersonnel(Request $request, $id)
    {
        $personnel = Personnel::find($id);
        if (!$personnel) {
            return response()->json(['message' => 'Personnel not found'], 404);
        }

        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'num_telephone' => 'nullable|string|max:255',
            'salaire' => 'required|numeric',
            'type_personnel_id' => 'exists:type_personnels,id'
        ]);

        if ($validator->fails()) {
            return response()->json(['validation_errors' => $validator->messages()], 422);
        }

        $personnel->update($request->all());
        return response()->json([
            'message' => 'Personnel successfully updated',
            'personnel' => $personnel,
        ], 200);
    }
    public function getSalaryOverview(Request $request)
    {
        $groupBy = $request->input('groupBy', 'month'); // Default to month

        switch ($groupBy) {
            case 'day':
                $format = '%Y-%m-%d';
                break;
            case 'week':
                $format = '%X-%V';
                break;
            case 'month':
            default:
                $format = '%Y-%m';
                break;
        }

        $salaries = Personnel::selectRaw("DATE_FORMAT(created_at, '$format') as period, SUM(salaire) as totalSalary")
                             ->groupBy('period')
                             ->orderBy('period', 'asc')
                             ->get();

        return response()->json($salaries);
    }

    public function showPersonnel($id)
{
    $personnel = Personnel::with('typePersonnel')->find($id);
    if (!$personnel) {
        return response()->json(['message' => 'Personnel not found'], 404);
    }

    // Transform the data to include the type personnel's name
    $response = [
        'id' => $personnel->id,
        'name' => $personnel->name,
        'num_telephone' => $personnel->num_telephone,
        'salaire' => $personnel->salaire,
        'nom' => $personnel->typePersonnel ? $personnel->typePersonnel->nom : 'Not Defined', // Make sure 'name' is the correct field
    ];

    return response()->json($response, 200);
}
    public function deletePersonnel($id)
    {
        $personnel = Personnel::find($id);
        if (!$personnel) {
            return response()->json(['message' => 'Personnel not found'], 404);
        }

        $personnel->delete();
        return response()->json(['message' => 'Personnel successfully deleted'], 200);
    }
}
