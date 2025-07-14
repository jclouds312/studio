
'use client';

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { FileDown, MessageSquare, Briefcase, Info } from "lucide-react";
import type { Candidate } from "@/lib/types";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

interface CandidateProfileModalProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  candidate: Candidate | null;
}

export function CandidateProfileModal({ isOpen, setIsOpen, candidate }: CandidateProfileModalProps) {
  if (!candidate) return null;

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
            <div className="flex items-start gap-4">
                <Avatar className="w-16 h-16 border-2 border-primary">
                    <AvatarImage src={candidate.avatar} data-ai-hint="person user"/>
                    <AvatarFallback>{candidate.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="pt-1">
                    <DialogTitle className="text-2xl">{candidate.name}</DialogTitle>
                    <DialogDescription>
                        {candidate.email}
                    </DialogDescription>
                    <div className="mt-2">
                         <Badge variant="outline">Aplicó a: {candidate.appliedFor}</Badge>
                    </div>
                </div>
            </div>
        </DialogHeader>
        <Separator />
        <div className="py-4 grid gap-4 max-h-[50vh] overflow-y-auto pr-4">
            <div className="space-y-2">
                <h3 className="font-semibold flex items-center gap-2"><Info className="h-4 w-4"/> Resumen Profesional</h3>
                <p className="text-sm text-muted-foreground">
                    {candidate.profileData?.professionalSummary || 'No se ha proporcionado un resumen profesional.'}
                </p>
            </div>
            <div className="space-y-2">
                <h3 className="font-semibold flex items-center gap-2"><Briefcase className="h-4 w-4"/> Experiencia Laboral</h3>
                <p className="text-sm text-muted-foreground whitespace-pre-wrap">
                     {candidate.profileData?.experience || 'No se ha proporcionado experiencia laboral.'}
                </p>
            </div>
        </div>
        <Separator />
        <DialogFooter className="sm:justify-between w-full">
          <Button type="button" variant="secondary" onClick={() => setIsOpen(false)}>Cerrar</Button>
          <div className="flex gap-2">
            <Button type="button" variant="outline">
              <FileDown className="mr-2 h-4 w-4" />
              Descargar CV
            </Button>
            <Button type="button">
                <MessageSquare className="mr-2 h-4 w-4" />
                Contactar
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

