import { BrowserRouter, Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";
import Home from "../pages/home/Home";
import "./App.css";

// Lazy loading des pages pour réduire le bundle initial
const Results = lazy(() => import("../pages/results/Results"));
const Describe = lazy(() => import("../pages/describe/Describe"));

// Composant de chargement
const LoadingFallback = () => (
  <div style={{ 
    display: 'flex', 
    justifyContent: 'center', 
    alignItems: 'center', 
    minHeight: '100vh',
    color: '#fff'
  }}>
    <div>Chargement...</div>
  </div>
);

function App() {
  return (
    <BrowserRouter>
      <div className="app">
        <Suspense fallback={<LoadingFallback />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/results" element={<Results />} />
            <Route path="/describe" element={<Describe />} />
          </Routes>
        </Suspense>
      </div>
    </BrowserRouter>
  );
}

export default App;
