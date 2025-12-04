import React, { useState } from 'react';
import { useVisualViewport } from './hooks/useVisualViewport';
import { TopBar } from './components/TopBar';
import { MessageList } from './components/MessageList';
import { InputArea } from './components/InputArea';
import { Message } from './types';

export default function App() {
  // 1. Get the dynamic visual viewport geometry
  const { height, offsetTop } = useVisualViewport();
  
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Hello! This layout is optimized to prevent jumping.",
      sender: 'other',
      timestamp: new Date(Date.now() - 60000),
    },
    {
      id: '2',
      text: "When you tap the input, the viewport resizes. We track this exactly.",
      sender: 'other',
      timestamp: new Date(Date.now() - 30000),
    },
    {
      id: '3',
      text: "Even if the browser tries to push the view up, we compensate using offsetTop.",
      sender: 'other',
      timestamp: new Date(Date.now() - 15000),
    },
  ]);

  const handleSendMessage = (text: string) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      text,
      sender: 'me',
      timestamp: new Date(),
    };
    setMessages(prev => [...prev, newMessage]);

    setTimeout(() => {
      const reply: Message = {
        id: (Date.now() + 1).toString(),
        text: "Got it! No layout shifts noticed.",
        sender: 'other',
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, reply]);
    }, 1000);
  };

  return (
    <div 
      className="fixed left-0 w-full bg-gray-50 flex flex-col overflow-hidden"
      style={{ 
        // 3. CRITICAL GEOMETRY LOCK:
        // We strictly size the container to the visual viewport height.
        height: `${height}px`,
        // We explicitly set 'top'. If iOS scrolls the viewport up (making offsetTop > 0),
        // we set top equal to that offset. This effectively pins the container to the
        // "Glass" of the screen, counter-acting the browser's scroll.
        top: `${offsetTop}px`,
      }}
    >
      <TopBar />
      
      {/* Messages area takes remaining space */}
      <MessageList messages={messages} />
      
      <InputArea onSendMessage={handleSendMessage} />
    </div>
  );
}