import { useEffect, useState } from "react";
import { Form, Button, Container, Alert } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import Registercalls from "../services/registercalls";

function LoginForm() {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [form, setForm] = useState({
    id: "",
    email: "",
    password: "",
  });
  useEffect(() => {
    async function fetchDataUsers() {
      const datos = await Registercalls.GetUser()
      console.log(datos);
      setForm(datos)
    };
    fetchDataUsers();
  }, []);
  

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.id || !form.email || !form.password) {
      setError("Por favor, completa todos los campos");
      return;
    }

  }

  

  return (
    <Container className="mt-5">
      <h2>Iniciar Sesión</h2>

      {error && <Alert variant="danger">{error}</Alert>}
      {success && <Alert variant="success">¡Inicio de sesión exitoso!</Alert>}

      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Nombre de usuario</Form.Label>
          <Form.Control
            type="text"
            name="id"
            value={form.id}
            onChange={handleChange}
            placeholder="Ingresa tu usuario"
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Correo Electrónico</Form.Label>
          <Form.Control
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Ingresa tu correo"
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Contraseña</Form.Label>
          <Form.Control
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            placeholder="Ingresa tu contraseña"
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Iniciar Sesión
        </Button>
      </Form>
    </Container>
  );
}

export default LoginForm;
