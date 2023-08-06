import ListGroup from "react-bootstrap/ListGroup";
import { Badge } from "react-bootstrap";
import { useState, useEffect } from "react";
import DeleteEmployee from "./DeleteEmployee";
import "./GetEmployee.css";
import fetchTimeCard from "../functions/fetchTimeCard.js";

const GetEmployees = (props) => {
  const startOfDesiredWeek =props.dateToCheck.clone().startOf("isoWeek");
  const [totalHoursData, setTotalHoursData] = useState({});
  const [employeeHoursForWeek,setEmployeeHoursForWeek]=useState({});

  async function calculateTotalHoursForDate(employee, dateToCheck) {
    console.log("searchingfor:"+startOfDesiredWeek.format('l'));
    
    for (const timeCard of employee.timeCards) {
      
      let temp = await fetchTimeCard(timeCard); // Assuming fetchTimeCard is an async function
      console.log(temp.startOfWeek);
      if (temp.startOfWeek === startOfDesiredWeek.format('l')) {
        console.log("found card");
        console.log(temp.totalHours);
        return temp.totalHours;
      }
    }

    return 0;
  }

  useEffect(() => {
    // Fetch and store the total hours for each employee when the component mounts or when the props.dateToCheck changes
    if (props.employees && props.dateToCheck) {
      const getTotalHoursForEmployees = async () => {
        const temp = {};
        for (const employee of props.employees) {
          const hours = await calculateTotalHoursForDate(employee, props.dateToCheck);
          temp[employee.id] = hours;
          console.log("here");
        }
        setTotalHoursData(temp);
      };

      getTotalHoursForEmployees();
    }
  }, [props.employees, props.dateToCheck]);

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
                {totalHoursData[employee.id] || 0}
              </Badge>
            </ListGroup.Item>
          ))}
      </ListGroup>
    </>
  );
};

export default GetEmployees;