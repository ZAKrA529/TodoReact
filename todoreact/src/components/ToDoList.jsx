import { useState, useEffect } from "react";
import { Container, Form, Button, ListGroup, Modal } from "react-bootstrap";
import LlamadosTareas from "../services/llamados";
import "../styles/Todolist.css";


function ToDoList() {
    const [tareas, setTareas] = useState([]);
    const [nuevaTarea, setNuevaTarea] = useState("");
    const [mostrarModal, setMostrarModal] = useState(false);
    const [tareaEditar, setTareaEditar] = useState(null);
    const [textoEditado, setTextoEditado] = useState("");

    useEffect(() => {
        const cargarTareas = async () => {
            try {
                const tareasObtenidas = await LlamadosTareas.GetTareas();
                setTareas(tareasObtenidas);
            } catch (error) {
                console.error("Error cargando tareas:", error);
            }
        };
        cargarTareas();
    }, []);

    const agregarTarea = async () => {
        if (nuevaTarea.trim() !== "") {
            try {
                const nueva = await LlamadosTareas.PostTarea(nuevaTarea);
                setTareas([...tareas, nueva]);
                setNuevaTarea("");
            } catch (error) {
                console.error("Error agregando tarea:", error);
            }
        }
    };

    const eliminarTarea = async (id) => {
        try {
            await LlamadosTareas.DeleteTarea(id);
            setTareas(tareas.filter((tarea) => tarea.id !== id));
        } catch (error) {
            console.error("Error eliminando tarea:", error);
        }
    };

    const abrirModalEdicion = (tarea) => {
        setTareaEditar(tarea.id);
        setTextoEditado(tarea.tarea);
        setMostrarModal(true);
    };

    const guardarEdicion = async () => {
        try {
            await LlamadosTareas.UpdateTarea(textoEditado, tareaEditar);
            setTareas(tareas.map((t) => (t.id === tareaEditar ? { ...t, tarea: textoEditado } : t)));
            setMostrarModal(false);
            
        } catch (error) {
            console.error("Error editando tarea:", error);
        }
    };

    const marcarCompletada = (id) => {
        const nuevasTareas = tareas.map((t) =>
            t.id === id ? { ...t, completada: !t.completada, hora: !t.completada ? new Date().toLocaleTimeString() : "" } : t
        );
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
                {tareas.map((tarea) => (
                    <ListGroup.Item key={tarea.id} className="item-tarea">
                        <Form.Check 
                            type="checkbox" 
                            checked={tarea.completada} 
                            onChange={() => marcarCompletada(tarea.id)} 
                        />
                        <span className={tarea.completada ? "completada" : ""}>{tarea.tarea}</span>
                        {tarea.completada && <small className="hora">({tarea.hora})</small>}
                        <div>
                            <Button variant="warning" size="sm" className="me-2" onClick={() => abrirModalEdicion(tarea)}>
                                Editar
                            </Button>
                            <Button variant="danger" size="sm" onClick={() => eliminarTarea(tarea.id)}>
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