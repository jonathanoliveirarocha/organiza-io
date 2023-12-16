import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./components/Login";

const App = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route exact path="/" element={<Login />} />
        </Routes>
      </Router>
    </>
  );
};

export default App;
