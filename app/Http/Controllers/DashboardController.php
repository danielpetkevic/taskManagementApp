<?php

namespace App\Http\Controllers;

use App\Http\Resources\TaskResource;
use App\Models\Task;
use Inertia\Response;

class DashboardController extends Controller
{
    public function index(): Response
    {
        $user = auth()->user();

        $myPendingTasksCount = Task::query()
            ->where('assigned_user_id', $user->id)
            ->where('status', 'pending')
            ->count();

        $myInProgressTasksCount = Task::query()
            ->where('assigned_user_id', $user->id)
            ->where('status', 'in_progress')
            ->count();

        $myCompletedTasksCount = Task::query()
            ->where('assigned_user_id', $user->id)
            ->where('status', 'completed')
            ->count();

        $query = Task::query()
            ->where('assigned_user_id', $user->id)
            ->whereIn('status', ['pending', 'in_progress']);

        $sort_field = request('sort_field', 'created_at');
        $sort_direction = request('sort_direction', 'desc');

        if (request('name')) {
            $query->where('name', 'like', '%'.request('name').'%');
        }

        if (request('status')) {
            $query->where('status', request('status'));
        }

        $tasks = $query->orderBy($sort_field, $sort_direction)->paginate(10)->onEachSide(5);

        return inertia('Dashboard', [
            'user' => $user,
            'tasks' => TaskResource::collection($tasks),
            'queryParams' => request()->query() ?: null,
            'myPendingTasksCount' => $myPendingTasksCount,
            'myInProgressTasksCount' => $myInProgressTasksCount,
            'myCompletedTasksCount' => $myCompletedTasksCount,
        ]);
    }
}
