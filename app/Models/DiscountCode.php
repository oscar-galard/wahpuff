<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class DiscountCode extends Model
{
    protected $fillable = [
        'code',
        'discount_percentage',
        'discount_amount',
        'type',
        'expires_at',
        'usage_limit',
    ];

    protected $dates = ['expires_at'];

    public function isValid(): bool
    {
        if ($this->expires_at && $this->expires_at->isPast()) {
            return false;
        }

        return true;
    }
}
