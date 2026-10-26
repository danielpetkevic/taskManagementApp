<?php

namespace Database\Seeders;

use App\Models\Project;
use App\Models\Task;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Storage;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        Storage::disk('public')->deleteDirectory('project-seeded');
        Storage::disk('public')->deleteDirectory('task-seeded');

        $password = Hash::make('password');

        User::factory()->create([
            'name' => 'Daniel',
            'email' => 'daniel@example.com',
            'password' => $password,
            'email_verified_at' => time(),
        ]);

        User::factory()->createMany([
            [
                'name' => 'Alice Johnson',
                'email' => 'alice@example.com',
                'password' => $password,
                'email_verified_at' => now(),
            ],
            [
                'name' => 'Bob Williams',
                'email' => 'bob@example.com',
                'password' => $password,
                'email_verified_at' => now(),
            ],
            [
                'name' => 'Chloe Brown',
                'email' => 'chloe@example.com',
                'password' => $password,
                'email_verified_at' => now(),
            ],
            [
                'name' => 'David Miller',
                'email' => 'david@example.com',
                'password' => $password,
                'email_verified_at' => now(),
            ],
            [
                'name' => 'Emma Davis',
                'email' => 'emma@example.com',
                'password' => $password,
                'email_verified_at' => now(),
            ],
        ]);

        $users = User::all();

        foreach ($users as $user) {
            Project::factory()
                ->count(3)
                ->state([
                    'created_by' => $user->id,
                    'updated_by' => $user->id,
                ])
                ->has(
                    Task::factory()
                        ->count(3)
                        ->state([
                            'assigned_user_id' => $user->id,
                            'created_by' => $user->id,
                            'updated_by' => $user->id,
                        ])
                )
                ->create();
        }
    }
}
