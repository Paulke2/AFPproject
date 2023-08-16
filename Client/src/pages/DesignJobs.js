import React, { useState } from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import logo from "../pictures/AFPlogo.png";
import { useNavigate } from "react-router-dom";
import { Col, Row } from "react-bootstrap";
import { Card } from "react-bootstrap";
import "./DesignJobs.css";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import GetJobList from "../Components/DesignJobPageComponents/GetJobList";

const DesignJobs = (props) => {
  const navigate = useNavigate();

  const [tasks, setTasks] = useState([
    { id: "1", content: "Task 1" },
    { id: "2", content: "Task 2" },
    { id: "3", content: "Task 3" },
  ]);

  const onDragEnd = (result) => {
    if (!result.destination) return;

    const newTasks = Array.from(tasks);
    const [reorderedTask] = newTasks.splice(result.source.index, 1);
    newTasks.splice(result.destination.index, 0, reorderedTask);

    setTasks(newTasks);
  };

  return (
    <>
      {/* Your Navbar code */}
      <Row style={{ height: "500px", width: "100%" }}>
        <Col className="col-2 employeeList">
          <div>
            <GetJobList designJobNames={props.designJobNames} />
          </div>
        </Col>
        <Col className="col-10 DragContainerContainer">
          <Card className="DragContainer">
            <Card.Body>
              <Card.Title>Done</Card.Title>
              <Card.Text>
                <DragDropContext onDragEnd={onDragEnd}>
                  <Droppable droppableId="done" type="CARD">
                    {(provided) => (
                      <div
                        className="characters"
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                      >
                        {tasks.map((item, index) => (
                          <Draggable
                            key={item.id}
                            draggableId={item.id} // Ensure this matches the task ID
                            index={index}
                          >
                            
                                                     {(provided) => (
                              <span
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                className="task-span" // Add a CSS class for styling
                              >
                                {item.id}
                              </span>
                            )}
                          </Draggable>
                        ))}
                        {provided.placeholder}
                      </div>
                    )}
                  </Droppable>
                </DragDropContext>
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default DesignJobs;