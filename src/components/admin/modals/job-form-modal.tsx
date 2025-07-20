
'use client';

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import React, { useEffect, useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import type { CompanyProfile, Job } from "@/lib/types";
import { getAllCompanies } from "@/services/companyService";
import { X } from "lucide-react";

interface JobFormModalProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  job: Job | null;
  onSave: (job: Job) => void;
}

export function JobFormModal({ isOpen, setIsOpen, job, onSave }: JobFormModalProps) {
  const { toast } = useToast();
  const [formData, setFormData] = useState<Partial<Job>>({});
  const [companies, setCompanies] = useState<CompanyProfile[]>([]);
  const [currentSkill, setCurrentSkill] = useState('');
  const [currentQuestion, setCurrentQuestion] = useState('');

  const title = job ? 'Editar Publicación' : 'Crear Nueva Publicación';
  const description = job ? 'Modifica los detalles de la publicación.' : 'Completa el formulario para crear una nueva oferta de trabajo.';

  useEffect(() => {
    getAllCompanies().then(setCompanies);

    if (job) {
      setFormData(job);
    } else {
      setFormData({
        title: '',
        company: '',
        companyLogo: 'https://placehold.co/56x56.png',
        location: '',
        type: 'Full-time',
        category: 'tech',
        description: '',
        whatsapp: '',
        isFeatured: false,
        salary: null,
        companyProfileId: null,
        skills: [],
        customQuestions: [],
      });
    }
  }, [job, isOpen]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({...prev, [id]: value}));
  };

  const handleSelectChange = (id: string, value: string) => {
    if (id === 'companyProfileId') {
      const selectedCompany = companies.find(c => c.id === value);
      if (selectedCompany) {
        setFormData(prev => ({
          ...prev,
          companyProfileId: value,
          company: selectedCompany.name,
          companyLogo: selectedCompany.logoUrl || 'https://placehold.co/56x56.png'
        }));
      }
    } else {
      setFormData(prev => ({...prev, [id]: value as any}));
    }
  };

  const handleSwitchChange = (id: string, checked: boolean) => {
    setFormData(prev => ({...prev, [id]: checked}));
  };

  const handleAddItem = (type: 'skills' | 'customQuestions') => {
    if (type === 'skills' && currentSkill) {
      setFormData(prev => ({ ...prev, skills: [...(prev.skills || []), currentSkill] }));
      setCurrentSkill('');
    } else if (type === 'customQuestions' && currentQuestion) {
      setFormData(prev => ({ ...prev, customQuestions: [...(prev.customQuestions || []), currentQuestion] }));
      setCurrentQuestion('');
    }
  };

  const handleRemoveItem = (type: 'skills' | 'customQuestions', index: number) => {
    if (type === 'skills') {
      setFormData(prev => ({ ...prev, skills: prev.skills?.filter((_, i) => i !== index) }));
    } else if (type === 'customQuestions') {
      setFormData(prev => ({ ...prev, customQuestions: prev.customQuestions?.filter((_, i) => i !== index) }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.companyProfileId) {
      toast({
        title: "Error de validación",
        description: "Debes seleccionar una empresa para la publicación.",
        variant: "destructive"
      });
      return;
    }
    onSave(formData as Job);
    toast({
        title: "¡Éxito!",
        description: `La publicación "${formData.title}" ha sido guardada correctamente.`,
    });
    setIsOpen(false);
  };


  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
            <div className="grid gap-4 py-4 max-h-[70vh] overflow-y-auto pr-4">
            <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="title" className="text-right">
                Título
                </Label>
                <Input id="title" value={formData.title || ''} onChange={handleInputChange} className="col-span-3" required/>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="companyProfileId" className="text-right">
                Empresa
                </Label>
                <Select value={formData.companyProfileId || undefined} onValueChange={(value) => handleSelectChange('companyProfileId', value)}>
                  <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="Seleccionar empresa" />
                  </SelectTrigger>
                  <SelectContent>
                      {companies.map(company => (
                          <SelectItem key={company.id} value={company.id}>{company.name}</SelectItem>
                      ))}
                  </SelectContent>
                </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="location" className="text-right">
                Ubicación
                </Label>
                <Input id="location" value={formData.location || ''} onChange={handleInputChange} className="col-span-3" required/>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="type" className="text-right">
                Tipo
                </Label>
                <Select value={formData.type} onValueChange={(value) => handleSelectChange('type', value)}>
                <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Seleccionar tipo" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="Full-time">Full-time</SelectItem>
                    <SelectItem value="Part-time">Part-time</SelectItem>
                    <SelectItem value="Contract">Contract</SelectItem>
                    <SelectItem value="Changa">Changa</SelectItem>
                </SelectContent>
                </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="salary" className="text-right">
                Salario
                </Label>
                <Input id="salary" value={formData.salary || ''} onChange={handleInputChange} className="col-span-3" placeholder="Ej: $150.000 ARS mensual (Opcional)" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="category" className="text-right">
                Categoría
                </Label>
                <Select value={formData.category} onValueChange={(value) => handleSelectChange('category', value)}>
                <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Seleccionar categoría" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="tech">Tecnología</SelectItem>
                    <SelectItem value="design">Diseño</SelectItem>
                    <SelectItem value="marketing">Marketing</SelectItem>
                    <SelectItem value="sales">Ventas</SelectItem>
                    <SelectItem value="domestic">Doméstico</SelectItem>
                    <SelectItem value="construction">Construcción</SelectItem>
                    <SelectItem value="admin">Administración</SelectItem>
                    <SelectItem value="gastronomy">Gastronomía</SelectItem>
                    <SelectItem value="health">Salud</SelectItem>
                    <SelectItem value="education">Educación</SelectItem>
                    <SelectItem value="hr">Recursos Humanos</SelectItem>
                    <SelectItem value="finance">Finanzas</SelectItem>
                    <SelectItem value="legal">Legal</SelectItem>
                    <SelectItem value="logistics">Logística</SelectItem>
                    <SelectItem value="other">Otro</SelectItem>
                </SelectContent>
                </Select>
            </div>
            <div className="grid grid-cols-4 items-start gap-4">
                <Label htmlFor="description" className="text-right pt-2">
                Descripción
                </Label>
                <Textarea id="description" value={formData.description || ''} onChange={handleInputChange} className="col-span-3" rows={5} required/>
            </div>
             <div className="grid grid-cols-4 items-start gap-4">
                <Label className="text-right pt-2">Habilidades</Label>
                <div className="col-span-3 space-y-2">
                    <div className="flex gap-2">
                        <Input value={currentSkill} onChange={(e) => setCurrentSkill(e.target.value)} placeholder="Ej: React, Node.js..."/>
                        <Button type="button" onClick={() => handleAddItem('skills')}>Añadir</Button>
                    </div>
                    <div className="flex flex-wrap gap-2">
                        {formData.skills?.map((skill, index) => (
                            <div key={index} className="flex items-center gap-1 bg-secondary text-secondary-foreground rounded-full px-3 py-1 text-sm">
                                {skill}
                                <button type="button" onClick={() => handleRemoveItem('skills', index)} className="ml-1 text-muted-foreground hover:text-foreground">
                                    <X className="h-3 w-3" />
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <div className="grid grid-cols-4 items-start gap-4">
                <Label className="text-right pt-2">Preguntas</Label>
                 <div className="col-span-3 space-y-2">
                    <div className="flex gap-2">
                        <Input value={currentQuestion} onChange={(e) => setCurrentQuestion(e.target.value)} placeholder="Ej: ¿Años de experiencia con...?"/>
                        <Button type="button" onClick={() => handleAddItem('customQuestions')}>Añadir</Button>
                    </div>
                    <div className="space-y-2">
                        {formData.customQuestions?.map((q, index) => (
                            <div key={index} className="flex items-center gap-2 bg-secondary/50 rounded-md p-2 text-sm">
                                <span className="flex-grow">{q}</span>
                                <button type="button" onClick={() => handleRemoveItem('customQuestions', index)} className="text-muted-foreground hover:text-foreground">
                                    <X className="h-4 w-4" />
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="whatsapp" className="text-right">
                WhatsApp
                </Label>
                <Input id="whatsapp" value={formData.whatsapp || ''} onChange={handleInputChange} className="col-span-3" placeholder="+54911..." />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="isFeatured" className="text-right">
                Destacada
                </Label>
                <div className="col-span-3 flex items-center">
                    <Switch id="isFeatured" checked={formData.isFeatured || false} onCheckedChange={(checked) => handleSwitchChange('isFeatured', checked)} />
                </div>
            </div>
            </div>
            <DialogFooter>
                <Button type="button" variant="outline" onClick={() => setIsOpen(false)}>Cancelar</Button>
                <Button type="submit">Guardar Cambios</Button>
            </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
