
'use server';

import type { SubscriptionPlan } from '@/lib/types';
import { allPlans as staticPlans } from '@/data/plans';

// In a real app, you would fetch this from a database
// For now, we simulate an async fetch from our static data

export async function getAllPlans(): Promise<SubscriptionPlan[]> {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 500));
    return Promise.resolve(staticPlans);
}

    