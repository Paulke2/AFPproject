import ListGroup from "react-bootstrap/ListGroup";
import { Badge } from "react-bootstrap";
import { useState } from "react";
import DeleteEmployee from "./DeleteEmployee";
const GetEmployees = (props) => {
  const [selectedColor, setSelectedColor] = useState("green");
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
                  employee.employeeName ===( props.currentEmployee &&props.currentEmployee.employeeName)
                    ? "red"
                    : "white",
              }}
              onClick={() => props.setCurrentEmployee(employee)}
            >
              {employee.employeeName}
              <Badge bg="primary" pill>
                14
              </Badge>
            </ListGroup.Item>
          ))}
      </ListGroup>
    </>
  );
            }
export default GetEmployees;
