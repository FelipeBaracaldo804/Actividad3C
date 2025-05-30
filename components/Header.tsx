import React from 'react';
import ThemeToggle from './ThemeToggle';
import { MessageSquareQuote } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="sticky top-0 z-10 shadow-sm p-4" style={{ backgroundColor: 'var(--card)' }}>
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <MessageSquareQuote className="w-7 h-7 text-[var(--primary)]" />
          <h1 className="text-xl font-bold" style={{ color: 'var(--card-foreground)' }}>
            Solicitud de Cotización
          </h1>
        </div>
        <ThemeToggle />
      </div>
    </header>
  );
};

export default Header