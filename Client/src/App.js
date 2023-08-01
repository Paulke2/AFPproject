import './App.css';
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ProjectPage from './pages/ProjectPage';
import Home from './pages/Home'; 
import Calendar from './pages/Calendar';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <div className="pages">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/projects/:id" element={<ProjectPage />} />
            <Route path="/Calendar" element={<Calendar />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;