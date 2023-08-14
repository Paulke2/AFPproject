
import React from "react";
import { Card } from "react-bootstrap";
import { Form ,Button} from "react-bootstrap";
import { useEffect,useRef } from "react";
import "./WeekLayout.css";
import { Typeahead } from 'react-bootstrap-typeahead';
const WeekCard = ({
    dayTitle,
    jobList,
    setJobList,
    jobString,
    jobNumber,
    onJobStringChange,
    onJobNumberChange,
    onSave,
    totalHours,
    ProjectNames
  })=>{
   
    const eventRef = useRef(null); // Create a ref to hold the event

    const deleteJobFromList = async (jobToDelete, oldJobList, event) => {
      const newJobList = oldJobList.filter(job => job !== jobToDelete);
      await setJobList(newJobList);
      eventRef.current = event; // Store the event in the ref
    };
  
    useEffect(() => {
      if (eventRef.current) {
        onSave(eventRef.current); // Call onSave with the stored event
        eventRef.current = null;
      }
    }, [jobList, onSave]);
    
    return (
      <Card  style={{ height: "100%",padding:"0px" }}>
      <Card.Body style={{ padding:"0px" }}>
        <div  style={{ height: "100%"  }}>
          <Card.Title>{dayTitle}</Card.Title>
          <div style={{paddingLeft:"2px"}}>
          <ul style={{ listStylePosition: "inside", margin: 0, padding: 0 }}>
        {jobList?.map((job) => (
          <li key={job} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "5px 0" }}>
          <>
            <span style={{marginLeft:"0px",paddingLeft:"0px"}}>{job}</span>
            <Button
              variant="danger"
              className="DeleteJobButton"
            
              onClick={(event) => {
                deleteJobFromList(job, jobList, event);
              }}
            >
              -
            </Button>
            </>
          </li>
        ))}
      </ul>
          </div>
          <div className="formsForJob" style={{ flexGrow: 1 }}>
          <Form.Group className="d-flex">
  <Typeahead
    labelKey="name"
    id="job locatoin select"
    onChange={onJobStringChange}
    style={{ color: "black", width: "60%" }}
    options={ProjectNames}
    placeholder="Jobs"
    selected={jobString ? [jobString] : []} // Convert jobString to an array or use an empty array
  />
  <Form.Control
    type="number"
    style={{ color: "black", width: "40%" }}
    value={jobNumber}
    placeholder="Hours"
    onChange={onJobNumberChange}
    className="no-spinners"
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
export default WeekCard;