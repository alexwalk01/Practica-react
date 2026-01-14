function Titulo({ texto, color, tamaño, fuente }) {
  return (
    <h1
      style={{
        color: color,
        fontSize: tamaño,
        fontFamily: fuente,
        borderBottom: '2px solid #000',
        paddingBottom: '10px',
      }}
    >
      {texto}
    </h1>
  );
}

export default Titulo;
