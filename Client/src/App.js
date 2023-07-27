import './App.css';
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ProjectPage from './pages/ProjectPage';
import Home from './pages/Home'; // Make sure you have the correct path for Home component

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <div className="pages">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/project" element={<ProjectPage />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;