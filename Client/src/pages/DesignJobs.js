import React, { useEffect, useState, useRef } from "react";
import patchDesignProject from "../functions/patchDesignProject";
import ListGroup from "react-bootstrap/ListGroup";
import logo from "../pictures/AFPlogo.png";
import { useNavigate } from "react-router-dom";
import { Col, Row } from "react-bootstrap";
import { Card } from "react-bootstrap";
import "./DesignJobs.css";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import NavBar from "../Components/NavBar.js";
import "./Calendar.css";
const DesignJobs = (props) => {
  const navigate = useNavigate();
  const resultRef = useRef(null);

  
  const [unAssignedList, setUnAssignedList] = useState(null);
  const [backLogList, setBackLogList] = useState(null);
  const [progressList, setProgressList] = useState(null);
  const [doneList, setDoneList] = useState(null);
  const [userList, setUserList] = useState([]);
  const [error, setError] = useState(null);
  useEffect(() => {
    const fetchUsers = async () => {
      const response = await fetch("/user");

      const json = await response.json();

      if (response.ok) {
        setUserList(json);
      }
    };
    fetchUsers();
  }, []);

  useEffect(() => {
    let tempUnAssignedList = [];
    let tempBackLogList = [];
    let tempProgressList = [];
    let tempDoneList = [];
    props?.designJobs?.map((job) => {
     
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
  }, []);
  const onDragEnd = async (result) => {
    let removedJob = null;
    console.log(result.destination.index)
    if (!result.destination) return;
    let newUnassignedList= Array.from(unAssignedList);
    let newProgressList = Array.from(progressList);
    let newBackLogList = Array.from(backLogList);
    let newDoneList = Array.from(doneList);

    if (result.source.droppableId === "unassigned") {
      removedJob=unAssignedList[result.source.index]
      newUnassignedList.splice(result.source.index, 1);
      setUnAssignedList(newUnassignedList);
    } else if (result.source.droppableId === "progress") {
      removedJob=newProgressList[result.source.index]
      newProgressList.splice(result.source.index, 1);
     setProgressList(newProgressList);
    } else if (result.source.droppableId === "backlog") {
      removedJob=newBackLogList[result.source.index]
      newBackLogList.splice(result.source.index, 1);
      setBackLogList(newBackLogList);
    } else if (result.source.droppableId === "done") {
      removedJob=newDoneList[result.source.index]
      newDoneList.splice(result.source.index, 1);
      
   
    }
    const newList = props.designJobs.map((job) => (
      job.projectName === removedJob.projectName
        ? { ...removedJob, currentContainer: result.destination.droppableId }
        : job
    ));
    props.setDesignJobs(newList);
    if (result.destination.droppableId === "unassigned") {
      patchDesignProject(event,removedJob,"currentContainer","unassigned",setError,newUnassignedList,setUnAssignedList,result.destination.index)
    } else if (result.destination.droppableId === "progress") {
      patchDesignProject(event,removedJob,"currentContainer","progress",setError,newProgressList,setProgressList,result.destination.index)
    } else if (result.destination.droppableId === "backlog") {
      patchDesignProject(event,removedJob,"currentContainer","backlog",setError,newBackLogList,setBackLogList,result.destination.index)
    } else if (result.destination.droppableId === "done") {
      patchDesignProject(event,removedJob,"currentContainer","done",setError,newDoneList,setDoneList,result.destination.index)
      
      console.log(newDoneList);

    
    }
    if(unAssignedList != newUnassignedList){
      setUnAssignedList(newUnassignedList)
    }
    if(newProgressList != progressList){
      setProgressList(newProgressList)
    }
    if(backLogList != newBackLogList){
      setBackLogList(newBackLogList)
    }
    if(newDoneList != doneList){
      setDoneList(newDoneList)
    }
    
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
        <DragDropContext onDragEnd={(result)=>{onDragEnd(result)}}>
          <Col className="col-3 employeeList">
            <div>
              <Droppable droppableId="unassigned">
                {(provided) => (
                  <Card
                  className="unassignedContainer"
                    style={{ width: "100%", height:"100%"}}
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
                                className="designJobCard"
                                  ref={provided.innerRef}
                                  {...provided.draggableProps}
                                  {...provided.dragHandleProps}
                                >
                                  <div>{job.projectName}</div>
                                  <DropdownButton
                                  size="sm"
                                  variant="danger"
                                    title={
                                      job.assignedTo === ""
                                        ? "Assign To"
                                        : job.assignedTo
                                    }
                                  >
                                    {userList &&
                                      userList.map((user) => {
                                      
                                        return (
                                          <Dropdown.Item
                                            eventKey="1"
                                            onClick={(event) =>
                                              patchDesignProject(
                                                event,
                                                job,
                                                "assignedTo",
                                                user.name,
                                                setError,
                                                unAssignedList,
                                                setUnAssignedList,
                                                index
                                              )
                                            }
                                          >
                                            {user.name}
                                          </Dropdown.Item>
                                        );
                                      })}
                                    <Dropdown.Divider />
                                    <Dropdown.Item eventKey="4">
                                      Separated link
                                    </Dropdown.Item>
                                  </DropdownButton>
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
          <Col className="col-9 DragContainerContainer">
            <Droppable droppableId="backlog" style={{ paddingLeft: "20px" }}>
              {(provided) => (
                <Card
                  className="DragContainer"
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                >
                  <Card.Title>backlog</Card.Title>
                  <ListGroup variant="flush">
                    {backLogList &&
                      backLogList.map((job, index) => {
                  
                       return <Draggable
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
                              <DropdownButton
                              size="sm"
                              variant="danger"
                                    title={
                                      job.assignedTo === ""
                                        ? "Assign To"
                                        : job.assignedTo
                                    }
                                  >
                                    {userList &&
                                      userList.map((user) => {
                                        return (
                                          <Dropdown.Item
                                            eventKey="1"
                                            onClick={(event) =>
                                              patchDesignProject(
                                                event,
                                                job,
                                                "assignedTo",
                                                user.name,
                                                setError,
                                                backLogList,
                                                setBackLogList,
                                                index
                                              )
                                            }
                                          >
                                            {user.name}
                                          </Dropdown.Item>
                                        );
                                      })}
                                    
                                  </DropdownButton>
                            </ListGroup.Item>
                          )}
                        </Draggable>
                      })}
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
                              <DropdownButton
                              size="sm"
                              variant="danger"
                                    title={
                                      job.assignedTo === ""
                                        ? "Assign To"
                                        : job.assignedTo
                                    }
                                  >
                                    {userList &&
                                      userList.map((user) => {
                                        return (
                                          <Dropdown.Item
                                            eventKey="1"
                                            onClick={(event) =>
                                              patchDesignProject(
                                                event,
                                                job,
                                                "assignedTo",
                                                user.name,
                                                setError,
                                                progressList,
                                                setProgressList,
                                                index
                                              )
                                            }
                                          >
                                            {user.name}
                                          </Dropdown.Item>
                                        );
                                      })}
                                    
                                  </DropdownButton>
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
                              <DropdownButton
                              size="sm"
                              variant="danger"
                                    title={
                                      job.assignedTo === ""
                                        ? "Assign To"
                                        : job.assignedTo
                                    }
                                  >
                                    {userList &&
                                      userList.map((user) => {
                                        return (
                                          <Dropdown.Item
                                            eventKey="1"
                                            onClick={(event) =>
                                              patchDesignProject(
                                                event,
                                                job,
                                                "assignedTo",
                                                user.name,
                                                setError,
                                                doneList,
                                                setDoneList,
                                                index
                                              )
                                            }
                                          >
                                            {user.name}
                                          </Dropdown.Item>
                                        );
                                      })}
                                    
                                  </DropdownButton>
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
