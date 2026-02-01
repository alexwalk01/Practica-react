import React, { useState } from 'react';
import { FaPencilAlt, FaTrashAlt } from 'react-icons/fa';
import {
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  FormFeedback,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Container,
  Row,
  Col,
  Table,
} from 'reactstrap';

const FormularioTravel = () => {
  const initialState = {
    nombre: '',
    apellido: '',
    email: '',
    password: '',
    edad: '',
    genero: null,
    rol: '',
    opciones: false,
    notas: '',
    fecha: '',
  };

  const [form, setForm] = useState(initialState);
  const [lista, setLista] = useState([]);
  const [modal, setModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [registroEditando, setRegistroEditando] = useState(null);

  // Lógica de validación (Se usa tanto para el form principal como para el de edición)
  const getValidation = (data) => ({
    nombre: /^[a-zA-ZÀ-ÿ\s]+$/.test(data.nombre) && data.nombre.length > 0,
    apellido:
      /^[a-zA-ZÀ-ÿ\s]+$/.test(data.apellido) && data.apellido.length > 0,
    email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email),
    edad: Number(data.edad) > 0 && Number(data.edad) <= 100,
    fecha: data.fecha >= new Date().toISOString().split('T')[0],
  });

  const validate = getValidation(form);

  const isFormValid = (data) => {
    const v = getValidation(data);
    return (
      v.nombre &&
      v.apellido &&
      v.email &&
      v.edad &&
      v.fecha &&
      data.password.length > 0 &&
      data.rol !== '' &&
      data.genero !== null
    );
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({ ...form, [name]: type === 'checkbox' ? checked : value });
  };

  //función tabla.

  const handleSave = () => {
    setLista([...lista, { ...form, id: Date.now() }]);
    setForm(initialState);
  };

  const handleEliminar = (id) => {
    setLista(lista.filter((item) => item.id !== id));
  };

  const abrirEdicion = (registro) => {
    setRegistroEditando({ ...registro }); //spread
    setEditModal(true);
  };

  const confirmarEdicion = () => {
    setLista(
      lista.map((item) =>
        item.id === registroEditando.id ? registroEditando : item,
      ),
    );
    setEditModal(false);
  };

  const handleReset = () => setForm(initialState);
  const toggleModal = () => setModal(!modal);

  return (
    <Container className="mt-4 p-4">
      <div className="p-4 border rounded bg-light mb-5">
        <h3>Formulario</h3>
        <Form>
          <Row>
            <Col md={6}>
              <FormGroup>
                <Label>Nombre</Label>
                <Input
                  name="nombre"
                  value={form.nombre}
                  onChange={handleChange}
                  valid={validate.nombre}
                  invalid={form.nombre !== '' && !validate.nombre}
                />
                <FormFeedback>Solo letras permitidas.</FormFeedback>
              </FormGroup>
            </Col>
            <Col md={6}>
              <FormGroup>
                <Label>Apellido</Label>
                <Input
                  name="apellido"
                  value={form.apellido}
                  onChange={handleChange}
                  valid={validate.apellido}
                  invalid={form.apellido !== '' && !validate.apellido}
                />
                <FormFeedback>Solo letras permitidas.</FormFeedback>
              </FormGroup>
            </Col>
          </Row>

          <FormGroup>
            <Label>Email</Label>
            <Input
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              valid={validate.email}
              invalid={form.email !== '' && !validate.email}
            />
            <FormFeedback>Formato de correo inválido.</FormFeedback>
          </FormGroup>

          <FormGroup>
            <Label>Contraseña</Label>
            <Input
              name="password"
              type="password"
              value={form.password}
              onChange={handleChange}
            />
          </FormGroup>

          <Row>
            <Col md={4}>
              <FormGroup>
                <Label>Edad</Label>
                <Input
                  name="edad"
                  type="number"
                  value={form.edad}
                  onChange={handleChange}
                  valid={validate.edad}
                  invalid={form.edad !== '' && !validate.edad}
                />
              </FormGroup>
            </Col>
            <Col md={4}>
              <FormGroup>
                <Label>Fecha de registro</Label>
                <Input
                  name="fecha"
                  type="date"
                  value={form.fecha}
                  onChange={handleChange}
                  valid={validate.fecha}
                  invalid={form.fecha !== '' && !validate.fecha}
                />
              </FormGroup>
            </Col>
            <Col md={4}>
              <FormGroup>
                <Label>Rol</Label>
                <Input
                  name="rol"
                  type="select"
                  value={form.rol}
                  onChange={handleChange}
                >
                  <option value="">Seleccionar...</option>
                  <option value="Admin">Administrador</option>
                  <option value="Agente">Agente de Ventas</option>
                </Input>
              </FormGroup>
            </Col>
          </Row>

          <FormGroup tag="fieldset">
            <Label>Género</Label>
            <FormGroup check>
              <Label check>
                <Input
                  type="radio"
                  name="genero"
                  value="Masculino"
                  checked={form.genero === 'Masculino'}
                  onChange={handleChange}
                />{' '}
                Masculino
              </Label>
            </FormGroup>
            <FormGroup check>
              <Label check>
                <Input
                  type="radio"
                  name="genero"
                  value="Femenino"
                  checked={form.genero === 'Femenino'}
                  onChange={handleChange}
                />{' '}
                Femenino
              </Label>
            </FormGroup>
          </FormGroup>

          <FormGroup check className="mb-3">
            <Label check>
              <Input
                type="checkbox"
                name="opciones"
                checked={form.opciones}
                onChange={handleChange}
              />{' '}
              Aceptar términos
            </Label>
          </FormGroup>

          <FormGroup>
            <Label>Notas</Label>
            <Input
              type="textarea"
              name="notas"
              value={form.notas}
              onChange={handleChange}
            />
          </FormGroup>

          <Button
            color="success"
            className="me-2"
            onClick={handleSave}
            disabled={!isFormValid(form)}
          >
            Guardar
          </Button>
          <Button
            color="primary"
            className="me-2"
            onClick={toggleModal}
            disabled={!isFormValid(form)}
          >
            Mostrar
          </Button>
          <Button color="secondary" onClick={handleReset}>
            Reiniciar
          </Button>
        </Form>
      </div>

      <h4>Registros Guardados</h4>
      <Table striped bordered hover responsive>
        <thead className="table-dark">
          <tr>
            <th>Nombre Completo</th>
            <th>Email</th>
            <th>Contraseña</th>
            <th>Edad</th>
            <th>Fecha de registro</th>
            <th>Rol</th>
            <th>Género</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {lista.map((item) => (
            <tr key={item.id}>
              <td>
                {item.nombre} {item.apellido}
              </td>
              <td>{item.email}</td>
              <td>{'•'.repeat(item.password ? item.password.length : 0)}</td>
              <td>{item.edad}</td>
              <td>{item.fecha}</td>
              <td>{item.rol}</td>
              <td>{item.genero}</td>
              <td>
                <Button
                  color="warning"
                  size="sm"
                  className="me-2"
                  onClick={() => abrirEdicion(item)}
                  style={{ display: 'inline-flex', alignItems: 'center' }}
                >
                  <FaPencilAlt className="me-1" /> Editar
                </Button>

                <Button
                  color="danger"
                  size="sm"
                  onClick={() => {
                    if (
                      window.confirm(
                        '¿Seguro que quieres eliminar este registro?',
                      )
                    ) {
                      handleEliminar(item.id);
                    }
                  }}
                  style={{ display: 'inline-flex', alignItems: 'center' }}
                >
                  <FaTrashAlt className="me-1" /> Eliminar
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal isOpen={modal} toggle={toggleModal}>
        <ModalHeader toggle={toggleModal}>Datos Registrados</ModalHeader>
        <ModalBody>
          <pre>{JSON.stringify(form, null, 2)}</pre>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={toggleModal}>
            Cerrar
          </Button>
        </ModalFooter>
      </Modal>

      <Modal isOpen={editModal} toggle={() => setEditModal(false)}>
        <ModalHeader>Editar Registro</ModalHeader>
        <ModalBody>
          {registroEditando && (
            <Form>
              <FormGroup>
                <Label>Nombre</Label>
                <Input
                  name="nombre"
                  value={registroEditando.nombre}
                  onChange={(e) =>
                    setRegistroEditando({
                      ...registroEditando,
                      nombre: e.target.value,
                    })
                  }
                />
              </FormGroup>
              <FormGroup>
                <Label>Apellido</Label>
                <Input
                  name="apellido"
                  value={registroEditando.apellido}
                  onChange={(e) =>
                    setRegistroEditando({
                      ...registroEditando,
                      apellido: e.target.value,
                    })
                  }
                />
              </FormGroup>
              <FormGroup>
                <Label>Email</Label>
                <Input
                  name="email"
                  value={registroEditando.email}
                  onChange={(e) =>
                    setRegistroEditando({
                      ...registroEditando,
                      email: e.target.value,
                    })
                  }
                />
              </FormGroup>
              <FormGroup>
                <Label>Contraseña</Label>
                <Input
                  type="text"
                  name="password"
                  value={registroEditando.password}
                  onChange={(e) =>
                    setRegistroEditando({
                      ...registroEditando,
                      password: e.target.value,
                    })
                  }
                />
              </FormGroup>
              <FormGroup>
                <Label>Edad</Label>
                <Input
                  name="edad"
                  value={registroEditando.edad}
                  onChange={(e) =>
                    setRegistroEditando({
                      ...registroEditando,
                      edad: e.target.value,
                    })
                  }
                />
              </FormGroup>
              <FormGroup>
                <Label>Fecha Registro</Label>
                <Input
                  name="fecha"
                  value={registroEditando.fecha}
                  onChange={(e) =>
                    setRegistroEditando({
                      ...registroEditando,
                      fecha: e.target.value,
                    })
                  }
                />
              </FormGroup>
              <FormGroup>
                <Label>Rol</Label>
                <Input
                  name="rol"
                  value={registroEditando.rol}
                  onChange={(e) =>
                    setRegistroEditando({
                      ...registroEditando,
                      rol: e.target.value,
                    })
                  }
                />
              </FormGroup>
              <FormGroup>
                <Label>Género</Label>
                <Input
                  name="género"
                  value={registroEditando.genero}
                  onChange={(e) =>
                    setRegistroEditando({
                      ...registroEditando,
                      genero: e.target.value,
                    })
                  }
                />
              </FormGroup>
            </Form>
          )}
        </ModalBody>
        <ModalFooter>
          <Button
            color="primary"
            onClick={confirmarEdicion}
            disabled={
              registroEditando && !getValidation(registroEditando).nombre
            }
          >
            Actualizar
          </Button>
          <Button color="secondary" onClick={() => setEditModal(false)}>
            Cancelar
          </Button>
        </ModalFooter>
      </Modal>
    </Container>
  );
};

export default FormularioTravel;
