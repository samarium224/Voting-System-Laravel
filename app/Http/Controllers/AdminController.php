<?php

namespace App\Http\Controllers;

use App\Models\Candidate;
use App\Models\User;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules;
use Inertia\Inertia;
use Redirect;

class AdminController extends Controller
{
    //main
    public function index()
    {
        return Inertia::render('AdminPage', ['isAdmin' => true]);
    }

    public function loadusers()
    {
        return response()->json(User::all());
    }

    public function addNewUser()
    {
        return Inertia::render('Admin/AdminCreateVoter', ['isAdmin' => true]);
    }

    public function store(Request $request): RedirectResponse
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'student_id' => 'required|integer|unique:users,student_id',
            'email' => 'nullable|string|lowercase|email|max:255|unique:' . User::class,
            'password' => ['required', 'confirmed', Rules\Password::defaults()],
        ]);

        $user = User::create([
            'name' => $request->name,
            'student_id' => $request->student_id,
            'email' => $request->email,
            'password' => Hash::make($request->password),
        ]);

        return Redirect::route('admin.dashboard');
    }

    public function candidates()
    {
        return Inertia::render('Admin/AdminCreateCandidates', ['isAdmin' => true]);
    }

    public function storecandidate(Request $request){
        $request->validate([
            'name' => 'required|string|max:255',
            'details' => 'nullable|string',
        ]);

        $candidate = Candidate::create([
            'name' => $request->name,
            'details' => $request->details,
        ]);

        return Redirect::route('admin.dashboard');
    }

    public function loadcandidate(){
        return response()->json(Candidate::all());
    }
}
