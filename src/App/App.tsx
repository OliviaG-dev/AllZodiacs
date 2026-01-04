import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../pages/home/Home";
import Results from "../pages/results/Results";
import Describe from "../pages/describe/Describe";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <div className="app">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/results" element={<Results />} />
          <Route path="/describe" element={<Describe />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
