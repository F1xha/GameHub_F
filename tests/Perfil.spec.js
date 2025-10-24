import React from 'react';
import ReactDOM from 'react-dom';
import Perfil from '../src/pages/Perfil';

describe('Perfil (UI auth)', () => {
  let container;
  beforeEach(() => {
    container = document.createElement('div');
    document.body.appendChild(container);
    localStorage.clear();
  });
  afterEach(() => {
    ReactDOM.unmountComponentAtNode(container);
    container.remove();
    container = null;
  });

  it('muestra formularios de login/registro cuando no estás autenticado', () => {
    ReactDOM.render(<Perfil />, container);
    expect(container.querySelector('[data-testid="form-login"]')).not.toBeNull();
    expect(container.querySelector('[data-testid="form-register"]')).not.toBeNull();
  });

  it('después de registrarte, muestra datos del usuario y botón de cerrar sesión', () => {
    ReactDOM.render(<Perfil />, container);

    // Completar formulario de registro
    const name = container.querySelector('[data-testid="reg-name"]');
    const email = container.querySelector('[data-testid="reg-email"]');
    const pass = container.querySelector('[data-testid="reg-password"]');
    name.value = 'Ana'; name.dispatchEvent(new Event('input', { bubbles: true }));
    email.value = 'ana@example.com'; email.dispatchEvent(new Event('input', { bubbles: true }));
    pass.value = '1234'; pass.dispatchEvent(new Event('input', { bubbles: true }));

    const submit = container.querySelector('[data-testid="reg-submit"]');
    submit.click();

    // Debe pasar a estado autenticado
    expect(container.textContent).toContain('Mi Perfil');
    expect(container.textContent).toContain('Ana');
    expect(container.querySelector('[data-testid="logout-btn"]')).not.toBeNull();
  });
});
