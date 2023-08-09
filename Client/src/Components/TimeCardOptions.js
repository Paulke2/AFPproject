import React from "react";
import { Button } from "react-bootstrap";
import "./TimeCardOptions.css";
import Export from "./Export";
const TimeCardOptions = (props) => {
  //the options right now will be delete, with a form to
  //confirm and an export week/month card
  return (
    <div className="TimeCardOptionsContainer">
        <div className="buttonSpacing">
      <Export currentTimeCard={props.currentTimeCard}/>
     <br></br>
     <br></br>
      <Button variant="danger">delete</Button>
      </div>
    </div>
  );
};

export default TimeCardOptions;
