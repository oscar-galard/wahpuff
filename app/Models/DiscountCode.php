<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class DiscountCode extends Model
{
    protected $fillable = [
        'code',
        'type',
        'value',
        'newsletter_subscription_id',
        'user_id',
        'is_used',
        'expires_at',
    ];

    protected $casts = [
        'value' => 'float',
        'is_used' => 'boolean',
        'expires_at' => 'datetime',
    ];

    public function newsletterSubscription(): BelongsTo
    {
        return $this->belongsTo(NewsletterSubscription::class);
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function isValid(): bool
    {
        if ($this->is_used) {
            return false;
        }

        if ($this->expires_at && $this->expires_at->isPast()) {
            return false;
        }

        return true;
    }
}
