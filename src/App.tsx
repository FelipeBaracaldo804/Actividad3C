import React from 'react';
import { ThemeProvider } from './contexts/ThemeContext';
import Header from './components/Header';
import QuoteForm from './components/QuoteForm';

function App() {
  return (
    <ThemeProvider>
      <div className="min-h-screen flex flex-col bg-[var(--background)] text-[var(--foreground)] transition-colors">
        {/* Tu barra superior con título y toggle */}
        <Header />

        {/* Contenedor central */}
        <main className="flex-1 container mx-auto py-8 px-4 sm:px-6 md:py-12">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold mb-3">Solicitar Cotización</h1>
              <p className="text-lg opacity-90">
                Completa el formulario y nos pondremos en contacto contigo.
              </p>
            </div>

            {/* Aquí va tu formulario */}
            <QuoteForm />
          </div>
        </main>

        {/* Pie de página */}
        <footer className="py-6 border-t text-center" style={{ borderColor: 'var(--border)', backgroundColor: 'var(--card)' }}>
          <p className="text-sm opacity-70">© {new Date().getFullYear()} Formulario de Cotización PWA. Todos los derechos reservados.</p>
        </footer>
      </div>
    </ThemeProvider>
  );
}

export default App;
