import React from "react";
import { Button } from "react-bootstrap";
import "./TimeCardOptions.css";
const TimeCardOptions = () => {
  //the options right now will be delete, with a form to
  //confirm and an export week/month card
  return (
    <div className="TimeCardOptionsContainer">
        <div className="buttonSpacing">
      <Button variant="success">export</Button>
      <Button variant="warning">export to Employee</Button>{" "}
      <Button variant="danger">delete</Button>
      </div>
    </div>
  );
};

export default TimeCardOptions;
