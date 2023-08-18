import React, { useState } from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import ListGroup from "react-bootstrap/ListGroup";
import logo from "../pictures/AFPlogo.png";
import { useNavigate } from "react-router-dom";
import { Col, Row } from "react-bootstrap";
import { Card } from "react-bootstrap";
import "./DesignJobs.css";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import GetJobList from "../Components/DesignJobPageComponents/GetJobList";
import "./Calendar.css";
const DesignJobs = (props) => {
  const navigate = useNavigate();
 
  const [tasks, setTasks] = useState(["test1", "test2","test3","teset4"]);
  const [jobList, setJobList] = useState(props.designJobNames);
  const onDragEnd = (result) => {
    console.log(result)
    if (!result.destination) return;

    const newTasks = Array.from(tasks);
    const [reorderedTask] = newTasks.splice(result.source.index, 1);
    newTasks.splice(result.destination.index, 0, reorderedTask);

    setTasks(newTasks);
  };

  return (
    <>
      <Navbar
        style={{
          backgroundColor: "#90ee90",
          paddingLeft: "16px",
          paddingRight: "16px",
          boxShadow: "0 4px 6px -6px #222",
        }}
        bg="dark"
        data-bs-theme="dark"
      >
        <Nav className="me-auto"></Nav>
        <Nav.Link
          onClick={() => navigate("/DesignJobs")}
          style={{ color: "white", fontStyle: "oblique",marginRight:"4%" }}
        >
          Design
        </Nav.Link>
        <Nav.Link
          onClick={() => navigate("/Calendar")}
          style={{ color: "white", fontStyle: "oblique" }}
        >
          Calendar
        </Nav.Link>
        <Navbar.Brand
          style={{ cursor: "pointer", marginLeft: "20px" }}
          onClick={() => navigate("/")}
        >
          <img className="logo" src={logo} />
        </Navbar.Brand>
      </Navbar>
      <Row style={{ height: "500px", width: "100%" }}>
      <DragDropContext onDragEnd={onDragEnd}>
        <Col className="col-2 employeeList">
          <div>
          
    <Droppable droppableId="Jobs">
      {(provided) => (
        <Card style={{ width: "100%" }}{...provided.droppableProps} ref={provided.innerRef}>
<ListGroup variant="flush">
          {jobList &&
            jobList.map((job, index) => {
              return (
                <Draggable
                key={job}
                draggableId={`job-${job}`} // Use a prefix like 'job-' to distinguish jobs
                index={index}
              >
                
                  {(provided) => (
                    <ListGroup.Item
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                   >
                      <div>{job}</div>
                    
                    </ListGroup.Item>
                  )}
                </Draggable>
              );
            })}
          {provided.placeholder}
          </ListGroup>
        </Card>
      )}
    </Droppable>
          </div>
        </Col>
        <Col className="col-10 DragContainerContainer">
                
                  <Droppable droppableId="Jobs">
                    {(provided) => (
                         <Card style={{ width: "100%" }}{...provided.droppableProps} ref={provided.innerRef}>
                        <ListGroup variant="flush">
                        {jobList.map((job, index) => (
                          <Draggable
                          key={job}
                          draggableId={`task-${job}`} // Use a prefix like 'task-' to distinguish tasks
                          index={index}
                        >
                              {(provided) => (
                              <ListGroup.Item
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                className="task-span" // Add a CSS class for styling
                              >
                                {job}
                              </ListGroup.Item>
                            )}
                          </Draggable>
                        ))}
                        {provided.placeholder}
                        </ListGroup>
                      </Card>
                    )}
                  </Droppable>
                
             
        </Col>
        </DragDropContext>
      </Row>
      
    </>
  );
};

export default DesignJobs;