<?php

namespace App\Http\Controllers;

use App\Events\PublicChannelEvent;
use Illuminate\Http\Request;

class VotingEventController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(Request $request)
    {
        //broadcast the event

        // broadcast(new PublicChannelEvent('Voting has started!'));
    }
}
