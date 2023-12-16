import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import Home from "./components/Home";


const App = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route exact path="/" element={<Login />} />
          <Route exact path="/cadastro" element={<SignUp />} />
          <Route exact path="/inicio" element={<Home />} />
        </Routes>
      </Router>
    </>
  );
};

export default App;
