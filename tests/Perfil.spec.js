// tests/Perfil.spec.js (Jasmine + Karma)
// Verifica que la UI de Perfil muestre formularios sin sesión y cambie tras registrarse
import React from 'react';
import ReactDOM from 'react-dom';
import Perfil from '../src/pages/Perfil';

describe('Perfil (UI simple)', () => {
  let container;
  beforeEach(() => { container = document.createElement('div'); document.body.appendChild(container); localStorage.clear(); });
  afterEach(() => { ReactDOM.unmountComponentAtNode(container); container.remove(); container = null; });

  it('muestra login y registro cuando no hay sesión', () => {
    ReactDOM.render(<Perfil />, container);
    expect(container.querySelector('[data-testid="form-login"]')).not.toBeNull();
    expect(container.querySelector('[data-testid="form-register"]')).not.toBeNull();
  });

  it('permite registrarse y muestra los datos del usuario', () => {
    ReactDOM.render(<Perfil />, container);
    // Completar registro (dispara eventos de input)
    const name = container.querySelector('[data-testid="reg-nombre"]');
    const email = container.querySelector('[data-testid="reg-email"]');
    const pass = container.querySelector('[data-testid="reg-password"]');
    name.value = 'Bryan'; name.dispatchEvent(new Event('input', { bubbles: true }));
    email.value = 'bryan@test.com'; email.dispatchEvent(new Event('input', { bubbles: true }));
    pass.value = '1234'; pass.dispatchEvent(new Event('input', { bubbles: true }));
    // Enviar form
    container.querySelector('[data-testid="reg-submit"]').click();
    // Debe pasar a estado autenticado
    expect(container.textContent).toContain('Mi Perfil');
    expect(container.textContent).toContain('Bryan');
    expect(container.querySelector('[data-testid="logout-btn"]')).not.toBeNull();
  });
});
