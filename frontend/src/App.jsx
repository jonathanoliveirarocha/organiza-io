import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./components/Pages/Login";
import SignUp from "./components/Pages/SignUp";
import Home from "./components/Pages/Home";
import NotFound from "./components/Pages/NotFound";


const App = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route exact path="/" element={<Login />} />
          <Route exact path="/cadastro" element={<SignUp />} />
          <Route exact path="/inicio" element={<Home />} />
          <Route exact path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </>
  );
};

export default App;
