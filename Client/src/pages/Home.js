import React, { useEffect, useState } from "react";
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import ListGroup from 'react-bootstrap/ListGroup';
import Searchbar from '../Components/Searchbar';
const Home = () => {
  //fetching data
  const [projects, setProjects] = useState(null);
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
    <Searchbar />
        
            <Card style={{ margin:'50px',width: '40rem' }}>
      <ListGroup variant="flush">
      {projects &&
    projects.map((project)=> (
        <ListGroup.Item>{project.name} - {project.projectID}</ListGroup.Item>
        ))}
      </ListGroup>
    </Card>
            

    </>
  );
};
export default Home;