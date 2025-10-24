import React from 'react';
import ReactDOM from 'react-dom';
import Perfil from '../src/pages/Perfil';

describe('Perfil (UI simple)', () => {
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

  it('muestra login y registro cuando no hay sesión', () => {
    ReactDOM.render(<Perfil />, container);
    expect(container.querySelector('[data-testid="form-login"]')).not.toBeNull();
    expect(container.querySelector('[data-testid="form-register"]')).not.toBeNull();
  });

  it('permite registrarse y muestra los datos del usuario', () => {
    ReactDOM.render(<Perfil />, container);
    container.querySelector('[data-testid="reg-nombre"]').value = 'Bryan';
    container.querySelector('[data-testid="reg-email"]').value = 'bryan@test.com';
    container.querySelector('[data-testid="reg-password"]').value = '1234';
    container.querySelector('[data-testid="reg-submit"]').click();

    expect(container.textContent).toContain('Mi Perfil');
    expect(container.textContent).toContain('Bryan');
    expect(container.querySelector('[data-testid="logout-btn"]')).not.toBeNull();
  });
});
