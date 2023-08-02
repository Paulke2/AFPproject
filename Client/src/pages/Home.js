import React, { useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
import { useNavigate } from "react-router-dom";
import "./Home.css";
import "../functions/findProjectInfo.js";
import logo from "../pictures/AFPlogo.png";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import ListGroup from "react-bootstrap/ListGroup";
import Searchbar from "../Components/Searchbar";
import findProjectInfo from "../functions/findProjectInfo.js";
import NewProject from "../Components/NewProject";
const determineShow = (projectSearch, name, projectID) => {
  //this function takes projectsearch as a prop
  //and if it matches the job location/project name/project id
  // it will show the project
  return projectID
    .toString()
    .toLowerCase()
    .includes(projectSearch.toString().toLowerCase()) ||
    name.toLowerCase().includes(projectSearch) ||
    projectSearch === ""
    ? true
    : false;
};
const Home = () => {
  const navigate = useNavigate();
  //fetching data
  const [showNewProject, setShowNewProject] = useState(false);
  const handleClose = () => setShowNewProject(false);
  const handleShow = () => setShowNewProject(true);
  const [projects, setProjects] = useState(null);
  const [projectSearch, setProjectSearch] = useState("");
  //for update, 1 indicates we are ready to read an new project. if 0, we are reading a new project.
  const [draggingOver, setDraggingOver] = useState(false);
  const [infoMatrix, setInfoMatrix] = useState([]);

  //state for a new project

  const [projectName, setProjectName] = useState("");
  const [scope, setScope] = useState("");
  const [projectID, setProjectID] = useState("");
  const [turnoverDate, setTurnoverDate] = useState("");
  const [location, setLocation] = useState("");
  const [contractWith, setContractWith] = useState("");
  const [amount, setAmount] = useState("");

  useEffect(() => {
    const fetchProjects = async () => {
      const response = await fetch("/projects");

      const json = await response.json();

      if (response.ok) {
        setProjects(json);
      }
    };
    fetchProjects();
  }, []);

  return (
    <>
      <Navbar bg="dark" data-bs-theme="dark"style={{
                backgroundColor: "#90ee90",
                paddingLeft: "16px",
                paddingRight: "16px",
                boxShadow: "0 4px 6px -6px #222"
            }}>
        <Searchbar
          projectSearch={projectSearch}
          setProjectSearch={setProjectSearch}
        />
        <Nav className="me-auto"></Nav>
        <Nav.Link onClick={() => navigate("/Calendar")} style={{color:"white",fontStyle:"oblique"}}>Calendar</Nav.Link>
        <Navbar.Brand
          style={{ cursor: "pointer", marginLeft: `2%` }}
          onClick={() => navigate("/")}
        >
          <img className="logo" src={logo} />
        </Navbar.Brand>
      </Navbar>

      <Card style={{ marginLeft: "50px", width: "90%" }}>
        <ListGroup variant="flush">
          {projects &&
            projects.map((project) =>
              determineShow(projectSearch, project.name, project.projectID) ? (
                <ListGroup.Item
                  style={{ cursor: "pointer" }}
                  onClick={() => navigate("/projects/" + project._id)}
                >
                  {project.name} - {project.projectID}
                </ListGroup.Item>
              ) : (
                <></>
              )
            )}
        </ListGroup>
      </Card>
      <br></br>
      <div
        className="dropBox"
        onDragOver={() => {

          setDraggingOver(true);
        }}
        style={{
          backgroundColor:
            draggingOver
              ? "white"
              : "gray",
        }}
        onDragEnd={() => {
          setDraggingOver(false);
        }}
        onDrop={async (event) => {
          event.preventDefault();
          const files = Array.from(event.dataTransfer.files);
          const fileReadPromises = files.map(async (file) => {
            let text = await file.text();
            let rows = text.split("\n");
            return rows.map((row) => row.split(","));
          });

          try {
            const allInfoMatrices = await Promise.all(fileReadPromises);

            // Check if infoMatrix state is empty before setting it
            if (infoMatrix.length === 0) {
              console.log("hello");
              //console.log(allInfoMatrices[0]);
              setInfoMatrix(allInfoMatrices[0]);
              console.log(allInfoMatrices[0]);
              console.log("finding");
              findProjectInfo(
                allInfoMatrices[0],
                setScope,
                setProjectID,
                setTurnoverDate,
                setLocation,
                setContractWith,
                setAmount,
                setProjectName
              );
            }
            handleShow();
          } catch (error) {
            console.error("Error reading files:", error);
          }
        }}
      >
        drop file
      </div>
      <NewProject
        showNewProject={showNewProject}
        setProjectName={setProjectName}
        setShowNewProject={setShowNewProject}
        setScope={setScope}
        setProjectID={setProjectID}
        setTurnoverDate={setTurnoverDate}
        setLocation={setLocation}
        setContractWith={setContractWith}
        setAmount={setAmount}
        projectName={projectName}
        scope={scope}
        projectID={projectID}
        turnoverDate={turnoverDate}
        location={location}
        contractWith={contractWith}
        amount={amount}
      />
    </>
  );
};
export default Home;
