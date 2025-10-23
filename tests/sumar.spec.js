// Importar la función sumar directamente
import sumar from '../src/utils/sumar.js';

describe('Función Sumar', function() {
  
  it('debe sumar dos números positivos correctamente', function() {
    const resultado = sumar(2, 3);
    expect(resultado).toBe(5);
  });

  it('debe sumar un número positivo y uno negativo', function() {
    const resultado = sumar(5, -3);
    expect(resultado).toBe(2);
  });

  it('debe sumar dos números negativos', function() {
    const resultado = sumar(-2, -3);
    expect(resultado).toBe(-5);
  });

  it('debe sumar números decimales', function() {
    const resultado = sumar(2.5, 3.7);
    expect(resultado).toBeCloseTo(6.2, 1);
  });

  it('debe manejar el cero correctamente', function() {
    expect(sumar(0, 5)).toBe(5);
    expect(sumar(5, 0)).toBe(5);
    expect(sumar(0, 0)).toBe(0);
  });

  it('debe manejar números grandes', function() {
    const resultado = sumar(1000000, 2000000);
    expect(resultado).toBe(3000000);
  });

  it('debe retornar un número', function() {
    const resultado = sumar(1, 2);
    expect(typeof resultado).toBe('number');
  });

  it('debe ser conmutativa (a + b = b + a)', function() {
    const a = 7;
    const b = 13;
    expect(sumar(a, b)).toBe(sumar(b, a));
  });

});