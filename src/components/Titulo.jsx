function Titulo({ texto, color, tamaño, fuente }) {
  return (
    <h1
      style={{
        color: color,
        fontSize: tamaño,
        fontFamily: fuente,
      }}
    >
      {texto}
    </h1>
  );
}

export default Titulo;
