<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('users', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->unsignedInteger('student_id')->unique();
            $table->integer('level')->default(4);
            $table->string('email')->unique()->nullable()->default(' ');
            $table->timestamp('email_verified_at')->nullable();
            $table->string('password');
            $table->integer('poll_room')->nullable()->default(0);
            $table->boolean('can_vote')->default(1);
            $table->rememberToken();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('users');
    }
};
