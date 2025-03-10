import { useState } from "react";
import { Container, Form, Button, ListGroup, Modal } from "react-bootstrap";


function ToDoList() {
    const [tareas, setTareas] = useState([]);
    const [nuevaTarea, setNuevaTarea] = useState("");
    const [mostrarModal, setMostrarModal] = useState(false);
    const [tareaEditar, setTareaEditar] = useState(null);
    const [textoEditado, setTextoEditado] = useState("");

    const agregarTarea = () => {
        if (nuevaTarea.trim() !== "") {
            setTareas([...tareas, { texto: nuevaTarea, completada: false, hora: "" }]);
            setNuevaTarea("");
        }
    };

    const eliminarTarea = (indice) => {
        const nuevasTareas = tareas.filter((_, i) => i !== indice);
        setTareas(nuevasTareas);
    };

    const abrirModalEdicion = (indice) => {
        setTareaEditar(indice);
        setTextoEditado(tareas[indice].texto);
        setMostrarModal(true);
    };

    const guardarEdicion = () => {
        const nuevasTareas = [...tareas];
        nuevasTareas[tareaEditar].texto = textoEditado;
        setTareas(nuevasTareas);
        setMostrarModal(false);
    };

    const marcarCompletada = (indice) => {
        const nuevasTareas = [...tareas];
        nuevasTareas[indice].completada = !nuevasTareas[indice].completada;
        nuevasTareas[indice].hora = nuevasTareas[indice].completada ? new Date().toLocaleTimeString() : "";
        setTareas(nuevasTareas);
    };

    return (
        <Container className="contenedor-tareas">
            <h2 className="titulo">Lista de Tareas</h2>
            <Form className="formulario">
                <Form.Control
                    type="text"
                    placeholder="Nueva tarea"
                    value={nuevaTarea}
                    onChange={(e) => setNuevaTarea(e.target.value)}
                />
                <Button variant="primary" onClick={agregarTarea} className="ms-2">
                    Agregar
                </Button>
            </Form>
            <ListGroup className="lista-tareas">
                {tareas.map((tarea, indice) => (
                    <ListGroup.Item key={indice} className="item-tarea">
                        <Form.Check 
                            type="checkbox" 
                            checked={tarea.completada} 
                            onChange={() => marcarCompletada(indice)} 
                        />
                        <span className={tarea.completada ? "completada" : ""}>{tarea.texto}</span>
                        {tarea.completada && <small className="hora">({tarea.hora})</small>}
                        <div>
                            <Button variant="warning" size="sm" className="me-2" onClick={() => abrirModalEdicion(indice)}>
                                Editar
                            </Button>
                            <Button variant="danger" size="sm" onClick={() => eliminarTarea(indice)}>
                                Eliminar
                            </Button>
                        </div>
                    </ListGroup.Item>
                ))}
            </ListGroup>
            
            <Modal show={mostrarModal} onHide={() => setMostrarModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Editar Tarea</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Control
                        type="text"
                        value={textoEditado}
                        onChange={(e) => setTextoEditado(e.target.value)}
                    />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setMostrarModal(false)}>
                        Cancelar
                    </Button>
                    <Button variant="primary" onClick={guardarEdicion}>
                        Guardar cambios
                    </Button>
                </Modal.Footer>
            </Modal>
        </Container>
    );
}

export default ToDoList;
