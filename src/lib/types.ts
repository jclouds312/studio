export type Job = {
    id: string;
    title: string;
    company: string;
    location: string;
    type: 'Full-time' | 'Part-time' | 'Contract';
    description: string;
    companyLogo: string;
};
