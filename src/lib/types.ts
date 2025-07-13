

export type Job = {
    id: string;
    title: string;
    company: string;
    location: string;
    type: 'Full-time' | 'Part-time' | 'Contract' | 'Changa';
    description: string;
    companyLogo: string;
    category: 'tech' | 'design' | 'marketing' | 'sales' | 'domestic' | 'construction' | 'other';
    isFeatured?: boolean;
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
    // Expanded profile fields
    professionalSummary?: string;
    experience?: string;
    skills?: string[];
    applications?: UserApplication[];
    savedJobs?: Job[];
    stats?: UserStats;
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
    plan: 'Básico' | 'Profesional' | 'Premium';
    status: 'Pagado' | 'Pendiente' | 'Fallido';
    amount: number;
    date: string;
};
