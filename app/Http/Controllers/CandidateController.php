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

            Candidate::where("id", $candidate_id)->increment("got_votes", 1);
            GlobalStats::where("id", 1)->increment("total_votes", 1);
            User::where("id", Auth::user()->id)->update(['can_vote' => 0]);
            return Redirect::route('poll.results');
        } else {
            return Redirect::route('poll.results');
        }
    }

    public function loadResults()
    {
        $poll_state = GlobalStats::select("is_active")->first();
        $candidates = Candidate::orderBy('got_votes', 'desc')->get()->toArray();
        $status = GlobalStats::first()->toArray();

        if ($poll_state->is_active) {
            return Inertia::render('WaitingRoom');
        } else {
            return Inertia::render('VoteResultPage', [
                'candidates_info' => $candidates,
                'app_status' => $status,
            ]);
        }
    }

}
