import React from 'react';
import { ThemeProvider } from './contexts/ThemeContext';
import Header from './components/Header';
import QuoteForm from './components/QuoteForm';

function App() {
  return (
    <ThemeProvider>
      <div className="min-h-screen flex flex-col" style={{ backgroundColor: 'var(--background)', color: 'var(--foreground)' }}>
        <Header />
        
        <main className="flex-1 container mx-auto py-8 px-4 sm:px-6 md:py-12">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold mb-3" style={{ color: 'var(--foreground)' }}>
                Solicitar Cotización
              </h1>
              <p className="text-lg" style={{ color: 'var(--foreground)', opacity: 0.9 }}>
                Complete el formulario a continuación y nos pondremos en contacto con usted lo antes posible.
              </p>
            </div>
            
            <QuoteForm />
          </div>
        </main>
        
        <footer className="py-6 border-t text-center" style={{ borderColor: 'var(--border)', backgroundColor: 'var(--card)' }}>
          <div className="container mx-auto">
            <p className="text-sm" style={{ color: 'var(--card-foreground)', opacity: 0.7 }}>
              © {new Date().getFullYear()} Formulario de Cotización PWA. Todos los derechos reservados.
            </p>
          </div>
        </footer>
      </div>
    </ThemeProvider>
  );
}

export default App;