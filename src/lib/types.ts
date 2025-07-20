

import type { LucideIcon } from "lucide-react";
import type { User as PrismaUser, Job as PrismaJob, Application as PrismaApplication, CompanyProfile as PrismaCompanyProfile } from '@prisma/client';

export type Job = Omit<PrismaJob, 'skills' | 'customQuestions'> & {
    skills: string[];
    customQuestions: string[];
};

export type User = PrismaUser & {
    subscriptionPlan?: string | null;
    subscriptionUntil?: string | null;
};

export type CustomAnswer = {
    question: string;
    answer: string;
};

export type Application = Omit<PrismaApplication, 'customAnswers'> & {
    customAnswers?: CustomAnswer[];
};

export type CompanyProfile = PrismaCompanyProfile;


export type UserApplication = {
    id: string;
    title: string;
    company: string;
    status: 'En revisión' | 'Contactado' | 'Rechazado';
    appliedDate: string;
};

export type UserStats = {
    profileViews: number;
    interviews: number;
};

// Tipo específico para los datos del perfil del trabajador
export type UserProfileData = {
    applications: Application[];
    savedJobs: Job[];
    stats: UserStats;
}

export type Candidate = User & {
    appliedFor: string;
    customAnswers?: CustomAnswer[];
};

export type Transaction = {
    id: string;
    user: {
        name: string;
        email: string;
        avatar?: string;
    };
    plan: string;
    status: 'Pagado' | 'Pendiente' | 'Fallido';
    amount: number;
    date: string;
};

export type PaymentMetrics = {
    totalRevenue: number;
    monthlyRecurringRevenue: number;
    activeSubscriptions: number;
    churnRate: number;
    revenueByMonth: { month: string; revenue: number }[];
    planDistribution: { name: string; value: number; fill: string }[];
};

export type PricingOption = {
  duration: 'monthly' | 'quarterly' | 'semi-annually';
  price: string;
  priceDetail: string;
  priceAmount: number;
  discount?: string;
  features: string[];
};

export type SubscriptionPlan = {
  name: string;
  userType: 'worker' | 'company';
  isPopular?: boolean;
  description: string;
  iconName: keyof typeof import('lucide-react').icons;
  pricing: PricingOption[];
};
