<?php

namespace Database\Factories;

use App\Models\Task;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Storage;

/**
 * @extends Factory<Task>
 */
class TaskFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $imageId = fake()->uuid();
        $imagePath = 'task-seeded/'.$imageId.'.jpg';
        $imageResponse = Http::timeout(10)->get('https://picsum.photos/seed/'.$imageId.'/640/426');

        if ($imageResponse->successful()) {
            Storage::disk('public')->put($imagePath, $imageResponse->body());
        } else {
            $imagePath = 'task-seeded/'.fake()->uuid().'.svg';
            Storage::disk('public')->put($imagePath, file_get_contents(public_path('placeholder.svg')));
        }

        return [
            'name' => fake()->randomElement([
                'Prepare project brief',
                'Review design mockups',
                'Set up development environment',
                'Implement user authentication',
                'Test responsive layouts',
                'Prepare release notes',
                'Deploy staging build',
            ]),
            'description' => fake()->randomElement([
                'Complete the work, document the result, and share any blockers with the project team.',
                'Review the requirements with the relevant stakeholders and confirm the acceptance criteria.',
                'Verify the implementation on supported devices and record any issues that need follow-up.',
                'Make the change ready for review by including tests, screenshots, and a short implementation summary.',
            ]),
            'due_date' => fake()->dateTimeBetween('now', '+1 year'),
            'status' => fake()->randomElement(['pending', 'in_progress', 'completed']),
            'priority' => fake()->randomElement(['low', 'medium', 'high']),
            'image_path' => $imagePath,
            'assigned_user_id' => 1,
            'created_by' => 1,
            'updated_by' => 1,
        ];
    }
}
