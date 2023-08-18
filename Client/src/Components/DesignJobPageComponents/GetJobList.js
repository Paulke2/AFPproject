import ListGroup from "react-bootstrap/ListGroup";
import { Badge } from "react-bootstrap";
import { Card } from "react-bootstrap";
import { useEffect, useState } from "react";
import "../GetEmployee.css";
import { DragDropContext,Droppable , Draggable} from 'react-beautiful-dnd';
const moment = require("moment");

const GetJobList = (props) => {
  
const handleOnDragEnd = (result)=>{
  console.log(result)
  if (!result.destination) return;
  
    const newTasks = Array.from(props.jobList);
    const [reorderedTask] = newTasks.splice(result.source.index, 1);
    newTasks.splice(result.destination.index, 0, reorderedTask);

    props.setJobList(newTasks);
}

  return (
    <DragDropContext onDragEnd={handleOnDragEnd}>
    <Droppable droppableId="Jobs">
      {(provided) => (
        <Card style={{ width: "100%" }}{...provided.droppableProps} ref={provided.innerRef}>
<ListGroup variant="flush">
          {props.jobList &&
            props.jobList.map((job, index) => {
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
                      <Badge className="employeeBadge" bg="dark" pill>
                0
              </Badge>
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
  </DragDropContext>
  );
};

export default GetJobList;
