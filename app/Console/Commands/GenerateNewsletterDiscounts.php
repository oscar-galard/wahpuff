<?php

namespace App\Console\Commands;

use App\Models\DiscountCode;
use Illuminate\Console\Command;

class GenerateNewsletterDiscounts extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'app:generate-newsletter-discounts';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Create a single hardcoded discount code for newsletter subscribers';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        // Create a single hardcoded discount code for newsletter subscribers
        DiscountCode::updateOrCreate(
            ['code' => 'WELCOME25'],
            [
                'type' => 'percentage',
                'value' => 25,
                'expires_at' => now()->addMonths(3), // Valid for 3 months
                'is_used' => false
            ]
        );

        $this->info("Successfully created the hardcoded discount code 'WELCOME25' with 25% discount.");
        $this->info("Discount prices (approximate):");
        $this->info("- Descubre: \$399 → \$299");
        $this->info("- Impulsa: \$699 → \$524");
        $this->info("- Domina: \$999 → \$749");
    }
}
