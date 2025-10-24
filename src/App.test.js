// src/App.test.js
import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import '@testing-library/jest-dom';
import App from './App';

test('muestra enlaces del navbar', () => {
  render(
    <MemoryRouter initialEntries={['/']}>
      <App />
    </MemoryRouter>
  );
  expect(screen.getByText(/Inicio/i)).toBeInTheDocument();
  expect(screen.getByText(/Catálogo/i)).toBeInTheDocument();
});
