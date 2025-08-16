<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\Admin\AuthController;


Route::get('/login', [AuthController::class, 'login'])
    ->name('admin.login');

Route::post('/login', [AuthController::class, 'loginPost']);


Route::group(['middleware' => ['admin']], function () {

    //dashboard
    Route::get('/', function () {
        return Inertia::render('AdminPortal/Dashboard');
    })->name('admin.dashboard');


    //logout route
    Route::post('/logout', [AuthController::class, 'logout'])
        ->name('admin.logout');

});