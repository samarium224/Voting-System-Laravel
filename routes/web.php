<?php

use App\Http\Controllers\AdminController;
use App\Http\Controllers\CandidateController;
use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/candidates', [CandidateController::class, 'index']);
Route::post('/poll-submit', [CandidateController::class, 'submit'])->name('poll.submit');
Route::get('/vote-results', [CandidateController::class, 'loadResults'])->name('poll.results');

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

Route::middleware(['auth', 'role:administrator'])->group(function () {
    Route::get('dashboard/admin', [AdminController::class,'index'])->name('admin.dashboard');

    Route::get('/users', [AdminController::class, 'loadusers'])->name('view.users');
    Route::post('/users_store', [AdminController::class, 'store'])->name('store.user');
    Route::get('/users_register_view', [AdminController::class, 'addNewUser'])->name('create.users');

    //candidate
    Route::get('/candidate_users', [AdminController::class, 'loadcandidate'])->name('view.candidates');
    Route::get('candidate', [AdminController::class, 'candidates'])->name('create.candidate');
    Route::post('/candidate-store', [AdminController::class, 'storecandidate'])->name('store.candidate');
});

require __DIR__ . '/auth.php';
