'use client';
import Titulo from '@/components/Titulo';
import Parrafo from '@/components/Parrafo';
import Imagen from '@/components/Imagen';
import Contador from '@/components/Contador';
import CambiarImagen from '@/components/CambiarImagen';
import CambiarFondo from '@/components/CambiarFondo';
import ToastAzul from '@/components/ToastAzul';
import ModalEjemplo from '@/components/Modal';
import TablaDatos from '@/components/TablaDatos';

export default function Home() {
  return (
    <main style={{ padding: '40px' }}>
      <center>
        <Titulo
          texto="Práctica de Componentes en React"
          color="#38bdf8"
          tamaño="40px"
          fuente="Verdana"
        />

        <Parrafo
          contenido="Este proyecto demuestra el uso de props para personalizar componentes."
          color="#e5e7eb"
          tamaño="18px"
          fuente="Arial"
        />

        <Imagen src="/react.png" alt="Imagen de ejemplo" ancho="300" />
        <hr style={{ color: 'white' }} />

        <Contador />
        <hr style={{ color: 'white' }} />

        <CambiarImagen />
        <hr style={{ color: 'white' }} />

        <CambiarFondo />
        <hr style={{ color: 'white' }} />

        <ToastAzul />
        <hr style={{ color: 'white' }} />

        <ModalEjemplo />
        <hr style={{ color: 'white' }} />

        <TablaDatos />
        <hr style={{ color: 'white' }} />
      </center>
    </main>
  );
}
