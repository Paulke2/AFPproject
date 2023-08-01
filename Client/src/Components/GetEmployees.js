
import ListGroup from "react-bootstrap/ListGroup";
import { Badge } from "react-bootstrap";
const GetEmployees = (props)=>{
    return(
        <>
    <ListGroup as="ul">
    {props.employees &&
      props.employees.map((employee) => (
        <ListGroup.Item action key={employee.id}>
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