'use client';

import { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

function ModalEjemplo() {
  const [abierto, setAbierto] = useState(false);

  const toggle = () => setAbierto(!abierto);

  return (
    <div>
      <Button color="secondary" onClick={toggle}>
        Abrir Modal
      </Button>

      <Modal isOpen={abierto} toggle={toggle}>
        <ModalHeader toggle={toggle}>Modal Reactstrap</ModalHeader>
        <ModalBody>Este es un modal usando Reactstrap.</ModalBody>
        <ModalFooter>
          <Button color="danger" onClick={toggle}>
            Cerrar
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}

export default ModalEjemplo;
