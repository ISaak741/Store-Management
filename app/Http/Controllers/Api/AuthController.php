<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    public function login(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|exists:users,name|min:8',
            'password' => 'required'
        ]);

        if (!Auth::attempt($validated))
            return response()->json([
                'success' => false,
                'message' => 'invalid credentials'
            ], 404);

        $user = Auth::user();
        $user->tokens()->delete();
        $token = $user->createToken('token-api')->plainTextToken;

        return response()->json([
            'success' => true,
            'user' => [
                'id' => $user->id,
                'name' => $user->name
            ],
            'message' => 'valid credentials',
            'token' => $token
        ], 200);
    }
    public function register(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|unique:users,name|min:8',
            'email' => 'required|unique:users,email|email',
            'password' => 'required'
        ]);

        $validated['password'] = Hash::make($validated['password']);
        $user = User::create($validated);
        $user->tokens()->delete();
        $token = $user->createToken('token-api')->plainTextToken;

        return response()->json([
            'success' => true,
            'user' => [
                'id' => $user->id,
                'name' => $user->name
            ],
            'message' => 'user account has been created',
            'token' => $token
        ], 201);
    }
    public function logout(Request $request)
    {
        $user = Auth::user();
        Auth::logout();
        $user->tokens()->delete();
        return response()->json([
            'success' => true,
            'message' => 'good bye'
        ], 200);
    }
}
