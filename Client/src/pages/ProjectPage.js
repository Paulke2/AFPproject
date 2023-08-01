import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import Nav from "react-bootstrap/Nav";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import logo from "../pictures/AFPlogo.png"
import "./ProjectPage.css"
import "../Components/NewProject.js"
const ProjectPage = () => {
  const navigate = useNavigate();
  let { id } = useParams();
  const [currentProject, setCurrentProject] = useState({});
  const [newComment, setNewComment] = useState("");
  
  const handleSave = async () => {
    try {
      // Assuming currentProject.comments is the array of strings
      const updatedComments = [...currentProject.comments, newComment]; // Use currentProject.comments instead of currentProject.Comments
  
      const response = await fetch(`/projects/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ comments: updatedComments }), 
      });
  
      if (response.ok) {
        // Handle successful PATCH request (e.g., show a success message)
        console.log("Comment updated successfully!");
        setCurrentProject({ ...currentProject, comments: updatedComments }); // Use 'comments' instead of 'Comments'
        // Optionally, you may update the local state with the new comment
        setNewComment("");
      } else {
        // Handle error if the PATCH request fails (e.g., show an error message)
        console.error("Failed to update comment");
      }
    } catch (error) {
      console.error("Error occurred while making the PATCH request:", error);
    }
  };
  
  useEffect(() => {
    const fetchProject = async () => {
      const response = await fetch(`/projects/${id}`);
      const json = await response.json();
      if (response.ok) {
        setCurrentProject(json);
      }
    };
    fetchProject();
  }, [id]);
  
  return (
    <>
      {" "}
      <Navbar  style={{
                backgroundColor: "#90ee90",
                paddingLeft: "16px",
                paddingRight: "16px",
                boxShadow: "0 4px 6px -6px #222"
            }}bg="dark" data-bs-theme="dark">
          
          <Nav className="me-auto"></Nav>
          <Nav.Link onClick={() => navigate("/Calendar")} style={{color:"white",fontStyle:"oblique"}}>Calendar</Nav.Link>
          <Navbar.Brand
            style={{ cursor: "pointer",marginLeft:"20px"}}
            onClick={() => navigate("/")}
          >
                        <img className="logo"src={logo}/>
          </Navbar.Brand>
      </Navbar>
      <h1>{currentProject.name}</h1>
      <hr></hr>
      <Container>
      Scope of Work: {currentProject.scope}
      <hr></hr>
        <Row>
      <Col>
      Project: {currentProject.projectID}
      <hr></hr>
      Location: {currentProject.location}
      <hr></hr>
      Contract With: {currentProject.contractWith}
      <hr></hr>
      
      </Col>
      <Col>
      amount: {currentProject.amount}

      </Col>
      </Row>
      {currentProject.comments !== undefined ? (
        currentProject.comments.map((comment) => (
          <div key={comment}>{comment}<br /></div>
        ))
      ) : (
        <div>No comments yet.</div>
      )}
      <Row>
      <Form.Group controlId="editName">
        <Form.Control
          value={newComment}
          placeholder="New Comment"
          onChange={(event) => setNewComment(event.target.value)}
        />
      </Form.Group>
      <Button variant="primary" onClick={handleSave}>
        Save
      </Button>
      </Row>
      </Container>
    </>
  );
};

export default ProjectPage;