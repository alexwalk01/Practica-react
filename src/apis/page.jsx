'use client';
import React, { useState, useEffect } from 'react';
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
  Table,
} from 'reactstrap';

export default function PracticaAPI() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const [loadingProducts, setLoadingProducts] = useState(false);

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

  const fetchProducts = async () => {
    setLoadingProducts(true);
    try {
      // Obtenemos TODOS los productos
      const res = await fetch('https://fakestoreapi.com/products');
      const allProducts = await res.json();

      // Los mezclamos aleatoriamente
      const shuffled = allProducts.sort(() => Math.random() - 0.5);

      // Tomamos los primeros 15
      setProducts(shuffled.slice(0, 15));
    } catch (err) {
      alert('Error al obtener productos');
    } finally {
      setLoadingProducts(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

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

      <hr className="my-5" />

      <h1>Lista de Productos</h1>
      <Button
        color="success"
        onClick={fetchProducts}
        disabled={loadingProducts}
        className="mb-3"
      >
        {loadingProducts ? (
          <>
            <Spinner size="sm" className="me-2" /> Cargando...
          </>
        ) : (
          'Cargar Otros 15 Productos'
        )}
      </Button>

      {loadingProducts && products.length === 0 ? (
        <div className="text-center py-5">
          <Spinner color="primary" />
        </div>
      ) : (
        <Table striped bordered hover responsive className="bg-white">
          <thead className="table-dark">
            <tr>
              <th>ID</th>
              <th>Imagen</th>
              <th>Título</th>
              <th>Precio</th>
              <th>Categoría</th>
              <th>Descripción</th>
              <th>Rating</th>
            </tr>
          </thead>
          <tbody>
            {products.map((p) => (
              <tr key={p.id}>
                <td>{p.id}</td>
                <td>
                  <img
                    src={p.image}
                    alt={p.title}
                    style={{ width: 50, height: 50, objectFit: 'contain' }}
                  />
                </td>
                <td>{p.title}</td>
                <td>${p.price}</td>
                <td>
                  <span className="badge bg-info text-dark">{p.category}</span>
                </td>
                <td>{p.description.substring(0, 100)}...</td>
                <td>
                  {p.rating.rate} <br />
                  <small>({p.rating.count})</small>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </Container>
  );
}
