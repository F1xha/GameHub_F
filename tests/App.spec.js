// tests/App.spec.js (Jasmine + Karma)
// Testea routing básico renderizando textos de páginas
import React from 'react';
import ReactDOM from 'react-dom';
import { MemoryRouter } from 'react-router-dom';
import App from '../src/App';

describe('App routing (Jasmine)', () => {
  let container;
  beforeEach(() => { container = document.createElement('div'); document.body.appendChild(container); });
  afterEach(() => { ReactDOM.unmountComponentAtNode(container); container.remove(); container = null; });

  it('renderiza Inicio en "/"', () => {
    ReactDOM.render(
      <MemoryRouter initialEntries={['/']}>
        <App />
      </MemoryRouter>,
      container
    );
    expect(container.textContent).toContain('Bienvenido a GameHub');
  });

  it('renderiza Catálogo en "/catalogo"', () => {
    ReactDOM.render(
      <MemoryRouter initialEntries={['/catalogo']}>
        <App />
      </MemoryRouter>,
      container
    );
    expect(container.textContent).toContain('Catálogo de Juegos');
  });
});
