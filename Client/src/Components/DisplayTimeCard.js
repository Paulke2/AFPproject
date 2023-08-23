import "./DisplayTimeCard.css";
import { useState, useEffect } from "react";
import { Row,Col,Button } from "react-bootstrap";

const DisplayTimeCard = (props) => {
  //this state list loops through time card job
  //entries,checks for capitalization mistakes in job names, and combines the
  //hours for 2 entries if the capitalization differs
  const [jobsForWeek, setJobsForWeek] = useState({});
  useEffect(() => {
    const newJobsForWeek = {};

    const daysOfWeek = [
      'Sunday', 'Monday', 'Tuesday', 'Wednesday',
      'Thursday', 'Friday', 'Saturday'
    ];

    daysOfWeek.forEach(day => {
      if (props.currentTimeCard?.[day]) {
        props.currentTimeCard[day].split(",").forEach((jobEntry) => {
          let index = jobEntry.lastIndexOf("-");
          const jobName = jobEntry.substring(0, index).trim(); 
          const jobHours = jobEntry.substring(index + 1).trim(); 
          console.log(index);
          console.log(jobName);
          console.log(jobHours.slice(3));
          const parsedJobHours = parseInt(jobHours.slice(3));
    
          newJobsForWeek[jobName.toLowerCase()] =
            (newJobsForWeek[jobName.toLowerCase()] || 0) + parsedJobHours;
        });
      }
    });

    setJobsForWeek(newJobsForWeek);
  }, [props.currentTimeCard]);


  return props.currentTimeCard !== null&&props.currentEmployee !== null  ? (
    <div className="timeCard">
      <h4>{props?.currentTimeCard?.employeeName} </h4>
      <Row>
        <Col style={{textAlign:"left", paddingLeft:"20px"}}>
      
      <h5>Jobs:</h5>
      <ul>
        {Object.entries(jobsForWeek).map(([jobName, jobHours]) => (
          
          <li key={jobName}>
            {jobName}: {jobHours} hours
          </li>
        ))}
      </ul>
      </Col>
      <Col>
      <span style={{fontWeight:"600"}}>Week:</span> {props.currentTimeCard?.startOfWeek}
      <br></br>
      <span style={{fontWeight:"600"}}>Total Hours:</span> {props.currentTimeCard?.totalHours}
      <br></br>
  
      </Col>

      </Row>
      
    </div>
  ) : (
    <div></div>
  );
};

export default DisplayTimeCard;
