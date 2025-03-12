import ToDoList from "./components/ToDoList";

import Routing from "./routes/routing";
import LoginForm from "./components/Login";
import RegisterForm from "./components/Register";


function App() {
  return (
    <div>

      <RegisterForm></RegisterForm>
      <LoginForm></LoginForm>
      <ToDoList></ToDoList>
    </div>
  );
}

export default App;
