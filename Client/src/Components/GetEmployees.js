import ListGroup from "react-bootstrap/ListGroup";
import { Badge } from "react-bootstrap";
import { useEffect, useState } from "react";
import DeleteEmployee from "./DeleteEmployee";
import "./GetEmployee.css";
import fetchTimeCard from "../functions/fetchTimeCard";
const moment = require("moment");

const GetEmployees = (props) => {
  let startOfDesiredWeek = moment(props.dateToCheck).startOf("isoWeek");

  useEffect(() => {
    startOfDesiredWeek = moment(props.dateToCheck).startOf("isoWeek");
    console.log(startOfDesiredWeek.format("l"));
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
                  employee.employeeName ===
                  (props.currentEmployee && props.currentEmployee.employeeName)
                    ? "#C62323"
                    : "white",
                fontWeight:
                  employee.employeeName ===
                  (props.currentEmployee && props.currentEmployee.employeeName)
                    ? "bold"
                    : "200",
              }}
              onClick={() => {
                props.setCurrentEmployee(employee);
                props.setCurrentTimeCard(null);
              }}
            >
              {employee.employeeName}
              <Badge className="employeeBadge" bg="dark" pill>
                {props?.currentWeekCards[employee.employeeName]?.totalHours
                  ? props?.currentWeekCards[employee.employeeName]?.totalHours
                  : employee.officeWorker
                  ? employee.officeWorkerHours * 5
                  : 0}
              </Badge>
            </ListGroup.Item>
          ))}
      </ListGroup>
    </>
  );
};

export default GetEmployees;
