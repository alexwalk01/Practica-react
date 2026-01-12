function Parrafo({ contenido, color, tamaño, fuente }) {
  return (
    <p
      style={{
        color: color,
        fontSize: tamaño,
        fontFamily: fuente,
      }}
    >
      {contenido}
    </p>
  );
}

export default Parrafo;
