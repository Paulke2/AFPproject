
import React from "react";
import { ListGroup,Card } from "react-bootstrap";
import SearchResultFilter from "../functions/SearchResultFilter";
const DesignJobList = (props)=>{
    return(<Card style={{ marginLeft: "50px", width: "90%" }}>
    <ListGroup variant="flush">
      {
      props.designJobs &&
      props.designJobs.map((designJob) =>
      SearchResultFilter(props.projectSearch, designJob.name, "none") ? (
            <ListGroup.Item>
              {designJob.projectName} - {designJob.dueDate}
              <div >
              </div>
            </ListGroup.Item>
      ):<></>
          
        )}
    </ListGroup>
  </Card>);
}

export default DesignJobList;