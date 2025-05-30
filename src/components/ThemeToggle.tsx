// src/components/ThemeToggle.tsx

import React, { useEffect } from 'react';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

const COOKIE_NAME = 'theme';
const COOKIE_EXP_DAYS = 365;

function setCookie(name: string, value: string, days: number) {
  const expires = new Date(Date.now() + days * 864e5).toUTCString();
  document.cookie = `${name}=${value}; expires=${expires}; path=/`;
}

function getCookie(name: string): string | null {
  return document.cookie.split('; ').reduce((r, c) => {
    const [key, v] = c.split('=');
    return key === name ? decodeURIComponent(v) : r;
  }, null as string | null);
}

const ThemeToggle: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  // Al montar, leemos la cookie y forzamos el tema si difiere
  useEffect(() => {
    const saved = getCookie(COOKIE_NAME);
    if (saved && saved !== theme) {
      toggleTheme();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleClick = () => {
    toggleTheme();
    const next = theme === 'light' ? 'dark' : 'light';
    setCookie(COOKIE_NAME, next, COOKIE_EXP_DAYS);
  };

  return (
    <button
      aria-label={`Cambiar a modo ${theme === 'light' ? 'oscuro' : 'claro'}`}
      title={`Cambiar a modo ${theme === 'light' ? 'oscuro' : 'claro'}`}
      onClick={handleClick}
      className="p-2 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-background focus:ring-primary transition-colors"
      style={{ backgroundColor: 'var(--card)', color: 'var(--card-foreground)' }}
    >
      {theme === 'light' ? (
        <Moon className="w-5 h-5" />
      ) : (
        <Sun className="w-5 h-5" />
      )}
    </button>
  );
};

export default ThemeToggle;
