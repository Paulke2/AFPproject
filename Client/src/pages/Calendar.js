import ListGroup from 'react-bootstrap/ListGroup';
import Container from 'react-bootstrap/Container';
import { Button } from 'react-bootstrap';
import { useState } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import logo from "../pictures/AFPlogo.png"
import { useNavigate, useParams } from "react-router-dom";
import './Calendar.css'
const moment = require('moment');
import Badge from 'react-bootstrap/Badge';
const Calendar = () =>{
    const navigate = useNavigate();
    const [dateToCheck,setDateToCheck]=useState(moment().format('L'));
    //const DateToCheck =moment().format('L'); 

    // Create a moment object with the specifieD date
    const specificDate = moment(dateToCheck);
    
    // Get the start of the week (Sunday in the US, Monday in other regions)
    const startOfWeek = specificDate.clone().startOf('isoWeek');
    
    // Get the end of the week (Saturday in the US, Sunday in other regions)
    const endOfWeek = specificDate.clone().endOf('isoWeek');
    
    // Now you have the start and end dates of the specified week


return(<div> 
<Navbar  style={{
                backgroundColor: "#90ee90",
                paddingLeft: "16px",
                paddingRight: "16px",
                boxShadow: "0 4px 6px -6px #222"
            }}bg="dark" data-bs-theme="dark">
          
          <Nav className="me-auto"></Nav>
          <Nav.Link onClick={() => navigate("/Calendar")} style={{color:"white",fontStyle:"oblique"}}>Calendar</Nav.Link>
          <Navbar.Brand
            style={{ cursor: "pointer",marginLeft:"20px"}}
            onClick={() => navigate("/")}
          >
                        <img className="logo"src={logo}/>
          </Navbar.Brand>
      </Navbar>

      <Row>
        <Col className='col-2 employeeList' >
        <ListGroup as="ul">
      <ListGroup.Item action  >
        Paul Kearney
        <Badge bg="primary" pill>
          14
        </Badge>
      </ListGroup.Item>
      <ListGroup.Item action >other Kearney
      <Badge bg="primary" pill>
          14
        </Badge></ListGroup.Item>
      <ListGroup.Item action >
      example Kearney
      <Badge bg="primary" pill>
          14
        </Badge>
      </ListGroup.Item>
      <ListGroup.Item action >place holdington
      <Badge bg="primary" pill>
          14
        </Badge></ListGroup.Item>
    </ListGroup>
        </Col>
        <Col className='col-10'>
        <Button onClick={()=> setDateToCheck(startOfWeek.subtract(1, 'days'))}></Button>
      {startOfWeek.format('l').toString()} - {endOfWeek.format('l').toString()}
      <Button onClick={()=> setDateToCheck(endOfWeek.add(1, 'days'))}></Button>
      

        </Col>
      </Row>

    
 </div>);
}
export default Calendar;