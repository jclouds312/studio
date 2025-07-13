
'use client';

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import type { Job } from "@/lib/types";
import { Switch } from "@/components/ui/switch";

interface JobFormModalProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  job: Job | null;
}

export function JobFormModal({ isOpen, setIsOpen, job }: JobFormModalProps) {
  const title = job ? 'Editar Publicación' : 'Crear Nueva Publicación';
  const description = job ? 'Modifica los detalles de la publicación.' : 'Completa el formulario para crear una nueva oferta de trabajo.';

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="title" className="text-right">
              Título
            </Label>
            <Input id="title" defaultValue={job?.title} className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="company" className="text-right">
              Empresa
            </Label>
            <Input id="company" defaultValue={job?.company} className="col-span-3" />
          </div>
           <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="location" className="text-right">
              Ubicación
            </Label>
            <Input id="location" defaultValue={job?.location} className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="type" className="text-right">
              Tipo
            </Label>
             <Select defaultValue={job?.type}>
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
             <Select defaultValue={job?.category}>
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
                <SelectItem value="other">Otro</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-4 items-start gap-4">
            <Label htmlFor="description" className="text-right pt-2">
              Descripción
            </Label>
            <Textarea id="description" defaultValue={job?.description} className="col-span-3" rows={5} />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="whatsapp" className="text-right">
              WhatsApp
            </Label>
            <Input id="whatsapp" defaultValue={job?.whatsapp} className="col-span-3" placeholder="+54911..." />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="featured" className="text-right">
              Destacada
            </Label>
            <div className="col-span-3 flex items-center">
                 <Switch id="featured" defaultChecked={job?.isFeatured} />
            </div>
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
