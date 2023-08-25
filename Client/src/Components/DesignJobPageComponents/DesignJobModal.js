import { Modal, Button ,Col, Row, Form} from "react-bootstrap";
import { useState, useEffect} from "react";

import "./DesignJobModal.css"
const DesignJobModal = (props,setter) => {
  const [error, setError] = useState(null);

  const patchDesignJobIssues = async()=>{
    let newIssues = {"comments":props?.issues};
  const response = await fetch("https://afpserver.onrender.com/designJobs/" + props?.clickedJob?._id, {
    method: "PATCH",
    body: JSON.stringify(newIssues),
    headers: { "Content-Type": "application/json" }, 
  });
  console.log("ourList")
console.log(newIssues)
  response.json().then((json) => {
    if (!response.ok) {
      setError(json.error);
    } else {
      setError(null);
      console.log("updated design", json);
      props.setClickedJob(json)
    }
   
  });
  }

    const removeIssue = (array, issueToRemove) => {
        console.log(array.filter((item) => item !== issueToRemove));
        props.setIssues( array.filter((item) => item !== issueToRemove));
      };
      const addIssue = (array, issueToAdd) => {
        
        props.setIssues( [...array,issueToAdd]);
        props.setNewIssue("")
      };
  return (
    <>
      <Modal show={props.show} onHide={props.handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{props?.clickedJob?.projectName}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            
            <Row>
                <Col>
                <h6>Date Due:</h6>
            {props?.clickedJob?.dueDate}
            <br></br>
            <h6>Assigned To</h6>
            {props?.clickedJob?.assignedTo}
            </Col>
            <Col>
            <h5>reminders:</h5>
            {props.issues && props.issues.map((comment) => (
  <div key={comment} style={{
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "5px",
  }}>
    {comment}
    <Button variant="danger" className="DeleteJobButton" onClick={()=>removeIssue(props.issues,comment)}>-</Button>
  </div>
 
))}
<div style={{
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
   
  }}>
              <Form.Control
                type="text"
                style={{width:"180px"}}
                value={props.newIssue}
                onChange={(event) =>props.setNewIssue(event.target.value)}
                autocomplete="off"
                placeholder="add reminder"
              />
  <Button  className="DeleteJobButton" onClick={()=>addIssue(props.issues,props.newIssue)} >+</Button>
  </div>
</Col>
</Row>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={props.handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={() =>{props.handleClose(); patchDesignJobIssues();}}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default DesignJobModal;
