import sumar from './utils/sumar';

describe('sumar (util)', () => {
  test('suma positivos', () => {
    expect(sumar(2, 3)).toBe(5);
  });

  test('soporta negativos y cero', () => {
    expect(sumar(-2, 3)).toBe(1);
    expect(sumar(0, 5)).toBe(5);
  });

  test('maneja decimales', () => {
    expect(sumar(2.5, 0.5)).toBe(3);
  });
});
