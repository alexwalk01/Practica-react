'use client';
import React, { useState } from 'react';
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  CardFooter,
  Container,
  Row,
  Col,
  Spinner,
} from 'reactstrap';

export default function PracticaAPI() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchUser = async () => {
    setLoading(true);
    try {
      const id = Math.floor(Math.random() * 10) + 1;
      const res = await fetch(`https://fakestoreapi.com/users/${id}`);
      setUser(await res.json());
    } catch (err) {
      alert('Error al obtener usuario');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container className="py-5 text-white">
      <h1>Usuario Aleatorio</h1>
      <Button color="primary" onClick={fetchUser} disabled={loading} size="lg">
        {loading ? (
          <>
            <Spinner size="sm" className="me-2" /> Cargando...
          </>
        ) : (
          'Obtener Usuario Aleatorio'
        )}
      </Button>

      {user && (
        <Row className="mt-4">
          <Col md={6}>
            <Card>
              <CardHeader className="bg-primary text-white">
                <h4 className="mb-0">{`${user.name.firstname} ${user.name.lastname}`}</h4>
              </CardHeader>
              <CardBody className="text-dark">
                <p>
                  <strong>Username:</strong> {user.username} <br />
                  <strong>Email:</strong> {user.email} <br />
                  <strong>Teléfono:</strong> {user.phone}
                </p>

                <h6>Información Adicional:</h6>
                <p className="small">
                  {user.address.street} #{user.address.number},{' '}
                  {user.address.city} <br />
                  CP: {user.address.zipcode} <br />
                  Geo: ({user.address.geolocation.lat},{' '}
                  {user.address.geolocation.long})
                </p>
              </CardBody>
              <CardFooter className="text-muted">
                📍 {user.address.city}
              </CardFooter>
            </Card>
          </Col>
        </Row>
      )}
    </Container>
  );
}
