import { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [seleccionados, setSeleccionados] = useState([]);

  useEffect(() => {
    const guardados = localStorage.getItem('rifaSeleccionados');
    if (guardados) setSeleccionados(JSON.parse(guardados));
  }, []);

  useEffect(() => {
    localStorage.setItem('rifaSeleccionados', JSON.stringify(seleccionados));
  }, [seleccionados]);

  const manejarSeleccion = (numero) => {
    if (!seleccionados.includes(numero)) {
      setSeleccionados([...seleccionados, numero]);
    }
  };

  const reiniciar = () => {
    setSeleccionados([]);
    localStorage.removeItem('rifaSeleccionados');
  };

  return (
    <div className="contenedor">
      <header className="encabezado">
        <h1>🎉 Golden Raffle 💰</h1>
        <p>Elige tu número de la suerte del 1 al 100</p>
      </header>

      <h2>Tablero de Rifa</h2>
      <div className="tablero">
        {Array.from({ length: 100 }, (_, i) => i + 1).map((num) => (
          <button
            key={num}
            onClick={() => manejarSeleccion(num)}
            disabled={seleccionados.includes(num)}
            className={seleccionados.includes(num) ? 'btn seleccionado' : 'btn disponible'}
          >
            {seleccionados.includes(num) ? '💸' : num}
          </button>
        ))}
      </div>

      <div className="info">
        <h3>Números seleccionados:</h3>
        <p>{seleccionados.length > 0 ? seleccionados.join(', ') : 'Ninguno aún'}</p>
        <button onClick={reiniciar} className="reiniciar">
          Reiniciar Rifa
        </button>
      </div>
    </div>
  );
}

export default App;
