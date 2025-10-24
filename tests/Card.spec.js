import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Card from '../components/Card';

describe('Card component', () => {
  it('muestra el título y children', () => {
    render(<Card title="Test">Contenido de prueba</Card>);
    expect(screen.getByText('Test')).toBeInTheDocument();
    expect(screen.getByText('Contenido de prueba')).toBeInTheDocument();
  });

  it('si se hace clic llama al onClick', () => {
    const fn = jest.fn();
    render(<Card title="Click" onClick={fn}>X</Card>);
    fireEvent.click(screen.getByRole('article'));
    expect(fn).toHaveBeenCalled();
  });
});
