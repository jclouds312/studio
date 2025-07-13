'use client';

import { useFormState, useFormStatus } from 'react-dom';
import { getJobRecommendations, type AIFormState } from '@/app/actions';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Skeleton } from "@/components/ui/skeleton";
import { Bot, Lightbulb, Loader2 } from "lucide-react";
import { useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';

function SubmitButton() {
    const { pending } = useFormStatus();
    return (
        <Button type="submit" className="w-full" disabled={pending}>
            {pending ? (
                <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Generating...
                </>
            ) : 'Get Recommendations'}
        </Button>
    );
}

export function AiJobMatcher() {
    const initialState: AIFormState = {};
    const [state, dispatch] = useFormState(getJobRecommendations, initialState);
    const { pending } = useFormStatus();
    const { toast } = useToast();

    useEffect(() => {
        if (state.message && !state.errors) {
            toast({
                title: 'AI Response',
                description: state.message,
            });
        }
        if (state.errors) {
            const errorMessages = Object.values(state.errors).flat().join(' ');
             toast({
                variant: 'destructive',
                title: 'Validation Error',
                description: state.message || 'Please check the form fields.',
            });
        }
    }, [state, toast]);

    return (
        <Card className="sticky top-24 shadow-lg">
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <Lightbulb className="text-primary" />
                    AI Job Matcher
                </CardTitle>
                <CardDescription>
                    Fill in your details, and our AI will suggest the best jobs for you.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <form action={dispatch} className="space-y-4">
                    <div className="space-y-1">
                        <Label htmlFor="desiredJobTitle">Desired Job Title</Label>
                        <Input name="desiredJobTitle" id="desiredJobTitle" placeholder="e.g., Software Engineer" required />
                         {state.errors?.desiredJobTitle && <p className="text-sm font-medium text-destructive">{state.errors.desiredJobTitle[0]}</p>}
                    </div>
                     <div className="space-y-1">
                        <Label htmlFor="skills">Skills (comma-separated)</Label>
                        <Input name="skills" id="skills" placeholder="e.g., React, Node.js, SQL" required />
                        {state.errors?.skills && <p className="text-sm font-medium text-destructive">{state.errors.skills[0]}</p>}
                    </div>
                    <div className="space-y-1">
                        <Label htmlFor="experience">Experience</Label>
                        <Textarea name="experience" id="experience" placeholder="Describe your professional experience..." required rows={4} />
                        {state.errors?.experience && <p className="text-sm font-medium text-destructive">{state.errors.experience[0]}</p>}
                    </div>
                     <div className="space-y-1">
                        <Label htmlFor="preferences">Preferences</Label>
                        <Textarea name="preferences" id="preferences" placeholder="e.g., Remote work, specific industries..." required rows={3} />
                        {state.errors?.preferences && <p className="text-sm font-medium text-destructive">{state.errors.preferences[0]}</p>}
                    </div>
                    <SubmitButton />
                </form>

                <div className="mt-6 space-y-4">
                    {pending && (
                        <>
                            <Skeleton className="h-10 w-full" />
                            <Skeleton className="h-10 w-full" />
                            <Skeleton className="h-10 w-full" />
                        </>
                    )}

                    {state?.message && !pending && !state.recommendations && (
                        <Alert>
                            <Bot className="h-4 w-4" />
                            <AlertTitle>AI Response</AlertTitle>
                            <AlertDescription>{state.message}</AlertDescription>
                        </Alert>
                    )}

                    {state?.recommendations && !pending && (
                        <div>
                            <h3 className="text-lg font-semibold mb-2">Recommendations</h3>
                            <Accordion type="single" collapsible className="w-full">
                                {state.recommendations.jobTitles.map((title, index) => (
                                    <AccordionItem value={`item-${index}`} key={index}>
                                        <AccordionTrigger>{title}</AccordionTrigger>
                                        <AccordionContent>
                                            {state.recommendations.reasons[index]}
                                        </AccordionContent>
                                    </AccordionItem>
                                ))}
                            </Accordion>
                        </div>
                    )}
                </div>
            </CardContent>
        </Card>
    );
}
