import React from "react";
import { Button } from "react-bootstrap";
import "./TimeCardOptions.css";
import Export from "./Export";
const TimeCardOptions = (props) => {

  const handleDelete=()=>{
//we need to pass current employee and current time card, remove curr time card from timecard
//array, then patch employee with new time cards


  }
  //the options right now will be delete, with a form to
  //confirm and an export week/month card
  return (
    <div className="TimeCardOptionsContainer">
        <div className="buttonSpacing">
      <Export currentEmployee={props.currentEmployee} currentWeekCards={props.currentWeekCards}/>
     <br></br>
     <br></br>
      <Button variant="danger"onClick={handleDelete}>delete</Button>
      </div>
    </div>
  );
};

export default TimeCardOptions;
