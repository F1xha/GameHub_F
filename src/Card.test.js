import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Card from './components/Card';

test('renderiza el título y el contenido en Card', () => {
  render(<Card title="Juego Alpha">Contenido de prueba</Card>);
  expect(screen.getByText('Juego Alpha')).toBeInTheDocument();
  expect(screen.getByText('Contenido de prueba')).toBeInTheDocument();
});

test('dispara onClick al hacer click en la tarjeta', () => {
  const handleClick = jest.fn();
  render(<Card title="Click Card" onClick={handleClick}>Texto</Card>);
  const card = screen.getByText('Click Card').closest('article');
  fireEvent.click(card);
  expect(handleClick).toHaveBeenCalled();
});
