<?php

namespace App\Http\Controllers;

use App\Models\DiscountCode;
use App\Models\NewsletterSubscription;
use App\Models\Plan;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Validator;

class DiscountCodeController extends Controller
{
    public function validateDiscountCode(Request $request): JsonResponse
    {
        $validator = Validator::make($request->all(), [
            'code' => 'required|string|max:255',
            'plan_id' => 'required|exists:plans,id',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Invalid input',
                'errors' => $validator->errors()
            ], 422);
        }

        $code = $request->input('code');
        $planId = $request->input('plan_id');

        $discountCode = DiscountCode::where('code', $code)->first();

        if (!$discountCode) {
            return response()->json([
                'success' => false,
                'message' => 'Invalid discount code'
            ], 404);
        }

        if (!$discountCode->isValid()) {
            return response()->json([
                'success' => false,
                'message' => 'Discount code is invalid or has expired'
            ], 400);
        }

        $plan = Plan::findOrFail($planId);

        // Calculate the discounted price
        $originalPrice = $plan->price;
        $discountedPrice = $originalPrice;

        if ($discountCode->type === 'percentage') {
            $discountedPrice = $originalPrice - ($originalPrice * ($discountCode->value / 100));
        } elseif ($discountCode->type === 'fixed') {
            $discountedPrice = max(0, $originalPrice - $discountCode->value);
        }

        return response()->json([
            'success' => true,
            'discount_code' => $discountCode,
            'original_price' => $originalPrice,
            'discounted_price' => number_format($discountedPrice, 2, '.', ''),
            'discount_amount' => number_format($originalPrice - $discountedPrice, 2, '.', ''),
            'plan' => $plan
        ]);
    }
    
    public function markAsUsed(Request $request): JsonResponse
    {
        $validator = Validator::make($request->all(), [
            'code' => 'required|string|max:255',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Invalid input',
                'errors' => $validator->errors()
            ], 422);
        }

        $code = $request->input('code');

        $discountCode = DiscountCode::where('code', $code)->first();

        if (!$discountCode) {
            return response()->json([
                'success' => false,
                'message' => 'Discount code not found'
            ], 404);
        }

        // Mark as used
        $discountCode->update(['is_used' => true]);

        return response()->json([
            'success' => true,
            'message' => 'Discount code marked as used'
        ]);
    }
}
