import React from "react";
import { Button } from "react-bootstrap";
import "./TimeCardOptions.css";
import Export from "./Export";
const TimeCardOptions = (props) => {
  const handleDelete = async() => {
    //we need to delete from employee,
    await fetch()


    //tjen delete from the employees state(are they array of obj or array of ID?)

    //then delete the time card id from our time cards, 
    
    //set currentCard to NULL and i think thats it.



  };
  //the options right now will be delete, with a form to
  //confirm and an export week/month card

  return (
    <div className="TimeCardOptionsContainer">
      <div className="buttonSpacing">
        <Export
          employees={props.employees}
          currentEmployee={props.currentEmployee}
          currentWeekCards={props.currentWeekCards}
        />
        <br></br>
        <br></br>
        <Button variant="danger" onClick={handleDelete}>
          delete
        </Button>
      </div>
    </div>
  );
};

export default TimeCardOptions;
