// src/contexts/ThemeContext.tsx

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { ThemeContextType } from '../types'

const COOKIE_NAME = 'theme'
const COOKIE_EXPIRE_DAYS = 365

// Helper para leer cookie
function getCookie(name: string): string | null {
  return document.cookie
    .split('; ')
    .reduce((prev, curr) => {
      const [key, v] = curr.split('=')
      return key === name ? decodeURIComponent(v) : prev
    }, null as string | null)
}

// Helper para escribir cookie
function setCookie(name: string, value: string, days: number) {
  const expires = new Date(Date.now() + days * 864e5).toUTCString()
  document.cookie = `${name}=${encodeURIComponent(value)}; expires=${expires}; path=/`
}

const ThemeContext = createContext<ThemeContextType>({
  theme: 'light',
  toggleTheme: () => {}
})

export const useTheme = () => useContext(ThemeContext)

export const ThemeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    // Inicializa desde cookie o 'light' por defecto
    const saved = getCookie(COOKIE_NAME) as 'light' | 'dark' | null
    return saved === 'dark' ? 'dark' : 'light'
  })

  // Aplica theme al <html> y guarda cookie al cambiar
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    setCookie(COOKIE_NAME, theme, COOKIE_EXPIRE_DAYS)
  }, [theme])

  const toggleTheme = () => {
    setTheme(prev => (prev === 'light' ? 'dark' : 'light'))
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}
