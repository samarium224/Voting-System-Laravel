<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class VoiceAssistController extends Controller
{
    //return the main page
    public function index(){
        return view('voice-assist.index');
    }
}
