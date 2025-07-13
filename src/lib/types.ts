export type Job = {
    id: string;
    title: string;
    company: string; // Could be a person's name for 'changas'
    location: string;
    type: 'Full-time' | 'Part-time' | 'Contract' | 'Changa';
    description: string;
    companyLogo: string; // User's avatar for 'changas'
    category: 'tech' | 'design' | 'marketing' | 'sales' | 'domestic' | 'construction' | 'other';
    contactPhone?: string;
    isFeatured?: boolean;
};

export type User = {
    id: string;
    name: string;
    email: string;
    avatarUrl?: string; // For the selfie
    phone?: string;
    dniFrontUrl?: string;
    dniBackUrl?: string;
};

// We can simplify and use the User type for companies for now, or create a separate one.
// For "LaburoYA", a single User type might be enough to start.
export type CompanyProfile = {
    id:string;
    name: string;
    cuit: string; 
    city: string;
    province: string;
    logoUrl?: string;
};
