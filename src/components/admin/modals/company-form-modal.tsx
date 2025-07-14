
'use client';

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import type { CompanyProfile } from "@/lib/types";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Upload } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useToast } from "@/components/ui/use-toast";

interface CompanyFormModalProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  company: CompanyProfile | null;
  onSave: (company: CompanyProfile) => void;
}

export function CompanyFormModal({ isOpen, setIsOpen, company, onSave }: CompanyFormModalProps) {
  const { toast } = useToast();
  const [formData, setFormData] = useState<Partial<CompanyProfile>>({});
  const title = company ? 'Editar Empresa' : 'Añadir Nueva Empresa';
  const description = company ? 'Modifica los detalles de la empresa.' : 'Completa el formulario para registrar una nueva empresa.';
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (company) {
      setFormData(company);
    } else {
      setFormData({
        name: '',
        cuit: '',
        address: '',
        city: '',
        province: '',
        phone: '',
        status: 'Pendiente',
        logoUrl: 'https://placehold.co/40x40.png'
      });
    }
  }, [company, isOpen]);
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({...prev, [id]: value}));
  };
  
  const handleSelectChange = (id: string, value: string) => {
    setFormData(prev => ({...prev, [id]: value as any}));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData as CompanyProfile);
    toast({
        title: "¡Éxito!",
        description: `La empresa "${formData.name}" ha sido guardada correctamente.`,
    });
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-[480px]">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
              <div className="flex justify-center">
                  <div className="relative">
                      <Avatar className="w-24 h-24">
                          <AvatarImage src={formData.logoUrl} data-ai-hint="company logo" />
                          <AvatarFallback>{formData.name?.charAt(0) || 'C'}</AvatarFallback>
                      </Avatar>
                       <Button 
                          size="icon" 
                          variant="outline" 
                          className="absolute bottom-0 right-0 rounded-full h-8 w-8"
                          onClick={() => fileInputRef.current?.click()}
                          type="button">
                          <Upload className="w-4 h-4" />
                      </Button>
                       <Input ref={fileInputRef} type="file" className="hidden" accept="image/*" />
                  </div>
              </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Nombre
              </Label>
              <Input id="name" value={formData.name || ''} onChange={handleInputChange} className="col-span-3" required/>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="cuit" className="text-right">
                CUIT
              </Label>
              <Input id="cuit" value={formData.cuit || ''} onChange={handleInputChange} className="col-span-3" required placeholder="30-XXXXXXXX-X"/>
            </div>
             <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="address" className="text-right">
                Dirección
              </Label>
              <Input id="address" value={formData.address || ''} onChange={handleInputChange} className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="city" className="text-right">
                Ciudad
              </Label>
              <Input id="city" value={formData.city || ''} onChange={handleInputChange} className="col-span-3" required/>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="province" className="text-right">
                Provincia
              </Label>
              <Input id="province" value={formData.province || ''} onChange={handleInputChange} className="col-span-3" />
            </div>
             <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="phone" className="text-right">
                Teléfono
              </Label>
              <Input id="phone" type="tel" value={formData.phone || ''} onChange={handleInputChange} className="col-span-3" />
            </div>
             <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="status" className="text-right">
                Estado
              </Label>
               <Select value={formData.status} onValueChange={(value) => handleSelectChange('status', value)}>
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Seleccionar estado" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Activa">Activa</SelectItem>
                  <SelectItem value="Inactiva">Inactiva</SelectItem>
                  <SelectItem value="Pendiente">Pendiente</SelectItem>
                </SelectContent>
              </Select>
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
