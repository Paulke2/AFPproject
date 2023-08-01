import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import { Button, Modal } from "react-bootstrap";

//home will call this. make a pop-up/modal with prefilled info taken from the cvs. ask if info is correct, then creates a new project.

const NewProject = (props) => {
  const handleClose = () => props.setShowNewProject(false);
  // eslint-disable-next-line no-unused-vars
  const [error, setError] = useState(null);
  const handleSave = async (event) => {
    event.preventDefault();
    const project = {
      name: props.projectName,
      scope: props.scope,
      projectID: props.projectID,
      turnoverDate: props.turnoverDate,
      location: props.location,
      contractWith: props.contractWith,
      amount: props.amount,
      comments: [],
    };
    const response = await fetch("/projects/", {
      method: "POST",
      body: JSON.stringify(project),
      headers: { "Content-Type": "application/json" },
    });
    const json = await response.json();
    if (!response.ok) {
      setError(json.error);
    } else {
      setError(null);
      console.log("new project added", json);
    }
  };

  return (
    <>
      <Modal size="lg" show={props.showNewProject}>
        <Modal.Header closeButton>
          <Modal.Title>New Project</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Please double check the new Project info below and make any necessary
          changes.
          <Form>
            <Form.Group>
              <Form.Control
                type="text"
                id="create plantType"
                name="Project ID"
                value={props.projectName}
                onChange={(event) => props.setProjectName(event.target.value)}
                autocomplete="off"
                placeholder="Project Name"
              />
              <Form.Control
                type="text"
                id="create plantType"
                name="Project ID"
                value={props.projectID}
                onChange={(event) => props.setProjectID(event.target.value)}
                autocomplete="off"
                placeholder="Project ID"
              />
            </Form.Group>
            <Form.Control
              type="text"
              id="scope"
              name="scope"
              value={props.scope}
              onChange={(event) => props.setScope(event.target.value)}
              placeholder="project scope"
            />
            <Form.Group>
              <Form.Control
                type="name"
                id="turnoverdate"
                name="turnoverdate"
                value={props.turnoverDate}
                onChange={(event) => props.setTurnoverDate(event.target.value)}
                placeholder="turnoverdate"
              />
              <Form.Control
                type="location"
                id="location"
                name="location"
                value={props.location}
                onChange={(event) => props.setLocation(event.target.value)}
                placeholder="location"
              />
              <Form.Control
                type="amount"
                id="amount"
                name="amount"
                value={props.amount}
                onChange={(event) => props.setAmount(event.target.value)}
                placeholder="location"
              />
              <Form.Control
                type="amount"
                id="contract with"
                name="amount"
                value={props.contractWith}
                onChange={(event) => props.setContractWith(event.target.value)}
                placeholder="contractwith"
              />
            </Form.Group>
            <Form.Group></Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>Close</Button>
          <Button variant="primary" onClick={handleSave}>Save</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
export default NewProject;
