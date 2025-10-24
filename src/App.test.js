import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from './App';

test('muestra enlaces del navbar', () => {
  render(<App />);
  expect(screen.getByText(/Inicio/i)).toBeInTheDocument();
  expect(screen.getByText(/Catálogo/i)).toBeInTheDocument();
  expect(screen.getByText(/Perfil/i)).toBeInTheDocument();
});
