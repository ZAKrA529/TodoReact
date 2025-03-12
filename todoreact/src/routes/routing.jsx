// src/routes/routing.jsx
import { Routes, Route } from "react-router-dom";
import ToDoList from "../components/ToDoList";
import Register from "../components/Register";
import Login from "../components/Login";

const Routing = () => {
  return (
    <Routes>
      <Route path="/" element={<ToDoList />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
    </Routes>
  );
};

export default Routing;
