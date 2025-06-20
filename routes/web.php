<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function(){
    return Inertia::render('AdminPortal/Dashboard');
})->name('admin.dashboard');

Route::get('/login', function(){
    return Inertia::render('AdminPortal/Auth/Login');
})->name('admin.login');

Route::post('/login', function(){
    return 'handle Login POST request';
});
