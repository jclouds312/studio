
'use client';

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import type { Job } from "@/lib/types";
import { Switch } from "@/components/ui/switch";
import React, { useEffect, useState } from "react";
import { useToast } from "@/components/ui/use-toast";

interface JobFormModalProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  job: Job | null;
  onSave: (job: Job) => void;
}

export function JobFormModal({ isOpen, setIsOpen, job, onSave }: JobFormModalProps) {
  const { toast } = useToast();
  const [formData, setFormData] = useState<Partial<Job>>({});
  const title = job ? 'Editar Publicación' : 'Crear Nueva Publicación';
  const description = job ? 'Modifica los detalles de la publicación.' : 'Completa el formulario para crear una nueva oferta de trabajo.';

  useEffect(() => {
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
      });
    }
  }, [job, isOpen]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({...prev, [id]: value}));
  };

  const handleSelectChange = (id: string, value: string) => {
    setFormData(prev => ({...prev, [id]: value as any}));
  };

  const handleSwitchChange = (id: string, checked: boolean) => {
    setFormData(prev => ({...prev, [id]: checked}));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
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
            <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="title" className="text-right">
                Título
                </Label>
                <Input id="title" value={formData.title || ''} onChange={handleInputChange} className="col-span-3" required/>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="company" className="text-right">
                Empresa
                </Label>
                <Input id="company" value={formData.company || ''} onChange={handleInputChange} className="col-span-3" required/>
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
