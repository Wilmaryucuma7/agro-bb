import { Routes, Route } from "react-router-dom";
import ConfirmRegister from "./pages/ConfirmRegister";
import Home from "./pages/Home";
import Logged from "./pages/logged";
import Login from "./pages/Login";
import NewPassword from "./pages/NewPassword";
import RecoverPassword from "./pages/RecoverPassword";
import Register from "./pages/Register";

function App() {
  return (
    <Routes>
      <Route index exact element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/recover" element={<RecoverPassword />} />
      <Route path="/logged" element={<Logged />} />
      <Route path="/confirm" element={<ConfirmRegister />} />
      <Route path="/newpassword" element={<NewPassword />} />
    </Routes>
  );
}

export default App;
