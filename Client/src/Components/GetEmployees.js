import ListGroup from "react-bootstrap/ListGroup";
import { Badge } from "react-bootstrap";
import { useEffect, useState } from "react";
import DeleteEmployee from "./DeleteEmployee";
import "./GetEmployee.css";
import fetchTimeCard from "../functions/fetchTimeCard";
const moment = require("moment");

const GetEmployees = (props) => {
  const [hoursForCurrentWeek, setHoursForCurrentWeek] = useState({});
  let startOfDesiredWeek = moment(props.dateToCheck).startOf("isoWeek");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    startOfDesiredWeek = moment(props.dateToCheck).startOf("isoWeek");
    console.log(startOfDesiredWeek.format('l'));
  }, [props.dateToCheck]);

  

  return (
    <>
      
     
        <ListGroup as="ul">
          {props.employees &&
            props.employees.map((employee) => (
              <ListGroup.Item
                action
                key={employee.id}
                style={{
                  backgroundColor:
                    employee.employeeName === (props.currentEmployee && props.currentEmployee.employeeName)
                      ? "#C62323"
                      : "white",
                  fontWeight: employee.employeeName === (props.currentEmployee && props.currentEmployee.employeeName)
                    ? "bold"
                    : "200"
                }}
                onClick={() => {
                  props.setCurrentEmployee(employee);
                  props.setCurrentTimeCard(null);
                }}
              >
                {employee.employeeName}
                <Badge className="employeeBadge" bg="dark" pill>
                  {hoursForCurrentWeek[employee.employeeName]}
                </Badge>
              </ListGroup.Item>
            ))}
        </ListGroup>
    </>
  );
}

export default GetEmployees;