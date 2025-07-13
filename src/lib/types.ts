export type Job = {
    id: string;
    title: string;
    company: string;
    location: string;
    type: 'Full-time' | 'Part-time' | 'Contract';
    description: string;
    companyLogo: string;
    category: 'tech' | 'design' | 'marketing' | 'sales';
};

export type UserProfile = {
    id: string;
    name: string;
    email: string;
    avatarUrl?: string; // For the selfie
    phone?: string;
    bio?: string;
    cvUrl?: string; // Link to the stored CV file
};

export type CompanyProfile = {
    id: string;
    name: string;
    cuit: string; // CUIT for Argentina (instead of NIT)
    city: string;
    province: string;
    logoUrl?: string;
    publications?: {
        id: string;
        imageUrl: string;
        description: string;
    }[];
};
