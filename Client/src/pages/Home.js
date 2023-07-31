import React, { useEffect, useState } from "react";
import Card from 'react-bootstrap/Card';
import { useNavigate } from "react-router-dom";
import "./Home.css";
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import ListGroup from 'react-bootstrap/ListGroup';
import Searchbar from '../Components/Searchbar';
const determineShow = (projectSearch,name, projectID) => {
//this function takes projectsearch as a prop
//and if it matches the job location/project name/project id
// it will show the project
return((projectID.toString().toLowerCase().includes(projectSearch.toString().toLowerCase()) ||
name.toLowerCase().includes( projectSearch) ||projectSearch==="")? true:false);

}
const Home = () => {
    const navigate = useNavigate();
  //fetching data
  const [projects, setProjects] = useState(null);
  const [projectSearch, setProjectSearch]=useState("");
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
    <Navbar bg="dark" data-bs-theme="dark">
        <Container>
          <Navbar.Brand onClick={()=> navigate('/')}>PLace holder</Navbar.Brand>
          <Nav className="me-auto">
          </Nav>
          <Searchbar projectSearch={projectSearch}
            setProjectSearch={setProjectSearch}
            />
        </Container>
      </Navbar>

        
            <Card style={{ marginLeft:'50px',width: '90%' }}>
      <ListGroup variant="flush">
      {projects &&
    projects.map((project)=> (
        (determineShow(projectSearch,project.name,project.projectID))?
        <ListGroup.Item style={{cursor:"pointer"}} onClick={() => navigate("/projects/" + project._id)}>{project.name} - {project.projectID}</ListGroup.Item>: <></>
        ))}
      </ListGroup>
    </Card>
    <br></br>
            <div className="dropBox" onDragOver={(event)=>{event.preventDefault();
            console.log("drag over")}}
            onDrop={(event)=>{event.preventDefault();console.log("dragged")}}>drop file</div>

    </>
  );
};
export default Home;