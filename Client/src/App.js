import "./App.css";
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProjectPage from "./pages/ProjectPage";
import Home from "./pages/Home";
import Calendar from "./pages/Calendar";
import DesignJobs from "./pages/DesignJobs";
import { useState } from "react";
import LoginPage from "./pages/LoginPage";

function App() {
  const [ProjectNames, setProjectNames] = useState([]);
  const [designJobs, setDesignJobs] = useState([]);
  return (
    <div className="App">
      <BrowserRouter>
        <div className="pages">
          <Routes>
            <Route
              path="/"
              element={
                <Home
                  setProjectNames={setProjectNames}
                  setDesignJobs={setDesignJobs}
                  designJobs={designJobs}
                />
              }
            />
            <Route path="/projects/:id" element={<ProjectPage />} />
            <Route
              path="/DesignJobs"
              element={
                <DesignJobs
                  designJobs={designJobs}
                  setDesignJobs={setDesignJobs}
                />
              }
            />
            <Route
              path="/Calendar"
              element={<Calendar ProjectNames={ProjectNames} />}
            />
             <Route
              path="/login"
              element={<LoginPage />}
            />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
