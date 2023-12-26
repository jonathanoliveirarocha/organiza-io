import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./components/Pages/Login";
import SignUp from "./components/Pages/SignUp";
import Home from "./components/Pages/Home";
import NotFound from "./components/Pages/NotFound";

const App = () => {
  const tokenStorage = JSON.parse(localStorage.getItem("tokenStorage")) || null;
  const [token, setToken] = useState(tokenStorage);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      try {
        if (token) {
          const response = await fetch(
            "https://dev-relate.vercel.app/auth/validate",
            {
              method: "POST",
              headers: {
                Authorization: token,
              },
            }
          );
          response.ok ? setIsAuthenticated(true) : setIsAuthenticated(false);
        }
      } catch (error) {
        console.log("Erro ao buscar dados da API");
      }
    };
    fetchData();
  }, [token]);

  const Private = ({ Item }) => {
    const signed = true;
    return signed > 0 ? <Home /> : <Login />;
  };
  return (
    <>
      <Router>
        <Routes>
          <Route exact path="/" element={<Login />} />
          <Route exact path="/cadastro" element={<SignUp />} />
          <Route exact path="/inicio" element={<Private Item={Home} />} />
          <Route exact path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </>
  );
};

export default App;
