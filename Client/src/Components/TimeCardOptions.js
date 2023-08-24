import React from "react";
import { Button } from "react-bootstrap";
import { useState } from "react";
import "./TimeCardOptions.css";
import Export from "./Export";
const TimeCardOptions = (props) => {
  const [error, setError] = useState(null);
  const handleDelete = async() => {

    //we need to delete from employee,
    const updatedTimeCards = props?.currentEmployee?.timeCards.filter((cardID) => cardID.split("~~")[1] !== props.currentTimeCard._id);
   
    const newTimeCards={timeCards:updatedTimeCards}
    try {
      const response = await fetch(`/employees/${props?.currentEmployee?._id}`, {
        method: "PATCH",
        body: JSON.stringify(newTimeCards),
        headers: { "Content-Type": "application/json" },
      });
  
      const json = await response.json();
      if (!response.ok) {
        // Handle error
        setError(json.error);
      } else {
        setError(null);
        console.log("employee updated", json);
        console.log(props.employees)
        //first remove employee, then add new empployee with ipdated info
        let tempEmployees = props.employees.map((employee) => {
          if (employee.employeeName !== props.currentEmployee.employeeName) {
            return employee;
          } else {
            // You can return some JSON data here or whatever you want.
            return json;
          }
        });
        props.setEmployees(tempEmployees)
        props.setCurrentWeekCards(...currentWeekCards, currentWeekCards[props.currentEmployee.employeeName]=null)
        props.setCurrentWeekCard(null)
        console.log(props.currentEmployee)

      }
    } catch (error) {
      console.error("Error while updating employee:", error);
      setError("Error while updating employee");
    }

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
