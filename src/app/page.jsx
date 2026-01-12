import Titulo from '@/components/Titulo';
import Parrafo from '@/components/Parrafo';
import Imagen from '@/components/Imagen';

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

        <Imagen src="/escritorio.jpg" alt="Imagen de ejemplo" ancho="300" />
      </center>
    </main>
  );
}
