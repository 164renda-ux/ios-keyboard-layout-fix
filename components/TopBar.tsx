import React from 'react';
import { Menu, Search, Bell } from 'lucide-react';

export const TopBar: React.FC = () => {
  return (
    <header className="flex-none bg-white border-b border-gray-200 h-14 flex items-center justify-between px-4 shadow-sm z-10">
      <div className="flex items-center gap-3">
        <button className="p-2 -ml-2 hover:bg-gray-100 rounded-full text-gray-600">
          <Menu size={24} />
        </button>
        <h1 className="font-semibold text-lg text-gray-800">Messages</h1>
      </div>
      <div className="flex items-center gap-2">
        <button className="p-2 hover:bg-gray-100 rounded-full text-gray-600">
          <Search size={20} />
        </button>
        <button className="p-2 -mr-2 hover:bg-gray-100 rounded-full text-gray-600">
          <Bell size={20} />
        </button>
      </div>
    </header>
  );
};