<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class GlobalStats extends Model
{
    use HasFactory;

    protected $fillable = [
        "election_name",
        "is_active",
        "total_votes"
    ];
}
