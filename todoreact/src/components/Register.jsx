// src/components/Register.jsx
import { useState } from "react";
import crud from "../services/Llamados";
import "bootstrap/dist/css/bootstrap.min.css";



const Register = () => {
  const [formData, setFormData] = useState({
    nombre: "",
    correo: "",
    contraseña: "",
  });

  // Manejar el cambio en los campos del formulario
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Manejar el envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await crud.PostUser(formData); // Envía los datos al backend
      alert("Usuario registrado con éxito");

      // Limpiar el formulario
      setFormData({ nombre: "", correo: "", contraseña: "" });
    } catch (error) {
      alert("Error al registrar el usuario");
      console.error("Error en el registro:", error);
    }
  };

  return (
    <div>
      <h2>Registro de Usuario</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Nombre:
          <input
            type="text"
            name="nombre"
            value={formData.nombre}
            onChange={handleChange}
            required
          />
        </label>
        <br />

        <label>
          Correo:
          <input
            type="email"
            name="correo"
            value={formData.correo}
            onChange={handleChange}
            required
          />
        </label>
        <br />

        <label>
          Contraseña:
          <input
            type="password"
            name="contraseña"
            value={formData.contraseña}
            onChange={handleChange}
            required
          />
        </label>
        <br />

        <button type="submit">Registrar</button>
      </form>
    </div>
  );
};

export default Register;
