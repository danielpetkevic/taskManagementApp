<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreUserRequest;
use App\Http\Requests\UpdateUserRequest;
use App\Http\Resources\UsersCrudResource;
use App\Models\User;
use Illuminate\Http\RedirectResponse;
use Inertia\Response;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(): Response
    {
        $query = User::query();

        $sort_field = request('sort_field', 'created_at');
        $sort_direction = request('sort_direction', 'desc');

        if (request('name')) {
            $query->where('name', 'like', '%'.request('name').'%');
        }

        if (request('email')) {
            $query->where('email', request('email'));
        }

        $users = $query->orderBy($sort_field, $sort_direction)->paginate(10)->onEachSide(5);

        return inertia('User/Index', [
            'users' => UsersCrudResource::collection($users),
            'queryParams' => request()->query() ?: null,
            'success' => session('success'),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(): Response
    {
        return inertia('User/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreUserRequest $request): RedirectResponse
    {
        $data = $request->validated();

        $data['email_verified_at'] = time();
        $data['password'] = bcrypt($data['password']);

        $user = User::create($data);

        return redirect()->route('user.show', $user)->with('success', 'User created successfully.');
    }

    /**
     * Display the specified resource.
     */
    public function show(User $user): Response
    {
        return inertia('User/Show', [
            'user' => new UsersCrudResource($user),
            'success' => session('success'),
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(User $user): Response
    {
        return inertia('User/Edit', [
            'user' => new UsersCrudResource($user),
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateUserRequest $request, User $user): RedirectResponse
    {
        $data = $request->validated();

        $password = $data['password'] ?? null;

        if ($password) {
            $data['password'] = bcrypt($password);
        } else {
            unset($data['password']);
        }

        $user->update($data);
        $name = $user->name;

        return redirect()->route('user.show', $user)->with('success', "$name updated successfully.");
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(User $user): RedirectResponse
    {
        $name = $user->name;
        $user->delete();

        return redirect()->route('user.index')->with('success', "$name deleted successfully.");
    }
}
