import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import Nav from "react-bootstrap/Nav";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";

const ProjectPage = () => {
  const navigate = useNavigate();
  let { id } = useParams();
  const [currentProject, setCurrentProject] = useState({});
  const [newComment, setNewComment] = useState("");
  
  const handleSave = async () => {
    try {
      // Assuming currentProject.comments is the array of strings
      const updatedComments = [...currentProject.Comments, newComment];

      const response = await fetch(`/projects/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ Comments: updatedComments }),
      });

      if (response.ok) {
        // Handle successful PATCH request (e.g., show a success message)
        console.log("Comment updated successfully!");
        setCurrentProject({ ...currentProject, comments: updatedComments });
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
      <Navbar bg="dark" data-bs-theme="dark">
        <Container>
          <Navbar.Brand
            style={{ cursor: "pointer" }}
            onClick={() => navigate("/")}
          >
            PLace holder
          </Navbar.Brand>
          <Nav className="me-auto"></Nav>
        </Container>
      </Navbar>
      <h1>{currentProject.name}</h1>
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
    </>
  );
};

export default ProjectPage;