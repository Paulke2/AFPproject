import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import ProjectPage from "./pages/ProjectPage"
import Home from "./pages/ProjectPage"
import useEffect from react;
import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
function App() {
  return (
    <div className="App">
 <Home />
 {//need to pass in the project to project page as a prop
 }
 <Projectpage />
 <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/Project/:id" element={<ProjectPage />} />
            
          </Routes>
    </div>
  );
}

export default App;
