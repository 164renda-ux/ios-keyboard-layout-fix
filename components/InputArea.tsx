import React, { useState } from 'react';
import { Send, Plus, Smile } from 'lucide-react';

interface InputAreaProps {
  onSendMessage: (text: string) => void;
}

export const InputArea: React.FC<InputAreaProps> = ({ onSendMessage }) => {
  const [text, setText] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (text.trim()) {
      onSendMessage(text);
      setText('');
    }
  };

  return (
    <div className="flex-none bg-white border-t border-gray-200 w-full">
      <form 
        onSubmit={handleSubmit}
        className="flex items-end gap-2 w-full p-2"
        style={{
          // Ensure we respect the safe area at the bottom, 
          // but also provide a minimal padding if safe area is 0
          paddingBottom: 'max(env(safe-area-inset-bottom), 0.5rem)'
        }}
      >
        <button type="button" className="p-2 mb-1 text-gray-500 hover:text-blue-500 transition-colors">
          <Plus size={24} />
        </button>
        
        <div className="flex-1 bg-gray-100 rounded-2xl flex items-center px-4 py-2 min-h-[40px]">
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Type a message..."
            className="flex-1 bg-transparent border-none outline-none text-gray-900 placeholder-gray-500"
            // Font size 16px prevents iOS zoom
            style={{ fontSize: '16px' }} 
          />
          <button type="button" className="ml-2 text-gray-400 hover:text-gray-600">
            <Smile size={20} />
          </button>
        </div>

        <button 
          type="submit" 
          disabled={!text.trim()}
          className={`p-2 mb-1 rounded-full transition-all duration-200 flex-shrink-0 ${
            text.trim() 
              ? 'bg-blue-600 text-white shadow-md transform scale-100' 
              : 'bg-gray-200 text-gray-400 scale-95'
          }`}
        >
          <Send size={20} />
        </button>
      </form>
    </div>
  );
};