'use client';

import { useState, useEffect } from 'react';

function CambiarFondo() {
  const [color, setColor] = useState(true);

  useEffect(() => {
    document.body.style.backgroundColor = color ? '#1c2b2d' : '#0f172a';
  }, [color]);

  return (
    <button style={{ color: 'white' }} onClick={() => setColor(!color)}>
      Cambiar fondo
    </button>
  );
}

export default CambiarFondo;
