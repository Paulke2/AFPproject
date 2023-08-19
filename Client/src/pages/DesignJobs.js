import React, { useEffect, useState, useRef } from "react";
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
  const resultRef = useRef(null);

  const jobList = props.designJobs;
  const [unAssignedList, setUnAssignedList] = useState(null);
  const [backLogList, setBackLogList] = useState(null);
  const [progressList, setProgressList] = useState(null);
  const [doneList, setDoneList] = useState(null);
  useEffect(() => {
    let tempUnAssignedList = [];
    let tempBackLogList = [];
    let tempProgressList = [];
    let tempDoneList = [];
    jobList.map((job) => {
      if (job.currentContainer === "unassigned") {
        tempUnAssignedList = [...tempUnAssignedList, job];
      } else if (job.currentContainer === "backlog") {
        tempBackLogList = [...tempBackLogList, job];
      } else if (job.currentContainer === "progress") {
        tempProgressList = [...tempProgressList, job];
      } else if (job.currentContainer === "done") {
        tempDoneList = [...tempDoneList, job];
      }
    });
    setUnAssignedList(tempUnAssignedList);
    setBackLogList(tempBackLogList);
    setProgressList(tempProgressList);
    setDoneList(tempDoneList);
  }, [jobList]);
  useEffect(() => {
    console.log(progressList);
  }, [progressList]);
  const onDragEnd = (result) => {
    let removedJob = null;
    if (!result.destination) return;

    if (result.source.droppableId === "unassigned") {
      const newUnassignedList = Array.from(unAssignedList);
      removedJob=unAssignedList[result.source.index]
      newUnassignedList.splice(result.source.index, 1);
      setUnAssignedList(newUnassignedList);
    } else if (result.source.droppableId === "progress") {
      const newProgressList = Array.from(progressList);
      removedJob=newProgressList[result.source.index]
      newProgressList.splice(result.source.index, 1);
      setProgressList(newProgressList);
    } else if (result.source.droppableId === "backlog") {
      const newBackLogList = Array.from(backLogList);
      removedJob=newBackLogList[result.source.index]
      newBackLogList.splice(result.source.index, 1);
      setBackLogList(newBackLogList);
    } else if (result.source.droppableId === "done") {
      const newDoneList = Array.from(doneList);
      removedJob=newDoneList[result.source.index]
      newDoneList.splice(result.source.index, 1);
      setDoneList(newDoneList);
    }

    if (result.destination.droppableId === "unassigned") {
      const newUnassignedList = Array.from(unAssignedList);
      newUnassignedList.splice(result.destination.index, 0, removedJob);
  
       setUnAssignedList(newUnassignedList);
    } else if (result.destination.droppableId === "progress") {
      const newProgressList = Array.from(progressList);
      newProgressList.splice(result.destination.index, 0, removedJob);
  
       setProgressList(newProgressList);
    } else if (result.destination.droppableId === "backlog") {
      const newBackLogList = Array.from(backLogList);
      newBackLogList.splice(result.destination.index, 0, removedJob);
  
       setBackLogList(newBackLogList);
    } else if (result.destination.droppableId === "done") {
      const newDoneList = Array.from(doneList);
      newDoneList.splice(result.destination.index, 0, removedJob);
  
       setDoneList(newDoneList);
      
    }

    //if destination ===source, do the following. ill fix once code not so redundant

    // const newTasks = Array.from(jobList);
    // const [reorderedTask] = newTasks.splice(result.source.index, 1);
    // newTasks.splice(result.destination.index, 0, reorderedTask);

    // setJobList(newTasks);
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
          style={{ color: "white", fontStyle: "oblique", marginRight: "4%" }}
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
              <Droppable droppableId="unassigned">
                {(provided) => (
                  <Card
                    style={{ width: "100%" }}
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                  >
                    <ListGroup variant="flush">
                      {unAssignedList &&
                        unAssignedList.map((job, index) => {
                          return (
                            <Draggable
                              key={job.projectName}
                              draggableId={job.projectName} // Use a prefix like 'job-' to distinguish jobs
                              index={index}
                            >
                              {(provided) => (
                                <ListGroup.Item
                                  ref={provided.innerRef}
                                  {...provided.draggableProps}
                                  {...provided.dragHandleProps}
                                >
                                  <div>{job.projectName}</div>
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
            <Droppable droppableId="backlog">
              {(provided) => (
                <Card
                  style={{ width: "100%" }}
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                >
                  <Card.Title>backlog</Card.Title>
                  <ListGroup variant="flush">
                    {backLogList &&
                      backLogList.map((job, index) => (
                        <Draggable
                          key={job.projectName}
                          draggableId={job.projectName} // Use a prefix like 'task-' to distinguish tasks
                          index={index}
                        >
                          {(provided) => (
                            <ListGroup.Item
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              className="task-span" // Add a CSS class for styling
                            >
                              {job.projectName}
                            </ListGroup.Item>
                          )}
                        </Draggable>
                      ))}
                    {provided.placeholder}
                  </ListGroup>
                </Card>
              )}
            </Droppable>
            <Droppable droppableId="progress">
              {(provided) => (
                <Card
                  style={{ width: "100%" }}
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                >
                  <Card.Title>in Progress</Card.Title>
                  <ListGroup variant="flush">
                    {progressList &&
                      progressList.map((job, index) => (
                        <Draggable
                          key={job.projectName}
                          draggableId={job.projectName} // Use a prefix like 'task-' to distinguish tasks
                          index={index}
                        >
                          {(provided) => (
                            <ListGroup.Item
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              className="task-span" // Add a CSS class for styling
                            >
                              {job.projectName}
                            </ListGroup.Item>
                          )}
                        </Draggable>
                      ))}
                    {provided.placeholder}
                  </ListGroup>
                </Card>
              )}
            </Droppable>

            <Droppable droppableId="done">
              {(provided) => (
                <Card
                  style={{ width: "100%" }}
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                >
                  <Card.Title>Done</Card.Title>
                  <ListGroup variant="flush">
                    {doneList &&
                      doneList.map((job, index) => (
                        <Draggable
                          key={job.projectName}
                          draggableId={job.projectName} // Use a prefix like 'task-' to distinguish tasks
                          index={index}
                        >
                          {(provided) => (
                            <ListGroup.Item
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              className="task-span" // Add a CSS class for styling
                            >
                              {job.projectName}
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
{
  /* <Col className="col-10 DragContainerContainer">
                
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



 <Draggable
                key={job}
                draggableId={`job-${job[projectName]}`} // Use a prefix like 'job-' to distinguish jobs
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
</Col> */
}
export default DesignJobs;
