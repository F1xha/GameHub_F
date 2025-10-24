// tests/auth.spec.js (Jasmine + Karma)
// Comprueba el flujo de registro/login/logout con localStorage
import { registrar, login, logout, isAutenticado, getUsuario } from '../src/utils/auth';

describe('Auth simple (localStorage)', () => {
  beforeEach(() => localStorage.clear());

  it('registra y auto-inicia sesión', () => {
    const r = registrar({ nombre: 'Bryan', email: 'bryan@test.com', password: '1234' });
    expect(r.ok).toBeTrue();
    expect(isAutenticado()).toBeTrue();
    expect(getUsuario().email).toBe('bryan@test.com');
  });

  it('evita duplicado por email', () => {
    registrar({ nombre: 'Bryan', email: 'bryan@test.com', password: '1234' });
    const r2 = registrar({ nombre: 'Otro', email: 'bryan@test.com', password: 'xxxx' });
    expect(r2.ok).toBeFalse();
  });

  it('login válido/invalid', () => {
    registrar({ nombre: 'Bryan', email: 'bryan@test.com', password: '1234' });
    logout();
    const ok = login({ email: 'bryan@test.com', password: '1234' });
    expect(ok.ok).toBeTrue();

    logout();
    const bad = login({ email: 'bryan@test.com', password: 'wrong' });
    expect(bad.ok).toBeFalse();
  });
});
