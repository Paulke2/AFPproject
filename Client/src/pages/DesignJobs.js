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
import NavBar from "../Components/NavBar.js";
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
    let newUnassignedList= Array.from(unAssignedList);
    let newProgressList = Array.from(progressList);
    let newBackLogList = Array.from(backLogList);
    let newDoneList = Array.from(doneList);

    if (result.source.droppableId === "unassigned") {
      removedJob=unAssignedList[result.source.index]
      newUnassignedList.splice(result.source.index, 1);
      
    } else if (result.source.droppableId === "progress") {
      removedJob=newProgressList[result.source.index]
      newProgressList.splice(result.source.index, 1);
     
    } else if (result.source.droppableId === "backlog") {
      removedJob=newBackLogList[result.source.index]
      newBackLogList.splice(result.source.index, 1);
      
    } else if (result.source.droppableId === "done") {
      removedJob=newDoneList[result.source.index]
      newDoneList.splice(result.source.index, 1);
   
    }
 console.log("removed:")
 console.log(removedJob)
 console.log(result.source.droppableId)
 console.log(result.destination.droppableId)
    if (result.destination.droppableId === "unassigned") {
      
      newUnassignedList.splice(result.destination.index, 0, removedJob);
  
    
    } else if (result.destination.droppableId === "progress") {
      
      newProgressList.splice(result.destination.index, 0, removedJob);
  
    } else if (result.destination.droppableId === "backlog") {
     
      newBackLogList.splice(result.destination.index, 0, removedJob);
  
    } else if (result.destination.droppableId === "done") {
   
      newDoneList.splice(result.destination.index, 0, removedJob);
  
      
      console.log(newDoneList)
    }
    setUnAssignedList(newUnassignedList);
    setBackLogList(newBackLogList);
    setDoneList(newDoneList);
    setProgressList(newProgressList);
    //if destination ===source, do the following. ill fix once code not so redundant

    // const newTasks = Array.from(jobList);
    // const [reorderedTask] = newTasks.splice(result.source.index, 1);
    // newTasks.splice(result.destination.index, 0, reorderedTask);

    // setJobList(newTasks);
  };

  return (
    <>
      <NavBar />
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
            <Droppable droppableId="backlog" style={{paddingLeft:"20px"}}>
              {(provided) => (
                <Card
                  className="DragContainer"
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
                className="DragContainer"
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
                className="DragContainer"
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
export default DesignJobs;
