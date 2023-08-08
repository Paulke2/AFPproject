
import React from "react";
import { Card } from "react-bootstrap";
import { Form ,Button} from "react-bootstrap";
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
        <Card>
          <Card.Body style={{ padding: "20px" }}>
            <Card.Title>{dayTitle}</Card.Title>
            <ul>
              {jobList?.map((job) => (
                <li key={job}>{job}</li>
              ))}
            </ul>
            <Form.Group controlId="editName">
              <Form.Control
                style={{ color: "black" }}
                value={jobString}
                placeholder="job location"
                onChange={onJobStringChange}
              />
              <Form.Group>
                <Form.Label>-</Form.Label>
                <Form.Control
                  type="number"
                  value={jobNumber}
                  placeholder="hours"
                  onChange={onJobNumberChange}
                />
              </Form.Group>
              <Button variant="success" onClick={onSave}>
                Save
              </Button>
            </Form.Group>
          </Card.Body>
          <Card.Footer>
            <small className="text-muted">Hours: {totalHours}</small>
          </Card.Footer>
        </Card>
      );
    
}
export default WeekCard