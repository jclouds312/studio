'use server';

import { jobSeekerPersonalizedRecommendations, JobSeekerProfile, JobRecommendations } from '@/ai/flows/ai-job-matching';
import { z } from 'zod';

const formSchema = z.object({
  skills: z.string().min(2, 'Please enter at least one skill.'),
  experience: z.string().min(10, 'Please provide more details about your experience.'),
  preferences: z.string().min(5, 'Please describe your preferences.'),
  desiredJobTitle: z.string().min(2, 'Please enter your desired job title.'),
});

export type AIFormState = {
  recommendations?: JobRecommendations;
  errors?: {
    skills?: string[];
    experience?: string[];
    preferences?: string[];
    desiredJobTitle?: string[];
    form?: string[];
  };
  message?: string;
};

export async function getJobRecommendations(prevState: AIFormState, formData: FormData): Promise<AIFormState> {
    const validatedFields = formSchema.safeParse({
        skills: formData.get('skills'),
        experience: formData.get('experience'),
        preferences: formData.get('preferences'),
        desiredJobTitle: formData.get('desiredJobTitle'),
    });

    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            message: 'Invalid fields. Please check your input.',
        };
    }

    const profile: JobSeekerProfile = {
        ...validatedFields.data,
        skills: validatedFields.data.skills.split(',').map(s => s.trim()).filter(s => s),
    };

    try {
        const recommendations = await jobSeekerPersonalizedRecommendations(profile);
        if (!recommendations.jobTitles || recommendations.jobTitles.length === 0) {
          return { message: "We couldn't find any specific job titles for your profile. Try refining your search terms." }
        }
        return { recommendations, message: 'Here are your personalized recommendations!' };
    } catch (e) {
        console.error(e);
        return { message: 'An error occurred while getting recommendations. Please try again.' };
    }
}
