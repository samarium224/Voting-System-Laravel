<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class AdminSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Create the admin user
        $admin = User::create([
            'name' => 'BME_Admin',
            'student_id' => '202126000',
            'email'=> 'bme.admin@einthovenclub.com',
            'can_vote' => false,
            'password'=> bcrypt('admin.einthovenclub@3s!$'),
            'email_verified_at'=> now(), // Assuming email is verified upon registration
        ]);

        // Assign the 'admin' role to the admin user
        $admin->addRole('administrator');
    }
}
