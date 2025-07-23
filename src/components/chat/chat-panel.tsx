
'use client';

import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription, SheetFooter, SheetClose } from "@/components/ui/sheet";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { SendHorizonal, X, ArrowLeft } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import React from 'react';
import { cn } from "@/lib/utils";

const conversationsData = [
  { 
    id: 1, 
    name: 'Tech Solutions Inc.', 
    avatar: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=40&h=40&fit=crop', 
    lastMessage: 'Claro, buscamos a alguien con...', 
    time: '10:32',
    unread: 1,
    messages: [
      { id: 1, sender: 'other', text: 'Hola, estamos interesados en tu perfil para la vacante de Frontend Developer.', time: '10:30' },
      { id: 2, sender: 'me', text: '¡Hola! Muchas gracias por contactarme. ¿Podrían darme más detalles sobre el puesto?', time: '10:31' },
      { id: 3, sender: 'other', text: 'Claro, buscamos a alguien con experiencia en React y Next.js. El trabajo es remoto.', time: '10:32' },
    ]
  },
  {
    id: 2,
    name: 'Creative Minds',
    avatar: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=40&h=40&fit=crop',
    lastMessage: 'Perfecto, CV recibido. Lo revisamos y te...',
    time: 'Ayer',
    unread: 0,
    messages: [
        { id: 1, sender: 'me', text: 'Hola, buenas tardes. Acabo de postularme a la oferta de Diseñador UX/UI.', time: '14:50' },
        { id: 2, sender: 'other', text: 'Perfecto, CV recibido. Lo revisamos y te contactamos. ¡Gracias!', time: '14:55' }
    ]
  },
  {
    id: 3,
    name: 'Recursos Humanos ABC',
    avatar: 'https://images.unsplash.com/photo-1556740738-b6a63e27c4df?w=40&h=40&fit=crop',
    lastMessage: '¿Tendrías disponibilidad para una entrevista mañana?',
    time: '11/07',
    unread: 2,
    messages: [
        { id: 1, sender: 'other', text: 'Hola, hemos visto tu perfil y nos parece muy interesante.', time: '11:00' },
        { id: 2, sender: 'other', text: '¿Tendrías disponibilidad para una entrevista mañana?', time: '11:01' }
    ]
  }
];


export function ChatPanel({ isOpen, setIsOpen }: { isOpen: boolean; setIsOpen: (isOpen: boolean) => void }) {
  const [activeConversation, setActiveConversation] = React.useState<any | null>(null);
  const [messages, setMessages] = React.useState<any[]>([]);
  const [newMessage, setNewMessage] = React.useState('');
  const scrollAreaRef = React.useRef<HTMLDivElement>(null);

  const handleSelectConversation = (conversation: any) => {
    setActiveConversation(conversation);
    setMessages(conversation.messages);
  }

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
    if (scrollAreaRef.current) {
        const viewport = scrollAreaRef.current.querySelector('div[data-radix-scroll-area-viewport]');
        if (viewport) {
            viewport.scrollTop = viewport.scrollHeight;
        }
    }
  }, [messages]);
  
  const handleBack = () => {
    setActiveConversation(null);
    setMessages([]);
  }

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetContent className="w-full sm:max-w-md p-0 flex flex-col" side="right">
         <SheetHeader className="p-4 border-b flex flex-row items-center gap-4 space-y-0 shrink-0">
           {activeConversation && (
             <Button variant="ghost" size="icon" className="h-8 w-8" onClick={handleBack}>
                <ArrowLeft className="h-5 w-5"/>
             </Button>
           )}
           <div className='flex-1'>
              <SheetTitle>{activeConversation ? activeConversation.name : 'Mensajes'}</SheetTitle>
              <SheetDescription>{activeConversation ? 'En línea' : 'Tus conversaciones activas.'}</SheetDescription>
           </div>
           <SheetClose asChild>
              <Button
                aria-label="Cerrar"
                className="rounded-full"
                size="icon"
                variant="ghost"
                 onClick={() => setIsOpen(false)}
              >
                <X className="h-4 w-4" />
              </Button>
            </SheetClose>
        </SheetHeader>
        <div className="flex-1 flex flex-col overflow-hidden">
            <div className={cn("flex-1 transition-all duration-300", !activeConversation ? "translate-x-0" : "-translate-x-full")}>
                <ScrollArea className="h-full">
                    <div className="divide-y">
                        {conversationsData.map(convo => (
                            <div 
                                key={convo.id} 
                                className="p-4 flex items-center gap-4 cursor-pointer hover:bg-secondary"
                                onClick={() => handleSelectConversation(convo)}
                            >
                                <Avatar className="h-12 w-12">
                                    <AvatarImage src={convo.avatar} data-ai-hint="company logo person user" />
                                    <AvatarFallback>{convo.name.charAt(0)}</AvatarFallback>
                                </Avatar>
                                <div className="flex-1">
                                    <div className="flex justify-between items-center">
                                        <p className="font-semibold">{convo.name}</p>
                                        <p className="text-xs text-muted-foreground">{convo.time}</p>
                                    </div>
                                    <div className="flex justify-between items-center mt-1">
                                        <p className={cn("text-sm text-muted-foreground truncate", convo.unread > 0 && "font-bold text-foreground")}>
                                            {convo.lastMessage}
                                        </p>
                                        {convo.unread > 0 && (
                                            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-primary text-primary-foreground text-xs">
                                                {convo.unread}
                                            </span>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </ScrollArea>
            </div>
            <div className={cn("absolute inset-0 flex flex-col transition-all duration-300", activeConversation ? "translate-x-0" : "translate-x-full")}>
                <ScrollArea className="flex-1 p-4" ref={scrollAreaRef}>
                    <div className="space-y-4">
                        {messages.map((message) => (
                            <div key={message.id} className={`flex items-end gap-2 ${message.sender === 'me' ? 'justify-end' : ''}`}>
                                {message.sender === 'other' && (
                                    <Avatar className="h-6 w-6">
                                        <AvatarImage src={activeConversation?.avatar} data-ai-hint="company logo"/>
                                        <AvatarFallback>{activeConversation?.name.charAt(0)}</AvatarFallback>
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

                <form onSubmit={handleSendMessage} className="p-4 border-t bg-background shrink-0">
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
      </SheetContent>
    </Sheet>
  );
}
