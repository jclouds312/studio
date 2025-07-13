
'use client';

import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription, SheetFooter, SheetClose } from "@/components/ui/sheet";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { SendHorizonal, X } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import React from 'react';

const initialMessages = [
  { id: 1, sender: 'other', text: 'Hola, estamos interesados en tu perfil para la vacante de Frontend Developer.', time: '10:30' },
  { id: 2, sender: 'me', text: '¡Hola! Muchas gracias por contactarme. ¿Podrían darme más detalles sobre el puesto?', time: '10:31' },
  { id: 3, sender: 'other', text: 'Claro, buscamos a alguien con experiencia en React y Next.js. El trabajo es remoto.', time: '10:32' },
];

export function ChatPanel({ isOpen, setIsOpen }: { isOpen: boolean; setIsOpen: (isOpen: boolean) => void }) {
  const activeConversation = {
    id: 1,
    name: 'Tech Solutions Inc.',
    avatar: 'https://placehold.co/40x40.png',
  };
  
  const [messages, setMessages] = React.useState(initialMessages);
  const [newMessage, setNewMessage] = React.useState('');
  const scrollAreaRef = React.useRef<HTMLDivElement>(null);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (newMessage.trim() === '') return;

    const newMsg = {
      id: messages.length + 1,
      sender: 'me',
      text: newMessage,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages([...messages, newMsg]);
    setNewMessage('');
  };

  React.useEffect(() => {
    // Scroll to bottom when new messages are added
    if (scrollAreaRef.current) {
        const viewport = scrollAreaRef.current.querySelector('div[data-radix-scroll-area-viewport]');
        if (viewport) {
            viewport.scrollTop = viewport.scrollHeight;
        }
    }
  }, [messages]);


  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetContent className="w-full sm:max-w-md p-0" side="right">
         <div className="flex flex-col h-full">
            <SheetHeader className="p-4 border-b">
              <SheetTitle>Mensajes</SheetTitle>
              <SheetDescription>Conversaciones activas.</SheetDescription>
               <SheetClose asChild>
                  <Button
                    aria-label="Cerrar"
                    className="absolute right-4 top-4 rounded-full"
                    size="icon"
                    variant="ghost"
                     onClick={() => setIsOpen(false)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </SheetClose>
            </SheetHeader>
            <div className="flex flex-1 overflow-hidden">
                <div className="w-full flex flex-col">
                    <div className="flex items-center gap-3 p-3 border-b">
                        <Avatar>
                            <AvatarImage src={activeConversation.avatar} data-ai-hint="company logo" />
                            <AvatarFallback>{activeConversation.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                            <p className="font-semibold">{activeConversation.name}</p>
                            <p className="text-xs text-muted-foreground">En línea</p>
                        </div>
                    </div>
                    
                    <ScrollArea className="flex-1 p-4" ref={scrollAreaRef}>
                        <div className="space-y-4">
                            {messages.map((message) => (
                                <div key={message.id} className={`flex items-end gap-2 ${message.sender === 'me' ? 'justify-end' : ''}`}>
                                     {message.sender === 'other' && (
                                        <Avatar className="h-6 w-6">
                                            <AvatarImage src={activeConversation.avatar} data-ai-hint="company logo"/>
                                            <AvatarFallback>{activeConversation.name.charAt(0)}</AvatarFallback>
                                        </Avatar>
                                     )}
                                    <div className={`rounded-lg px-3 py-2 max-w-xs lg:max-w-md ${
                                        message.sender === 'me'
                                        ? 'bg-primary text-primary-foreground'
                                        : 'bg-secondary'
                                    }`}>
                                        <p className="text-sm">{message.text}</p>
                                        <p className={`text-xs mt-1 ${
                                            message.sender === 'me'
                                            ? 'text-primary-foreground/70'
                                            : 'text-muted-foreground'
                                        } text-right`}>{message.time}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </ScrollArea>

                    <form onSubmit={handleSendMessage} className="p-4 border-t bg-background">
                        <div className="relative">
                            <Input 
                                placeholder="Escribe un mensaje..." 
                                className="pr-12"
                                value={newMessage}
                                onChange={(e) => setNewMessage(e.target.value)}
                             />
                            <Button type="submit" size="icon" className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8">
                                <SendHorizonal className="h-4 w-4" />
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
         </div>
      </SheetContent>
    </Sheet>
  );
}
