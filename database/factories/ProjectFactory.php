<?php

namespace Database\Factories;

use App\Models\Project;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Storage;

/**
 * @extends Factory<Project>
 */
class ProjectFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $imageId = fake()->uuid();
        $imagePath = 'project-seeded/'.$imageId.'.jpg';
        $imageResponse = Http::timeout(10)->get('https://picsum.photos/seed/'.$imageId.'/640/426');

        if ($imageResponse->successful()) {
            Storage::disk('public')->put($imagePath, $imageResponse->body());
        } else {
            $imagePath = 'project-seeded/'.fake()->uuid().'.svg';
            Storage::disk('public')->put($imagePath, file_get_contents(public_path('placeholder.svg')));
        }

        return [
            'name' => fake()->randomElement([
                'Website Redesign',
                'Mobile App Launch',
                'Customer Portal Upgrade',
                'Marketing Campaign',
                'Inventory System Migration',
                'Operations Dashboard',
            ]),
            'description' => fake()->randomElement([
                'Plan and deliver the next phase of the product with clear milestones, ownership, and release criteria.',
                'Coordinate design, development, testing, and launch activities for the new customer experience.',
                'Improve the current workflow by reducing manual steps and giving the team better visibility into progress.',
                'Prepare a reliable release that meets the agreed business goals and provides measurable value to users.',
            ]),
            'due_date' => fake()->dateTimeBetween('now', '+1 year'),
            'status' => fake()->randomElement(['pending', 'in_progress', 'completed']),
            'image_path' => $imagePath,
            'created_by' => 1,
            'updated_by' => 1,
        ];
    }
}
