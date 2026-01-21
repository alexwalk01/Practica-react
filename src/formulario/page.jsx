'use client';

import React, { useState } from 'react';
import {
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  Container,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Row,
  Col,
  FormFeedback,
  FormText,
  Table,
} from 'reactstrap';

export default function FormularioRegistro() {
  const estadoInicial = {
    nombre: '',
    apellido: '',
    email: '',
    password: '',
    edad: '',
    genero: '',
    rol: '',
    opciones: false,
    notas: '',
    fecha: '',
  };

  const [form, setForm] = useState(estadoInicial);
  const [registros, setRegistros] = useState([]);
  const [modal, setModal] = useState(false);
  const [modalEditar, setModalEditar] = useState(false);
  const [registroEditando, setRegistroEditando] = useState(null);
  const [touched, setTouched] = useState({});

  // ============ FUNCIONES DE VALIDACIÓN ============

  const validarNombre = (nombre) => {
    if (!nombre || nombre.trim() === '') return false;
    const regex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/;
    return regex.test(nombre);
  };

  const validarApellido = (apellido) => {
    if (!apellido || apellido.trim() === '') return false;
    const regex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/;
    return regex.test(apellido);
  };

  const validarEmail = (email) => {
    if (!email || email.trim() === '') return false;
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const validarEdad = (edad) => {
    if (!edad || edad.trim() === '') return false;
    const numero = parseInt(edad);
    return !isNaN(numero) && numero > 0 && numero <= 100;
  };

  const validarFecha = (fecha) => {
    if (!fecha) return false;

    const [año, mes, dia] = fecha.split('-');
    const fechaSeleccionada = new Date(año, mes - 1, dia);

    const hoy = new Date();
    hoy.setHours(0, 0, 0, 0);

    return fechaSeleccionada >= hoy;
  };

  // ============ MANEJADORES ============

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({
      ...form,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched({
      ...touched,
      [name]: true,
    });
  };

  const guardarRegistro = () => {
    // Validar que todos los campos requeridos estén llenos
    const camposRequeridos = ['nombre', 'apellido', 'email', 'edad', 'fecha'];
    const camposVacios = camposRequeridos.filter(
      (campo) => !form[campo] || form[campo].trim() === '',
    );

    if (camposVacios.length > 0) {
      alert('Por favor, rellena todos los campos requeridos antes de guardar.');
      const allTouched = {};
      camposRequeridos.forEach((campo) => {
        allTouched[campo] = true;
      });
      setTouched(allTouched);
      return;
    }

    // Validar que los campos llenos sean válidos
    if (
      !validarNombre(form.nombre) ||
      !validarApellido(form.apellido) ||
      !validarEmail(form.email) ||
      !validarEdad(form.edad) ||
      !validarFecha(form.fecha)
    ) {
      alert(
        'Por favor, corrige los errores en el formulario antes de continuar.',
      );
      return;
    }

    // Guardar el registro con un ID único
    const nuevoRegistro = {
      ...form,
      id: Date.now(),
    };

    setRegistros([...registros, nuevoRegistro]);
    reiniciarForm();
    alert('Registro guardado exitosamente');
  };

  const toggleModal = () => setModal(!modal);

  const reiniciarForm = () => {
    setForm(estadoInicial);
    setTouched({});
  };

  const obtenerFechaMinima = () => {
    const hoy = new Date();
    const año = hoy.getFullYear();
    const mes = String(hoy.getMonth() + 1).padStart(2, '0');
    const dia = String(hoy.getDate()).padStart(2, '0');
    return `${año}-${mes}-${dia}`;
  };

  const mostrarValidacion = (campo, validador) => {
    if (!touched[campo]) return {};

    const valor = form[campo];
    const esValido = validador(valor);

    return {
      valid: esValido,
      invalid: !esValido,
    };
  };

  // ============ FUNCIONES DE TABLA ============

  const eliminarRegistro = (id) => {
    if (window.confirm('¿Estás seguro de que deseas eliminar este registro?')) {
      setRegistros(registros.filter((registro) => registro.id !== id));
    }
  };

  const abrirModalEditar = (registro) => {
    setRegistroEditando(registro);
    setForm(registro);
    setModalEditar(true);
  };

  const cerrarModalEditar = () => {
    setModalEditar(false);
    setRegistroEditando(null);
    reiniciarForm();
  };

  const guardarEdicion = () => {
    // Validar campos
    const camposRequeridos = ['nombre', 'apellido', 'email', 'edad', 'fecha'];
    const camposVacios = camposRequeridos.filter(
      (campo) => !form[campo] || form[campo].trim() === '',
    );

    if (camposVacios.length > 0) {
      alert('Por favor, rellena todos los campos requeridos.');
      return;
    }

    if (
      !validarNombre(form.nombre) ||
      !validarApellido(form.apellido) ||
      !validarEmail(form.email) ||
      !validarEdad(form.edad) ||
      !validarFecha(form.fecha)
    ) {
      alert('Por favor, corrige los errores en el formulario.');
      return;
    }

    // Actualizar el registro
    const registrosActualizados = registros.map((registro) =>
      registro.id === registroEditando.id
        ? { ...form, id: registro.id }
        : registro,
    );

    setRegistros(registrosActualizados);
    cerrarModalEditar();
    alert('Registro actualizado exitosamente');
  };

  return (
    <Container
      className="bg-white p-5 rounded"
      style={{ minHeight: '100vh', color: 'black' }}
    >
      <h1 className="mb-4">Formulario de Registro</h1>

      <Form>
        <Row>
          <Col md={6}>
            <FormGroup>
              <Label for="nombre">Nombre *</Label>
              <Input
                id="nombre"
                name="nombre"
                value={form.nombre}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="Ej: Juan"
                {...mostrarValidacion('nombre', validarNombre)}
              />
              <FormFeedback valid>¡Perfecto! El nombre es válido</FormFeedback>
              <FormFeedback>
                {!form.nombre || form.nombre.trim() === ''
                  ? 'Por favor, rellena este campo'
                  : 'Este campo solo acepta letras'}
              </FormFeedback>
              <FormText>Ingresa tu nombre completo</FormText>
            </FormGroup>
          </Col>
          <Col md={6}>
            <FormGroup>
              <Label for="apellido">Apellido *</Label>
              <Input
                id="apellido"
                name="apellido"
                value={form.apellido}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="Ej: Pérez"
                {...mostrarValidacion('apellido', validarApellido)}
              />
              <FormFeedback valid>
                ¡Perfecto! El apellido es válido
              </FormFeedback>
              <FormFeedback>
                {!form.apellido || form.apellido.trim() === ''
                  ? 'Por favor, rellena este campo'
                  : 'Este campo solo acepta letras'}
              </FormFeedback>
              <FormText>Ingresa tu apellido completo</FormText>
            </FormGroup>
          </Col>
        </Row>

        <FormGroup>
          <Label for="email">Email *</Label>
          <Input
            id="email"
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="ejemplo@correo.com"
            {...mostrarValidacion('email', validarEmail)}
          />
          <FormFeedback valid>¡Excelente! El correo es válido</FormFeedback>
          <FormFeedback>
            {!form.email || form.email.trim() === ''
              ? 'Por favor, rellena este campo'
              : 'Debe tener formato de correo electrónico válido (ejemplo@dominio.com)'}
          </FormFeedback>
          <FormText>Usaremos este correo para contactarte</FormText>
        </FormGroup>

        <FormGroup>
          <Label for="password">Contraseña</Label>
          <Input
            id="password"
            name="password"
            type="password"
            value={form.password}
            onChange={handleChange}
            placeholder="••••••••"
          />
          <FormText>Debe tener al menos 8 caracteres</FormText>
        </FormGroup>

        <FormGroup>
          <Label for="edad">Edad *</Label>
          <Input
            id="edad"
            name="edad"
            type="number"
            value={form.edad}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="Ej: 25"
            {...mostrarValidacion('edad', validarEdad)}
          />
          <FormFeedback valid>¡Perfecto! La edad es válida</FormFeedback>
          <FormFeedback>
            {!form.edad || form.edad.trim() === ''
              ? 'Por favor, rellena este campo'
              : 'Este campo solo acepta números positivos del 1 al 100'}
          </FormFeedback>
          <FormText>Debes ser mayor de edad para registrarte</FormText>
        </FormGroup>

        <FormGroup tag="fieldset">
          <Label>Género</Label>
          <FormGroup check>
            <Input
              id="generoMasculino"
              name="genero"
              type="radio"
              checked={form.genero === 'masculino'}
              value="masculino"
              onChange={handleChange}
            />{' '}
            <Label check for="generoMasculino">
              Masculino
            </Label>
          </FormGroup>
          <FormGroup check>
            <Input
              id="generoFemenino"
              name="genero"
              type="radio"
              checked={form.genero === 'femenino'}
              value="femenino"
              onChange={handleChange}
            />{' '}
            <Label check for="generoFemenino">
              Femenino
            </Label>
          </FormGroup>
        </FormGroup>

        <FormGroup>
          <Label for="rol">Rol</Label>
          <Input
            id="rol"
            type="select"
            name="rol"
            value={form.rol}
            onChange={handleChange}
          >
            <option value="">Selecciona un rol</option>
            <option value="Admin">Administrador</option>
            <option value="Usuario">Usuario</option>
          </Input>
          <FormText>Selecciona el rol que mejor se adapte a ti</FormText>
        </FormGroup>

        <FormGroup check className="mb-3">
          <Input
            id="opciones"
            type="checkbox"
            name="opciones"
            checked={form.opciones}
            onChange={handleChange}
          />
          <Label check for="opciones">
            Aceptar términos y condiciones
          </Label>
        </FormGroup>

        <FormGroup>
          <Label for="notas">Notas</Label>
          <Input
            id="notas"
            type="textarea"
            name="notas"
            value={form.notas}
            onChange={handleChange}
            placeholder="Escribe cualquier comentario adicional..."
            rows="4"
          />
          <FormText>Campo opcional para información adicional</FormText>
        </FormGroup>

        <FormGroup>
          <Label for="fecha">Fecha de registro *</Label>
          <Input
            id="fecha"
            type="date"
            name="fecha"
            value={form.fecha}
            onChange={handleChange}
            onBlur={handleBlur}
            min={obtenerFechaMinima()}
            {...mostrarValidacion('fecha', validarFecha)}
          />
          <FormFeedback valid>¡Perfecto! La fecha es válida</FormFeedback>
          <FormFeedback>
            {!form.fecha
              ? 'Por favor, rellena este campo'
              : 'Solo se aceptan fechas a partir del día de hoy'}
          </FormFeedback>
          <FormText>Selecciona una fecha de registro</FormText>
        </FormGroup>

        <div className="mt-4">
          <Button color="success" className="me-2" onClick={guardarRegistro}>
            Guardar
          </Button>
          <Button color="primary" className="me-2" onClick={toggleModal}>
            Mostrar JSON
          </Button>
          <Button color="secondary" onClick={reiniciarForm}>
            Reiniciar
          </Button>
        </div>
      </Form>

      {/* TABLA DE REGISTROS */}
      {registros.length > 0 && (
        <div className="mt-5">
          <h2 className="mb-3">Registros Guardados</h2>
          <Table striped bordered hover responsive>
            <thead>
              <tr>
                <th>#</th>
                <th>Nombre</th>
                <th>Apellido</th>
                <th>Email</th>
                <th>Edad</th>
                <th>Género</th>
                <th>Rol</th>
                <th>Fecha</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {registros.map((registro, index) => (
                <tr key={registro.id}>
                  <td>{index + 1}</td>
                  <td>{registro.nombre}</td>
                  <td>{registro.apellido}</td>
                  <td>{registro.email}</td>
                  <td>{registro.edad}</td>
                  <td>{registro.genero || 'N/A'}</td>
                  <td>{registro.rol || 'N/A'}</td>
                  <td>{registro.fecha}</td>
                  <td>
                    <Button
                      color="warning"
                      size="sm"
                      className="me-2"
                      onClick={() => abrirModalEditar(registro)}
                      title="Editar"
                    >
                      Editar
                    </Button>
                    <Button
                      color="danger"
                      size="sm"
                      onClick={() => eliminarRegistro(registro.id)}
                      title="Eliminar"
                    >
                      Eliminar
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      )}

      {/* MODAL PARA MOSTRAR JSON */}
      <Modal isOpen={modal} toggle={toggleModal}>
        <ModalHeader toggle={toggleModal}>
          Datos del Formulario (JSON)
        </ModalHeader>
        <ModalBody>
          <pre>{JSON.stringify(form, null, 2)}</pre>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={toggleModal}>
            Cerrar
          </Button>
        </ModalFooter>
      </Modal>

      {/* MODAL PARA EDITAR */}
      <Modal isOpen={modalEditar} toggle={cerrarModalEditar} size="lg">
        <ModalHeader toggle={cerrarModalEditar}>Editar Registro</ModalHeader>
        <ModalBody>
          <Form>
            <Row>
              <Col md={6}>
                <FormGroup>
                  <Label for="editNombre">Nombre *</Label>
                  <Input
                    id="editNombre"
                    name="nombre"
                    value={form.nombre}
                    onChange={handleChange}
                    placeholder="Ej: Juan"
                  />
                </FormGroup>
              </Col>
              <Col md={6}>
                <FormGroup>
                  <Label for="editApellido">Apellido *</Label>
                  <Input
                    id="editApellido"
                    name="apellido"
                    value={form.apellido}
                    onChange={handleChange}
                    placeholder="Ej: Pérez"
                  />
                </FormGroup>
              </Col>
            </Row>

            <FormGroup>
              <Label for="editEmail">Email *</Label>
              <Input
                id="editEmail"
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
              />
            </FormGroup>

            <FormGroup>
              <Label for="editEdad">Edad *</Label>
              <Input
                id="editEdad"
                name="edad"
                type="number"
                value={form.edad}
                onChange={handleChange}
              />
            </FormGroup>

            <FormGroup tag="fieldset">
              <Label>Género</Label>
              <FormGroup check>
                <Input
                  name="genero"
                  type="radio"
                  checked={form.genero === 'masculino'}
                  value="masculino"
                  onChange={handleChange}
                />{' '}
                Masculino
              </FormGroup>
              <FormGroup check>
                <Input
                  name="genero"
                  type="radio"
                  checked={form.genero === 'femenino'}
                  value="femenino"
                  onChange={handleChange}
                />{' '}
                Femenino
              </FormGroup>
            </FormGroup>

            <FormGroup>
              <Label for="editRol">Rol</Label>
              <Input
                id="editRol"
                type="select"
                name="rol"
                value={form.rol}
                onChange={handleChange}
              >
                <option value="">Selecciona un rol</option>
                <option value="Admin">Administrador</option>
                <option value="Usuario">Usuario</option>
              </Input>
            </FormGroup>

            <FormGroup>
              <Label for="editFecha">Fecha de registro *</Label>
              <Input
                id="editFecha"
                type="date"
                name="fecha"
                value={form.fecha}
                onChange={handleChange}
                min={obtenerFechaMinima()}
              />
            </FormGroup>

            <FormGroup>
              <Label for="editNotas">Notas</Label>
              <Input
                id="editNotas"
                type="textarea"
                name="notas"
                value={form.notas}
                onChange={handleChange}
                rows="3"
              />
            </FormGroup>
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={guardarEdicion}>
            Guardar Cambios
          </Button>
          <Button color="secondary" onClick={cerrarModalEditar}>
            Cancelar
          </Button>
        </ModalFooter>
      </Modal>
    </Container>
  );
}
