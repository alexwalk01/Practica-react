'use client';

import { useState } from 'react';
import { Table, Button, Modal, ModalBody, ModalHeader } from 'reactstrap';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faArrowDown,
  faIgloo,
  faImage,
  faImagePortrait,
} from '@fortawesome/free-solid-svg-icons';

import datos from '@/data/tablaDatos.json';

export default function TablaDatos() {
  const [modalOpen, setModalOpen] = useState(false);
  const [imagenActual, setImagenActual] = useState('');

  const abrirModal = (imagen) => {
    setImagenActual(imagen);
    setModalOpen(true);
  };

  return (
    <>
      <Table dark bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Nombre</th>
            <th>Categorias</th>
            <th>Icono</th>
            <th>Acción</th>
          </tr>
        </thead>

        <tbody>
          {datos.map((item, index) => (
            <tr key={item.id}>
              <td>{index + 1}</td>
              <td>{item.nombre}</td>
              <td>{item.categorias}</td>
              <td>
                <FontAwesomeIcon icon={faImage} />
              </td>
              <td>
                <Button
                  color="secondary"
                  onClick={() => abrirModal(item.imagen)}
                >
                  Ver imagen
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal isOpen={modalOpen} toggle={() => setModalOpen(false)}>
        <ModalHeader toggle={() => setModalOpen(false)}>
          Imagen del registro
        </ModalHeader>
        <ModalBody>
          <img src={imagenActual} alt="Imagen" style={{ width: '100%' }} />
        </ModalBody>
      </Modal>
    </>
  );
}
