'use client';

import { useState } from 'react';

function CambiarImagen() {
  const [imagen, setImagen] = useState('/react.png');

  const cambiarImagen = () => {
    setImagen(imagen === '/react.png' ? '/nodejs.png' : '/react.png');
  };

  return (
    <div style={{ color: 'white' }}>
      <img src={imagen} width="300" />
      <br />
      <button onClick={cambiarImagen}>Cambiar imagen</button>
    </div>
  );
}

export default CambiarImagen;
