import ListGroup from "react-bootstrap/ListGroup";
import { Badge } from "react-bootstrap";
import { useEffect, useState } from "react";
import "../GetEmployee.css";
const moment = require("moment");

const GetJobList = (props) => {
    const [selectedJob,setSelectedJob]=useState(null);
  let startOfDesiredWeek = moment(props.dateToCheck).startOf("isoWeek");

console.log(props.designJobNames);
  return (
    <>
      <ListGroup as="ul">
        {props.designJobNames &&
          props.designJobNames.map((job) => (
            <ListGroup.Item
              action
              key={job}
              
              onClick={() => {
                props.setSelectedJob(job);
              }}
            >
              {job}
              <Badge className="employeeBadge" bg="dark" pill>
                4
              </Badge>
            </ListGroup.Item>
          ))}
      </ListGroup>
    </>
  );
};

export default GetJobList;
