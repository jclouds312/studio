// This file is machine-generated - edit at your own risk!

'use server';

/**
 * @fileOverview Provides personalized job recommendations based on job seeker profiles.
 *
 * - jobSeekerPersonalizedRecommendations - A function that generates job recommendations.
 * - JobSeekerProfile - The input type for the jobSeekerPersonalizedRecommendations function.
 * - JobRecommendations - The return type for the jobSeekerPersonalizedRecommendations function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const JobSeekerProfileSchema = z.object({
  skills: z.array(z.string()).describe('List of skills possessed by the job seeker.'),
  experience: z.string().describe('Description of the job seeker\'s work experience.'),
  preferences: z.string().describe('Job preferences of the job seeker (e.g., remote, industry).'),
  desiredJobTitle: z.string().describe('Desired job title of the job seeker.'),
});
export type JobSeekerProfile = z.infer<typeof JobSeekerProfileSchema>;

const JobRecommendationsSchema = z.object({
  jobTitles: z.array(z.string()).describe('Recommended job titles based on the profile.'),
  reasons: z.array(z.string()).describe('Reasons for recommending each job title.'),
});
export type JobRecommendations = z.infer<typeof JobRecommendationsSchema>;

export async function jobSeekerPersonalizedRecommendations(
  input: JobSeekerProfile
): Promise<JobRecommendations> {
  return jobSeekerPersonalizedRecommendationsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'jobSeekerPersonalizedRecommendationsPrompt',
  input: {schema: JobSeekerProfileSchema},
  output: {schema: JobRecommendationsSchema},
  prompt: `You are an AI job recommendation system. Given the following job seeker profile, provide a list of job titles that would be a good fit, and the reasons for recommending each job title.

Job Seeker Profile:
Skills: {{skills}}
Experience: {{experience}}
Preferences: {{preferences}}
Desired Job Title: {{desiredJobTitle}}

For each job title, provide a reason why it is recommended for this job seeker.
`,
});

const jobSeekerPersonalizedRecommendationsFlow = ai.defineFlow(
  {
    name: 'jobSeekerPersonalizedRecommendationsFlow',
    inputSchema: JobSeekerProfileSchema,
    outputSchema: JobRecommendationsSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
