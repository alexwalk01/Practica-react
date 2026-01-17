'use client';

import { useState } from 'react';
import { Button, Toast, ToastBody, ToastHeader } from 'reactstrap';

function ToastAzul() {
  const [visible, setVisible] = useState(false);

  return (
    <div>
      <Button color="primary" onClick={() => setVisible(!visible)}>
        Mostrar Toast
      </Button>

      {visible && (
        <Toast className="mt-3">
          <ToastHeader icon="primary">Notificación</ToastHeader>
          <ToastBody>Este es un Toast azul usando Reactstrap</ToastBody>
        </Toast>
      )}
    </div>
  );
}

export default ToastAzul;
