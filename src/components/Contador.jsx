'use client';

import { useState } from 'react';

function Contador() {
  const [contador, setContador] = useState(0);

  return (
    <div style={{ color: 'white' }}>
      <p style={{ color: 'white' }}>Contador: {contador}</p>
      <button onClick={() => setContador(contador + 1)}>Aumentar</button>
    </div>
  );
}

export default Contador;
