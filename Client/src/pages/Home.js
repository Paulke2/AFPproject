import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css";
import { useLogout } from "../CustomHooks/useLogout";
import "../functions/findProjectInfo.js";
import logo from "../pictures/AFPlogo.png";
import { Row,Col, Button } from "react-bootstrap";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Searchbar from "../Components/Searchbar";
import findProjectInfo from "../functions/findProjectInfo.js";
import NewProject from "../Components/NewProject";
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import * as XLSX from 'xlsx'; 
import DesignJobList from "../Components/DesignJobList";
import ProjectJobList from "../Components/ProjectJobList";
const determineShow = (projectSearch, name, projectID) => {
  //this function takes projectsearch as a prop
  //and if it matches the job location/project name/project id
  // it will show the project
  return (projectID
    .toString()
    .toLowerCase()
    .includes(projectSearch.toString().toLowerCase()) ||
    name.toLowerCase().includes(projectSearch) ||
    projectSearch.toLowerCase() === "")&& name !== "Office"
    ? true
    : false;
};
const Home = (props) => {
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
  const [companyContact, setCompanyContact] = useState("");
  const [projectName, setProjectName] = useState("");
  const [scope, setScope] = useState("");
  const [projectID, setProjectID] = useState("");
  const [turnoverDate, setTurnoverDate] = useState("");
  const [location, setLocation] = useState("");
  const [contractWith, setContractWith] = useState("");
  const [amount, setAmount] = useState("");
  const [editMode,setEditMode]=useState(false);
const {logout}=useLogout()
  const handleLogOut = ()=>{
    logout()
  }
  const handleDrop = async (event) => {
    event.preventDefault();
    setDraggingOver(false);
  
    const files = Array.from(event.dataTransfer.files);
    const fileReadPromises = files.map(async (file) => {
      const arrayBuffer = await file.arrayBuffer();
      const workbook = XLSX.read(new Uint8Array(arrayBuffer), { type: 'array' });
  
      const sheetName = 'Turnover'; // Name of the sheet you want to target
      const worksheet = workbook.Sheets[sheetName];
  
      if (!worksheet) {
        console.error(`Sheet "${sheetName}" not found in the Excel file.`);
        return [];
      }
  
      // Convert the worksheet to an array of arrays
      const rows = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
      const rowsAsString = rows.map(row => row.map(cellValue => cellValue.toString()));
      return rowsAsString;
    });
  
    try {
      const allInfoMatrices = await Promise.all(fileReadPromises);
  
      // Now you have arrays of rows from each Excel file
      
      // Proc  // Check if infoMatrix state is empty before setting it
            if (infoMatrix.length === 0) {
              console.log("hello");
              setInfoMatrix(allInfoMatrices[0]);
              console.log(allInfoMatrices[0]);
              console.log("finding");
              findProjectInfo(
                allInfoMatrices[0],
                setCompanyContact,
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
      // ...
  
    } catch (error) {
      console.error('Error reading files:', error);
    }
  };
  useEffect(() => {
    const fetchProjects = async () => {
      const response = await fetch("/projects");

      const json = await response.json();
      
      if (response.ok) {
        setProjects(json);
      }
    };
    fetchProjects();
  }, [showNewProject]);
  useEffect(() => {
    const fetchDesignJobs = async () => {
      const response = await fetch("/designJobs");

      const json = await response.json();
      
      if (response.ok) {
        props.setDesignJobs(json);
      }
    };
    fetchDesignJobs();
  }, []);
  useEffect(()=>{console.log(props.designJobs)},[props.designJobs])
  useEffect(() => {
    // Every time projects changes, set the state for project names
    // for autocomplete so we only load projects once
    let temp = [];
    projects?.forEach((project) => {
      temp = [...temp, project.name]; // Use spread operator to append
    });
  
    props.setProjectNames(temp);
  
  }, [projects]);
 
  let DetermineBackgroundColor=1;
  return (
    <>
      <Navbar
        bg="dark"
        data-bs-theme="dark"
        style={{
          backgroundColor: "#90ee90",
          paddingLeft: "16px",
          paddingRight: "16px",
          boxShadow: "0 4px 6px -6px #222",
        }}
      >
        <Searchbar
          projectSearch={projectSearch}
          setProjectSearch={setProjectSearch}
        />
       <Nav className="me-auto"></Nav>
<Nav.Link
          onClick={() =>{handleLogOut()}}
          style={{ color: "white", fontStyle: "oblique",marginRight:"20px"}}
        >Logout</Nav.Link>
<Nav.Link
  onClick={() => navigate("/DesignJobs")}
  style={{ color: "white", fontStyle: "oblique",marginLeft:"20px",marginRight:"20px"}}
>
  Design
</Nav.Link>
<Nav.Link
  onClick={() => navigate("/Calendar")}
  style={{ color: "white", fontStyle: "oblique",marginLeft:"20px",marginRight:"20px" }}
>
  Calendar
</Nav.Link>
<Navbar.Brand
  style={{ cursor: "pointer",marginRight:"10px" }}
  onClick={() => navigate("/")}
>
  <img className="logo" src={logo} />
</Navbar.Brand>
      </Navbar>
        <Row  style={{ marginBottom: 0, marginTop: 0,padding:0 }}>
          <Col className="col-10 dropBoxListRow">
         <div >
          <Tabs
      defaultActiveKey="designJobs"
      className="mb-3"
      style={{paddingLeft:"10px"}}
    >
         <Tab eventKey="designJobs" title="Design Jobs"> {<DesignJobList designJobs={props.designJobs} projectSearch={projectSearch}/>} </Tab>
      <Tab eventKey="projects" title="Projects">
      <ProjectJobList projects={projects} editMode={editMode} projectSearch={projectSearch}/>
      </Tab>
   
      </Tabs>
      </div>
      </Col>
     
      <Col className="col-2 dropBoxRow"style={{alignContent:"center"}}>
        <div className="dropBoxContainer">
      <div
      className="dropBox"
      onDragOver={(event) => {
        event.preventDefault();
        setDraggingOver(true);
      }}
      style={{
        backgroundColor: draggingOver ? '#d3d3d3' : 'white',
        border: draggingOver ? '5px solid black' : '5px dashed black',
      }}
      onDragLeave={() => {
        setDraggingOver(false);
      }}
      onDrop={handleDrop}
    >
      Drag & Drop an Excel file here to add a new Project.
    </div>
    </div>
    </Col>
    </Row>
    
      <NewProject
        showNewProject={showNewProject}
        setCompanyContact={setCompanyContact}
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
        companyContact={companyContact}
        contractWith={contractWith}
        amount={amount}
      />
    </>
  );
};
export default Home;
