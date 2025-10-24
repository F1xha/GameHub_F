import { login, registerUser, getCurrentUser, isAuthenticated, logout } from '../src/utils/auth';

describe('Auth (localStorage)', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('registra y auto-inicia sesión', () => {
    const res = registerUser({ name: 'Ana', email: 'ana@example.com', password: '1234' });
    expect(res.ok).toBeTrue();
    expect(isAuthenticated()).toBeTrue();
    expect(getCurrentUser().email).toBe('ana@example.com');
  });

  it('evita registrar un correo duplicado', () => {
    registerUser({ name: 'Ana', email: 'ana@example.com', password: '1234' });
    const dup = registerUser({ name: 'Ana2', email: 'ana@example.com', password: 'xx' });
    expect(dup.ok).toBeFalse();
  });

  it('inicia sesión con credenciales válidas', () => {
    registerUser({ name: 'Ana', email: 'ana@example.com', password: '1234' });
    logout();
    const res = login({ email: 'ana@example.com', password: '1234' });
    expect(res.ok).toBeTrue();
    expect(getCurrentUser().name).toBe('Ana');
  });

  it('falla con credenciales inválidas', () => {
    const res = login({ email: 'x@example.com', password: 'bad' });
    expect(res.ok).toBeFalse();
  });
});
