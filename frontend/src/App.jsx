import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./components/Pages/Login";
import SignUp from "./components/Pages/SignUp";
import Home from "./components/Pages/Home";
import NotFound from "./components/Pages/NotFound";

const App = () => {
  const tokenStorage = JSON.parse(localStorage.getItem("tokenStorage")) || null;
  const [token, setToken] = useState(tokenStorage);
  const [data, setData] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (token) {
          const response = await fetch(
            "http://localhost:8000/api/appointments/get_data",
            {
              method: "GET",
              headers: {
                Authorization: token,
              },
            }
          );

          const data = await response.json();

          if (response.ok) {
            setData(data);
          }
        }
      } catch (error) {
        console.log("Erro ao buscar dados da API");
      }
    };
    fetchData();
  }, [token]);

  const Private = ({ Item }) => {
    const signed = true;
    return signed > 0 ? <Home loadedData={data} /> : <Login />;
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
