import React from "react";
import { Card, Modal } from "react-bootstrap";
import { Form, Button } from "react-bootstrap";
import { useState, useEffect, useRef } from "react";
import "./WeekLayout.css";
import { Typeahead } from "react-bootstrap-typeahead";
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
  ProjectNames,
}) => {
  const [overTime, setOverTime] = useState("No");
  const [selectedJob, setSelectedJob] = useState("");
  const [selectedJobHours, setSelectedJobHours] = useState(0);
  const eventRef = useRef(null); // Create a ref to hold the event
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  // const handleShow = () => setShow(true);
  const handleShow = (job) => {
    setSelectedJob(job); // Store the clicked job in the state
    setShow(true); // Show the modal
  };

  const deleteJobFromList = async (jobToDelete, oldJobList, event) => {
    console.log(jobToDelete);
    console.log(oldJobList);
    const newJobList = oldJobList.filter((job) => job !== jobToDelete);
    await setJobList(newJobList);
    eventRef.current = event; // Store the event in the ref
  };
  const saveNewJobList = async(jobToAdd,oldJobList,event) => {
    if(!oldJobList.includes(jobToAdd)){
      let newJobList = oldJobList.filter((job) => job !== selectedJob);
     newJobList = [...newJobList,jobToAdd]
    await setJobList(newJobList);
    eventRef.current = event; // Store the event in the ref
    handleClose() 
  }
  };
  useEffect(() => {
    if (eventRef.current) {
      onSave(eventRef.current); // Call onSave with the stored event
      eventRef.current = null;
    }
  }, [jobList, onSave]);
  let index=selectedJob.lastIndexOf("-");
  useEffect(()=>{setSelectedJobHours(selectedJob.slice(index+4))
  console.log("hours:")
  
  console.log(selectedJob.slice(index+4))
  selectedJob.slice(index+1,index+4)==="REG" ? setOverTime("No"):setOverTime("Yes")
  console.log(selectedJob.slice(index+1,index+4))
},[selectedJob])
  
  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{selectedJob.slice(0,index)}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
  
          
        <div style={{display:"flex",alignItems:"center"}}>
          Adjust Hours:  
              <Form.Control
                type="number"
                value={selectedJobHours}
                style={{width:"80px",marginLeft:"5px"}}
                onChange={(event) => setSelectedJobHours(event.target.value)}
                autocomplete="off"
                
              />
            </div>
            <br></br>
        <Form style={{ display: "flex" }}>
          <br></br>
          <br></br>
  <span style={{ marginRight: "10px" }}>Was This Over Time?</span>
  <Form.Check
    type="radio"
    id="custom-switch-yes"
    name="overTimeOption"
    value="Yes"
    onClick={() => setOverTime("Yes")}
    label="Yes"
    checked={overTime === "Yes"}
    style={{ marginRight: "10px" }}
  />
  <Form.Check
    type="radio"
    name="overTimeOption"
    value="No"
    onClick={() => setOverTime("No")}
    checked={overTime === "No"}
    label="No"
    id="custom-switch-no"
    style={{ marginRight: "10px" }}
  />
</Form>
          <Button
            variant="danger"
            onClick={(event) => {
              deleteJobFromList(selectedJob, jobList, event);
              handleClose();
            }}
          >
            Delete Job Entry
          </Button>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="success" onClick={(event)=>saveNewJobList(overTime==="Yes" ? selectedJob.slice(0,index)+"-"+"OTT"+selectedJobHours.toString():selectedJob.slice(0,index)+"-"+"REG"+selectedJobHours.toString(),jobList,event)}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
      <Card style={{ height: "100%", padding: "0px" }}>
        <Card.Body style={{ padding: "0px" }}>
          <div style={{ height: "100%" }}>
            <Card.Title>{dayTitle}</Card.Title>
            <div style={{ paddingLeft: "2px" }}>
              <ul
                style={{ listStylePosition: "inside", margin: 0, padding: 0 }}
              >
                {jobList?.map((job) => (
                  <li
                    key={job}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      padding: "5px 0",
                    }}
                  >
                    <>
                      <span
                        style={{
                          marginLeft: "0px",
                          paddingLeft: "0px",
                          cursor: "pointer",
                        }}
                        onClick={() => handleShow(job)}
                      >
                        {job}
                      </span>
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
    </>
  );
};
export default WeekCard;
