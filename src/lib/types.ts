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
};

export type User = {
    id: string;
    name: string;
    email: string;
    avatarUrl?: string;
    phone?: string;
};

export type CompanyProfile = {
    id:string;
    name: string;
    cuit: string; 
    city: string;
    province: string;
    logoUrl?: string;
};
