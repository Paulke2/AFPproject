import ListGroup from "react-bootstrap/ListGroup";
import { Badge } from "react-bootstrap";
import { Card } from "react-bootstrap";
import { useEffect, useState } from "react";
import "../GetEmployee.css";
import { DragDropContext,Droppable , Draggable} from 'react-beautiful-dnd';
const moment = require("moment");

const GetJobList = (props) => {
    const [selectedJob,setSelectedJob]=useState(null);
  let startOfDesiredWeek = moment(props.dateToCheck).startOf("isoWeek");
  const [jobList, setJobList] = useState(props.designJobNames);
console.log(props.designJobNames);
const handleOnDragEnd = (result)=>{
  if (!result.destination) return;
  console.log(result)
    const newTasks = Array.from(jobList);
    const [reorderedTask] = newTasks.splice(result.source.index, 1);
    newTasks.splice(result.destination.index, 0, reorderedTask);

    setJobList(newTasks);
}

  return (
    <DragDropContext onDragEnd={handleOnDragEnd}>
    <Droppable droppableId="Jobs">
      {(provided) => (
        <Card style={{ width: "100%" }}{...provided.droppableProps} ref={provided.innerRef}>
<ListGroup variant="flush">
          {jobList &&
            jobList.map((job, index) => {
              return (
                <Draggable key={job} draggableId={job} index={index}>
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
