<?php

namespace App\Http\Controllers;

use App\Models\Candidate;
use App\Models\GlobalStats;
use App\Models\User;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules;
use Inertia\Inertia;
use Redirect;
use Auth;

class AdminController extends Controller
{
    //main
    public function index()
    {
        return Inertia::render('AdminPage', ['isAdmin' => true]);
    }

    public function loadusers()
    {
        $users = User::where('id', '!=', 1)->orderBy('level', 'desc')->get();


        return response()->json($users);
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
            'level' => ['required', 'integer', 'regex:/^[1-4]$/'],
            'email' => 'nullable|string|lowercase|email|max:255|unique:' . User::class,
            'password' => ['required', 'confirmed', Rules\Password::defaults()],
        ], [
            'level.regex' => 'The level must be a single digit between 1 and 4',
        ]);

        $user = User::create([
            'name' => $request->name,
            'student_id' => $request->student_id,
            'level' => $request->level,
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

    // ✅ Toggle voting status
    public function toggleUserVote($id)
    {
        $user = User::findOrFail($id);
        $user->can_vote = !$user->can_vote;
        $user->save();

        return redirect()->back()->with('success', 'Voting status updated.');
    }

    // ✅ Delete a voter
    public function destroyVoter($id)
    {
        $user = User::findOrFail($id);
        $user->delete();

        return redirect()->back()->with('success', 'User deleted.');
    }

    // voting control
    public function viewVoteControl(){
        return Inertia::render('Admin/VotingControl', ['isAdmin' => true]);
    }

    public function loadglobalstats(){
        return response()->json(GlobalStats::all());
    }

     public function activateNewVotingController(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
        ]);

        // Create a new voting controller
        $newController = GlobalStats::create([
            'election_name' => $request->name,
            'is_active' => false,
            'total_votes' => 0,
        ]);

        return redirect()->back();
    }

    public function toggleVoteCon($id){
        $voteController = GlobalStats::findOrFail($id);
        $voteController->is_active = !$voteController->is_active;
        $voteController->save();

        return redirect()->back()->with('success', 'Controller status updated.');
    }

    public function destroyVoteCon($id){
        $voteController = GlobalStats::findOrFail($id);
        $voteController->delete();

        User::query()->update(['poll_room' => 0]);
        Candidate::query()->delete();

        return redirect()->back()->with('success', 'Voting Controller deleted.');
    }

    public function activateAllUserVote(){
        User::query()->update(values: ['can_vote' => 1]);

        return redirect()->back()->with('success', 'All Users Can Vote.');
    }

    public function deactivateAllUserVote(){
        User::query()->update(values: ['can_vote' => 0]);

        return redirect()->back()->with('success', 'All Users Disabled From Voting.');
    }
}
