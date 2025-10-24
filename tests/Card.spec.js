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

  it('renderiza el título y el contenido', () => {
    ReactDOM.render(<Card title="Juego Alpha">Contenido</Card>, container);
    const title = container.querySelector('h3');
    expect(title).not.toBeNull();
    expect(title.textContent).toBe('Juego Alpha');
    expect(container.textContent).toContain('Contenido');
  });

  it('dispara onClick cuando se hace click en la tarjeta', () => {
    const onClick = jasmine.createSpy('onClick');
    ReactDOM.render(<Card title="Click" onClick={onClick}>X</Card>, container);
    const article = container.querySelector('.card');
    expect(article).not.toBeNull();
    article.click();
    expect(onClick).toHaveBeenCalled();
  });
});
