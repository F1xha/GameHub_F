import { registrar, login, logout, isAutenticado, getUsuario } from '../src/utils/auth';

describe('Auth simple (localStorage)', () => {
  beforeEach(() => localStorage.clear());

  it('registra y auto-inicia sesión', () => {
    const r = registrar('Bryan', 'bryan@test.com', '1234');
    expect(r.ok).toBeTrue();
    expect(isAutenticado()).toBeTrue();
    expect(getUsuario().email).toBe('bryan@test.com');
  });

  it('evita duplicado por email', () => {
    registrar('Bryan', 'bryan@test.com', '1234');
    const r2 = registrar('Otro', 'bryan@test.com', 'xxxx');
    expect(r2.ok).toBeFalse();
  });

  it('login válido/invalid', () => {
    registrar('Bryan', 'bryan@test.com', '1234');
    logout();
    const ok = login('bryan@test.com', '1234');
    expect(ok.ok).toBeTrue();

    logout();
    const bad = login('bryan@test.com', 'wrong');
    expect(bad.ok).toBeFalse();
  });
});
