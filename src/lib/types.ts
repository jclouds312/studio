
import type { LucideIcon } from "lucide-react";

export type Job = {
    id: string;
    title: string;
    company: string;
    location: string;
    type: 'Full-time' | 'Part-time' | 'Contract' | 'Changa';
    description: string;
    companyLogo: string;
    category: 'tech' | 'design' | 'marketing' | 'sales' | 'domestic' | 'construction' | 'admin' | 'gastronomy' | 'health' | 'education' | 'other' | 'hr' | 'finance' | 'legal' | 'logistics';
    isFeatured?: boolean;
    isNew?: boolean;
    whatsapp?: string;
};

export type UserApplication = {
    id: string;
    title: string;
    company: string;
    status: 'En revisión' | 'Contactado' | 'Rechazado';
};

export type UserStats = {
    profileViews: number;
    interviews: number;
    savedJobs: number;
};

// Tipo específico para los datos del perfil del trabajador
export type UserProfileData = {
    avatarUrl: string;
    phone: string;
    location: string;
    professionalSummary: string;
    experience: string;
    applications: UserApplication[];
    savedJobs: Job[];
    stats: UserStats;
}

export type User = {
    id: string;
    name: string;
    email: string;
    password?: string;
    avatar?: string;
    phone?: string;
    location?: string;
    role: 'admin' | 'user' | 'company';
    status?: 'Verificado' | 'Pendiente' | 'Suspendido';
    createdAt?: string;
    // El perfil completo del trabajador se manejará con UserProfileData
    profileData?: UserProfileData;
};

export type Candidate = User & {
    appliedFor: string;
};

export type CompanyProfile = {
    id:string;
    name: string;
    cuit: string;
    address?: string;
    city: string;
    province?: string;
    phone?: string;
    logoUrl?: string;
    status?: 'Activa' | 'Inactiva' | 'Pendiente';
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
