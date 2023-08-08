
import React from "react";
import { Card } from "react-bootstrap";
import { Form ,Button} from "react-bootstrap";
import "./WeekLayout.css";
const WeekCard = ({
    dayTitle,
    jobList,
    jobString,
    jobNumber,
    onJobStringChange,
    onJobNumberChange,
    onSave,
    totalHours,
  })=>{
    return (
      <Card  style={{ height: "100%" }}>
      <Card.Body style={{ padding: "20px" }}>
        <div className="d-flex flex-column " style={{ height: "100%" ,flexGrow: 1  }}>
          <Card.Title>{dayTitle}</Card.Title>
          <ul>
            {jobList?.map((job) => (
              <li key={job}>{job}</li>
            ))}
          </ul>
          <div className="formsForJob" style={{ flexGrow: 1 }}>
            <Form.Group className="d-flex">
              <Form.Control
                style={{ color: "black", width: "60%" }}
                value={jobString}
                placeholder="Job location"
                onChange={onJobStringChange}
              />
              <Form.Control
                type="number"
                style={{ color: "black", width: "40%" }}
                value={jobNumber}
                placeholder="Hours"
                onChange={onJobNumberChange}
              />
            </Form.Group>
          </div>
          <Button variant="success" onClick={onSave}>
            Save
          </Button>
        </div>
      </Card.Body>
      <Card.Footer>
        <small className="text-muted">Hours: {totalHours}</small>
      </Card.Footer>
    </Card>
      );
    
}
export default WeekCard