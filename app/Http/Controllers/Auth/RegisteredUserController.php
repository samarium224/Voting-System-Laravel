<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\GlobalStats;
use App\Models\User;
use App\Providers\RouteServiceProvider;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules;
use Inertia\Inertia;
use Inertia\Response;

class RegisteredUserController extends Controller
{
    /**
     * Display the registration view.
     */
    public function create(): Response
    {
        return Inertia::render('Auth/Register');
    }

    /**
     * Handle an incoming registration request.
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    public function store(Request $request): RedirectResponse
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'student_id' => 'required|integer|unique:users,student_id',
            'level' => ['required', 'integer', 'regex:/^[1-4]$/'],
            'email' => 'nullable|string|lowercase|email|max:255|unique:' . User::class,
            'password' => ['required', 'confirmed', Rules\Password::defaults()],
        ], [
            'level.regex' => 'The level must be a single digit between 1 and 4',
        ]);

        // If GlobalStats has data and user is NOT authenticated or not an admin
        if (GlobalStats::exists() && (!Auth::check() || !Auth::user()->hasRole('administrator'))) {
            return redirect()->route('register')->withErrors([
                'registration' => 'Public registration is closed. Contact admin.',
            ]);
        }

        $user = User::create([
            'name' => $request->name,
            'student_id' => $request->student_id,
            'level' => $request->level,
            'email' => $request->email,
            'password' => Hash::make($request->password),
        ]);

        event(new Registered($user));

        Auth::login($user);

        return redirect(RouteServiceProvider::HOME);
    }
}
