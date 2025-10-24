// App.test.js (Jest + React Testing Library)
// Verifica que el Navbar se renderiza con enlaces clave
import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from './App';

test('muestra enlaces del navbar', () => {
  // Renderiza toda la App (App ya incluye BrowserRouter interno)
  render(<App />);
  // Busca enlaces visibles
  expect(screen.getByText(/Inicio/i)).toBeInTheDocument();
  expect(screen.getByText(/Catálogo/i)).toBeInTheDocument();
  expect(screen.getByText(/Perfil/i)).toBeInTheDocument();
});
