import { useEffect } from "react";
import { useState } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";
import Home from "./pages/Homepage";
import AppRoutes from "./routes/AppRoutes";
import NavBar from "./components/NavBar";
import { UserProvider } from "./context/UserContext";
import { useUserContext } from "./context/UserContext";

function App() {
  const [count, setCount] = useState(0);
  const { handleUpdateUser } = useUserContext(); // Use your context

  // This effect hook will run once when the component mounts
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      handleUpdateUser(JSON.parse(storedUser));
    }
  }, [handleUpdateUser]); // Dependency array with handleUpdateUser ensures this effect only runs once

  return (
    <>
      <NavBar />
      <AppRoutes />
    </>
  );
}

export default App;
