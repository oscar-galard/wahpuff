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
        Schema::table('discount_codes', function (Blueprint $table) {
            // Add value column if it doesn't exist
            if (!Schema::hasColumn('discount_codes', 'value')) {
                $table->decimal('value', 8, 2)->nullable();
            }
            // Add newsletter_subscription_id column if it doesn't exist
            if (!Schema::hasColumn('discount_codes', 'newsletter_subscription_id')) {
                $table->foreignId('newsletter_subscription_id')->nullable();
            }
            // Add user_id column if it doesn't exist
            if (!Schema::hasColumn('discount_codes', 'user_id')) {
                $table->foreignId('user_id')->nullable();
            }
            // Add is_used column if it doesn't exist
            if (!Schema::hasColumn('discount_codes', 'is_used')) {
                $table->boolean('is_used')->default(false);
            }
        });
        
        // Add foreign key constraints after columns are created
        Schema::table('discount_codes', function (Blueprint $table) {
            if (!Schema::hasColumn('discount_codes', 'newsletter_subscription_id')) {
                $table->foreign('newsletter_subscription_id')->references('id')->on('newsletter_subscriptions')->onDelete('set null');
            }
            if (!Schema::hasColumn('discount_codes', 'user_id')) {
                $table->foreign('user_id')->references('id')->on('users')->onDelete('set null');
            }
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('discount_codes', function (Blueprint $table) {
            $table->dropForeign(['newsletter_subscription_id']);
            $table->dropForeign(['user_id']);
            $table->dropColumn(['newsletter_subscription_id', 'user_id', 'is_used', 'value']);
        });
    }
};
