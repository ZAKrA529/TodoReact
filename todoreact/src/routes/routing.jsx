// src/routes/routing.jsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import TodoL from "../pages/TodoL";
import Login from "../pages/Login";
import Registro from "../pages/Registro";

const Routing = () => {
  return (
    <Router>
      <Routes>
      <Route path="/TodoL" element={<TodoL />} />
      <Route path="/Login" element={<Login/>} />
      <Route path="/Registro" element={<Registro/>} />
    </Routes>
    </Router>
    



    
  );
};

export default Routing;
