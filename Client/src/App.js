import './App.css';
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ProjectPage from './pages/ProjectPage';
import Home from './pages/Home'; 
import Calendar from './pages/Calendar';
import DesignJobs from './pages/DesignJobs';
import { useState } from 'react';

function App() {
  const [ProjectNames,setProjectNames]=useState([]);
  const [designJobNames,setDesignJobNames]=useState([]);
  return (
    <div className="App">
      <BrowserRouter>
        <div className="pages">
          <Routes>
            <Route path="/" element={<Home setProjectNames={setProjectNames} setDesignJobNames={setDesignJobNames}/>} />
            <Route path="/projects/:id" element={<ProjectPage />} />
            <Route path="/DesignJobs" element={<DesignJobs designJobNames={designJobNames} setDesignJobNames={setDesignJobNames}/>} />
            <Route path="/Calendar" element={<Calendar ProjectNames={ProjectNames}/>} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;