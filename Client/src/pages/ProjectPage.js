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
  const[ projectContactArray,setProjectContactArray]=useState(["","",""]);
  useEffect(()=>{
  if(currentProject.companyContact){
    setProjectContactArray(currentProject.companyContact.split(","));
  }
    console.log(currentProject.companyContact);
  },[currentProject])
  const handleSave = async () => {
    try {
      // Assuming currentProject.comments is the array of strings
      const updatedComments = [...currentProject.comments, newComment]; // Use currentProject.comments instead of currentProject.Comments
  
      const response = await fetch(`https://afpserver.onrender.com/projects/${id}`, {
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
      const response = await fetch(`https://afpserver.onrender.com/projects/${id}`);
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
      <h5>Scope of Work:</h5> {currentProject.scope}
      <hr></hr>
        <Row>
      <Col>
      <h5>Project:</h5> {currentProject.projectID}
      <hr></hr>
      <h5>Location:</h5> {currentProject.location}
      <hr></hr>
      <h5>Contract With:</h5> {currentProject.contractWith}
      <hr></hr>
      <h5>amount:</h5> {currentProject.amount}
      </Col>
      <Col>
      Site Contact:{projectContactArray[0]}
      <br></br>
      {projectContactArray[1]}
      <br></br>
      {projectContactArray[2]}
      <hr></hr>

      </Col>
      <h5>Comments</h5>
      </Row>
      {currentProject.comments !== undefined ? (
        <ul>
        {currentProject.comments.map((comment) => (
          <li key={comment}>{comment}</li>
        ))}
        </ul>
      ) : (
        <div>No comments yet.</div>
      )}
      <Row>
      <Form.Group style={{paddingBottom:"20px"}} controlId="editName">
        <Form.Control
          value={newComment}
          placeholder="New Comment"
          autoComplete="off"
          
          onChange={(event) => setNewComment(event.target.value)}
        />
      </Form.Group>
      <Button  style={{paddingTop: "5px",width:"80%", marginLeft:"10%"}}variant="success" onClick={handleSave}>
        save Comment
      </Button>
      </Row>
      </Container>
    </>
  );
};

export default ProjectPage;