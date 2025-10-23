import logo from './logo.svg';
import './App.css';
import { useState } from 'react';
import sumar from './utils/sumar';

function App() {
  const [a, setA] = useState('');
  const [b, setB] = useState('');
  const [resultado, setResultado] = useState('');

  const handleSumar = () => {
    const numeroA = parseFloat(a);
    const numeroB = parseFloat(b);
    
    if (!isNaN(numeroA) && !isNaN(numeroB)) {
      const suma = sumar(numeroA, numeroB);
      setResultado(suma);
    } else {
      setResultado('Por favor ingresa números válidos');
    }
  };

  return (
    <div className="App">
      <h2>Calculadora de Suma</h2>
      <div>
        <label>
          Número A: 
          <input 
            type="number" 
            value={a} 
            onChange={(e) => setA(e.target.value)}
            placeholder="Ingresa el primer número"
          />
        </label>
      </div>
      <div>
        <label>
          Número B: 
          <input 
            type="number" 
            value={b} 
            onChange={(e) => setB(e.target.value)}
            placeholder="Ingresa el segundo número"
          />
        </label>
      </div>
      <div>
        <button onClick={handleSumar}>Sumar</button>
      </div>
      {resultado !== '' && (
        <div>
          <h3>Resultado: {resultado}</h3>
        </div>
      )}
    </div>
  );
}

export default App;
