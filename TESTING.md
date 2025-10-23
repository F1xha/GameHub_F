# Pruebas Unitarias con Jasmine y Karma

Este proyecto incluye pruebas unitarias para la función `sumar` utilizando Jasmine como framework de testing y Karma como test runner.

## Configuración

### Dependencias instaladas:
- `jasmine`: Framework de testing
- `karma`: Test runner
- `karma-jasmine`: Plugin de Karma para Jasmine
- `karma-chrome-launcher`: Para ejecutar pruebas en Chrome
- `karma-webpack`: Para procesar módulos ES6
- `babel-loader`: Para transpilar código ES6

## Estructura de Archivos

```
├── src/
│   └── utils/
│       └── sumar.js          # Función a probar
├── tests/
│   └── sumar.spec.js         # Pruebas unitarias
├── karma.conf.js             # Configuración de Karma
└── package.json              # Scripts de testing
```

## Pruebas Implementadas

La función `sumar(a, b)` se prueba con los siguientes casos:

1. **Números positivos**: `sumar(2, 3) = 5`
2. **Número positivo y negativo**: `sumar(5, -3) = 2`
3. **Dos números negativos**: `sumar(-2, -3) = -5`
4. **Números decimales**: `sumar(2.5, 3.7) ≈ 6.2`
5. **Manejo del cero**: 
   - `sumar(0, 5) = 5`
   - `sumar(5, 0) = 5`
   - `sumar(0, 0) = 0`
6. **Números grandes**: `sumar(1000000, 2000000) = 3000000`
7. **Tipo de retorno**: Verifica que retorna un número
8. **Propiedad conmutativa**: `sumar(a, b) = sumar(b, a)`

## Comandos Disponibles

### Ejecutar pruebas una sola vez:
```bash
npm run test:karma:single
```

### Ejecutar pruebas en modo watch (se re-ejecutan al cambiar archivos):
```bash
npm run test:karma
```

## Resultados

Todas las pruebas pasaron exitosamente:
- ✅ 8 pruebas ejecutadas
- ✅ 8 pruebas exitosas
- ✅ 0 fallos

## Configuración de Karma

El archivo `karma.conf.js` está configurado para:
- Usar Jasmine como framework de testing
- Ejecutar pruebas en Chrome
- Procesar archivos ES6 con Webpack y Babel
- Generar source maps para debugging
- Ejecutar solo los archivos de prueba en `tests/**/*.spec.js`