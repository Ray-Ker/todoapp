import { useState, useEffect } from "react";
import Todoapp from "./components/Todoapp";
import Login from "./components/Login";

function App() {
  const [user, setUser] = useState(null);

  // Al montar, restaurar user si existe en localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem("user");
      if (saved) setUser(JSON.parse(saved));
    } catch (err) {
      console.error("Error al leer localStorage user:", err);
    }
  }, []);

  const handleLogin = (userData) => {
    // guardamos en estado y en localStorage
    setUser(userData);
    try {
      localStorage.setItem("user", JSON.stringify(userData));
    } catch (err) {
      console.error("Error guardando user en localStorage:", err);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token"); // si tu api-service guarda token así
    setUser(null);
  };

  return (
    <>
      {user ? (
        <Todoapp onLogout={handleLogout} user={user} />
      ) : (
        <Login onLogin={handleLogin} />
      )}
    </>
  );
}

export default App;
