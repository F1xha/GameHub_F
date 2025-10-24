import React from 'react';
import ReactDOM from 'react-dom';
import Card from '../src/components/Card';

describe('Card component (Jasmine)', () => {
  let container;
  beforeEach(() => {
    container = document.createElement('div');
    document.body.appendChild(container);
  });
  afterEach(() => {
    ReactDOM.unmountComponentAtNode(container);
    container.remove();
    container = null;
  });

  it('renderiza título y contenido', () => {
    ReactDOM.render(<Card title="Juego Alpha">Contenido</Card>, container);
    expect(container.querySelector('h3').textContent).toBe('Juego Alpha');
    expect(container.textContent).toContain('Contenido');
  });

  it('onClick se dispara al hacer click', () => {
    const onClick = jasmine.createSpy('onClick');
    ReactDOM.render(<Card title="Click" onClick={onClick}>X</Card>, container);
    container.querySelector('.card').click();
    expect(onClick).toHaveBeenCalled();
  });
});
