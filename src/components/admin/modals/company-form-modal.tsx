
'use client';

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import type { CompanyProfile } from "@/lib/types";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Upload } from "lucide-react";
import React from "react";

interface CompanyFormModalProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  company: CompanyProfile | null;
}

export function CompanyFormModal({ isOpen, setIsOpen, company }: CompanyFormModalProps) {
  const title = company ? 'Editar Empresa' : 'Añadir Nueva Empresa';
  const description = company ? 'Modifica los detalles de la empresa.' : 'Completa el formulario para registrar una nueva empresa.';
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-[480px]">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
            <div className="flex justify-center">
                <div className="relative">
                    <Avatar className="w-24 h-24">
                        <AvatarImage src={company?.logoUrl} data-ai-hint="company logo" />
                        <AvatarFallback>{company?.name.charAt(0) || 'C'}</AvatarFallback>
                    </Avatar>
                     <Button 
                        size="icon" 
                        variant="outline" 
                        className="absolute bottom-0 right-0 rounded-full h-8 w-8"
                        onClick={() => fileInputRef.current?.click()}>
                        <Upload className="w-4 h-4" />
                    </Button>
                     <Input ref={fileInputRef} type="file" className="hidden" accept="image/*" />
                </div>
            </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Nombre
            </Label>
            <Input id="name" defaultValue={company?.name} className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="cuit" className="text-right">
              CUIT
            </Label>
            <Input id="cuit" defaultValue={company?.cuit} className="col-span-3" />
          </div>
           <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="address" className="text-right">
              Dirección
            </Label>
            <Input id="address" defaultValue={company?.address} className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="city" className="text-right">
              Ciudad
            </Label>
            <Input id="city" defaultValue={company?.city} className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="province" className="text-right">
              Provincia
            </Label>
            <Input id="province" defaultValue={company?.province} className="col-span-3" />
          </div>
           <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="phone" className="text-right">
              Teléfono
            </Label>
            <Input id="phone" type="tel" defaultValue={company?.phone} className="col-span-3" />
          </div>
           <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="status" className="text-right">
              Estado
            </Label>
             <Select defaultValue={company?.status}>
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
      </DialogContent>
    </Dialog>
  );
}
