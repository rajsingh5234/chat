import { Routes, Route } from "react-router-dom";
import Chat from "./pages/Chat";
import Login from './pages/Auth/Login';
import Signup from './pages/Auth/Signup';

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Chat />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </>
  )
}

export default App