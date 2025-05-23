<?php

namespace App\Http\Controllers;

use App\Models\Candidate;
use App\Models\GlobalStats;
use App\Models\User;
use Auth;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Redirect;

class CandidateController extends Controller
{
    public function index()
    {
        Auth::user()->can_vote ? $candidates = Candidate::all() : $candidates = [];

        return response()->json($candidates);
    }

    public function submit(Request $request): RedirectResponse
    {
        if (Auth::user()->can_vote) {

            $candidate_id = $request->candidate;
            $poll_room_id = Auth::user()->poll_room;

            $vote_active_status = GlobalStats::where('id', $poll_room_id)->value('is_active');

            User::where("id", Auth::user()->id)->update(['can_vote' => 0]);
            if ($vote_active_status == false) {
                return Redirect::route('poll.results', with(['error' => 'Voting has closed. Unfortunately, we are unable to count your vote.']));
            } else {
                Candidate::where("id", $candidate_id)->increment("got_votes", 1);
                GlobalStats::where("id", $poll_room_id)->increment("total_votes", 1);

                return Redirect::route('poll.results');
            }
        } else {
            return Redirect::route('poll.results');
        }
    }

    public function JoinRoom(Request $request)
    {
        $room_id = $request->id;

        User::where("id", Auth::user()->id)->update(['poll_room' => $room_id]);
        Inertia::render('Dashboard');

    }

    public function UserEndLoadGlobalStats()
    {
        return response()->json(
            GlobalStats::select('id', 'election_name', 'is_active')->get()
        );
    }

    public function loadResults(Request $request)
    {
        $error = $request->error;
        $poll_state = GlobalStats::select("is_active")->first();
        $candidates = Candidate::orderBy('got_votes', 'desc')->get()->toArray();
        $status = GlobalStats::first()->toArray();

        if ($poll_state->is_active) {
            return Inertia::render('WaitingRoom');
        } else {
            return Inertia::render('VoteResultPage', [
                'candidates_info' => $candidates,
                'app_status' => $status,
                'error' => $error,
            ]);
        }
    }

}
