
import React from "react";
import { ListGroup,Card } from "react-bootstrap";
import SearchResultFilter from "../functions/SearchResultFilter";
import { useNavigate } from "react-router-dom";
const DesignJobList = (props)=>{
  const navigate = useNavigate();
  let DetermineBackgroundColor=1;
    return(<Card style={{ marginLeft: "50px", width: "90%" }}>
    <ListGroup variant="flush">
      {
      props.designJobs &&
      props.designJobs.map((designJob) =>
      
      SearchResultFilter(props.projectSearch, designJob.projectName, designJob.estimatedTime) ? (
        <ListGroup.Item
        style={{
          backgroundColor:(DetermineBackgroundColor%2?"white":"#F5F5F5"),
          cursor: "pointer",
          display: "flex",
          justifyContent: "space-between", // This aligns the content to both ends
          alignItems: "center" // This vertically centers the content
        }}
          onClick={() => navigate("/projects/" + designJob._id)}
        >
          {designJob.projectName} - {designJob.dueDate}
          
          <span hidden="true">
          {DetermineBackgroundColor=DetermineBackgroundColor+1}
          </span>
        </ListGroup.Item>
      ) : (
       <></>
      )
     
          
        )}
    </ListGroup>
  </Card>);
}

export default DesignJobList;