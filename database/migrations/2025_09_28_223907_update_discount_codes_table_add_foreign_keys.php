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
            // First, rename the old type column to avoid conflicts
            $table->renameColumn('type', 'old_type');
            
            // Add the new columns
            $table->enum('new_type', ['percentage', 'fixed'])->default('percentage');
            $table->decimal('value', 8, 2);
            $table->foreignId('newsletter_subscription_id')->nullable()->constrained('newsletter_subscriptions')->onDelete('set null');
            $table->foreignId('user_id')->nullable()->constrained()->onDelete('set null');
            $table->boolean('is_used')->default(false);
        });
        
        // Update the column after renaming
        Schema::table('discount_codes', function (Blueprint $table) {
            // Drop old columns
            $table->dropColumn(['old_type', 'discount_percentage', 'discount_amount', 'usage_limit']);
            
            // Rename the new type column to 'type'
            $table->renameColumn('new_type', 'type');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('discount_codes', function (Blueprint $table) {
            $table->dropColumn(['newsletter_subscription_id', 'user_id', 'is_used', 'value', 'type']);
            
            $table->decimal('discount_percentage', 5, 2)->nullable();
            $table->decimal('discount_amount', 8, 2)->nullable();
            $table->enum('type', ['one_time', 'recurring', 'first_time'])->default('one_time');
            $table->unsignedInteger('usage_limit')->nullable();
        });
    }
};
