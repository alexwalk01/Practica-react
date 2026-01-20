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
  const [modal, setModal] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({
      ...form,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const toggleModal = () => setModal(!modal);
  const reiniciarForm = () => setForm(estadoInicial);

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
              <Label for="nombre">Nombre</Label>
              <Input
                id="nombre"
                name="nombre"
                value={form.nombre}
                onChange={handleChange}
                placeholder="Ej: Juan"
              />
            </FormGroup>
          </Col>
          <Col md={6}>
            <FormGroup>
              <Label for="apellido">Apellido</Label>
              <Input
                id="apellido"
                name="apellido"
                value={form.apellido}
                onChange={handleChange}
                placeholder="Ej: Pérez"
              />
            </FormGroup>
          </Col>
        </Row>

        <FormGroup>
          <Label for="email">Email</Label>
          <Input
            id="email"
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            placeholder="ejemplo@correo.com"
          />
        </FormGroup>

        <FormGroup>
          <Label for="password">Contraseña</Label>
          <Input
            id="password"
            name="password"
            type="password"
            value={form.password}
            onChange={handleChange}
          />
        </FormGroup>

        <FormGroup>
          <Label for="edad">Edad</Label>
          <Input
            id="edad"
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
            rows="4"
          />
        </FormGroup>

        <FormGroup>
          <Label for="fecha">Fecha de registro</Label>
          <Input
            id="fecha"
            type="date"
            name="fecha"
            value={form.fecha}
            onChange={handleChange}
          />
        </FormGroup>

        <div className="mt-4">
          <Button color="primary" className="me-2" onClick={toggleModal}>
            Mostrar
          </Button>
          <Button color="secondary" onClick={reiniciarForm}>
            Reiniciar
          </Button>
        </div>
      </Form>

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
    </Container>
  );
}
