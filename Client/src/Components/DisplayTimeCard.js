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
          const [jobName, jobHours] = jobEntry.split("-");
          const parsedJobHours = parseInt(jobHours);

          newJobsForWeek[jobName.toLowerCase()] =
            (newJobsForWeek[jobName.toLowerCase()] || 0) + parsedJobHours;
        });
      }
    });

    setJobsForWeek(newJobsForWeek);
  }, [props.currentTimeCard]);


  return props.currentTimeCard !== null ? (
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
      <span style={{fontWeight:"600"}}>Week:</span> {props.currentTimeCard.startOfWeek}
      <br></br>
      <span style={{fontWeight:"600"}}>Total Hours:</span> {props.currentTimeCard.totalHours}
      <br></br>
      <div className="buttonOptions">
      <Button variant="success">export</Button>   <Button variant="danger" >delete</Button>

 </div>
      </Col>

      </Row>
      
    </div>
  ) : (
    <div></div>
  );
};

export default DisplayTimeCard;
