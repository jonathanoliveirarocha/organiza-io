import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { appointmentsService } from "./api/appointments.service";
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
      if (token) {
        const response = await appointmentsService.getData(token);
        const data = await response.json();
        if (response.ok) {
          setData(data);
        }
      }
    };

    fetchData();
  }, [token]);

  const Private = ({ Item }) => {
    return token ? <Home loadedData={data} token={token} /> : <Login />;
  };

  return (
    <>
      <Router>
        <Routes>
          <Route exact path="/" element={<Private Item={Home} />} />
          <Route exact path="/cadastro" element={<SignUp />} />
          <Route exact path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </>
  );
};

export default App;
