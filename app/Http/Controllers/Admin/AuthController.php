<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Auth;
use Inertia\Inertia;

class AuthController extends Controller
{
    public function login()
    {
        return Inertia::render('AdminPortal/Auth/Login');
    }

    public function loginPost(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
            'password' => 'required',
        ]);

        if (!Auth::attempt($request->only('email', 'password'))) {
            return redirect()->back()
                ->with('error', 'Invalid credentials');
        }

        return redirect()->route('admin.dashboard')
            ->with('success', 'Login successful');
    }

    public function logout()
    {
        Auth::logout();
        return redirect()->route('admin.login')
            ->with('success', 'Logout successful');
    }
}
