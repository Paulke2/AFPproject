import ListGroup from "react-bootstrap/ListGroup";
import WeekLayout from "../Components/WeekLayout.js";
import { Button } from "react-bootstrap";
import { useState, useEffect } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import logo from "../pictures/AFPlogo.png";
import { useNavigate, useParams } from "react-router-dom";
import DisplayTimeCard from "../Components/DisplayTimeCard";
import OutputTimeCards from "../Components/OutputTimeCards.js";
import "./Calendar.css";
const moment = require("moment");
import Badge from "react-bootstrap/Badge";
import GetEmployees from "../Components/GetEmployees.js";
import GetTime from "../Components/GetTime.js";
const Calendar = () => {
  const [employees, setEmployees] = useState(null);
  const [currentEmployee, setCurrentEmployee] = useState(null);
  const [currentTimeCard, setCurrentTimeCard] = useState(null);
  useEffect(() => {
    const fetchEmployees = async () => {
      const response = await fetch("/employees");

      const json = await response.json();

      if (response.ok) {
        setEmployees(json);
      }
    };
    fetchEmployees();
  }, []);

  const [dateToCheck, setDateToCheck] = useState(moment().format("L"));
  useEffect(() => {
    console.log("ineffect");
    if (currentEmployee !==null && currentEmployee.timeCards) {
      for (let i = 0; i < currentEmployee.timeCards.length; i++) {
        const timeCard = currentEmployee.timeCards[i];
        if (timeCard.startOfWeek === dateToCheck) {
          setCurrentTimeCard(timeCard);
          console.log("new timecard" + timeCard.startOfWeek);
          break;
        }
      }
    }
  }, [dateToCheck, currentEmployee]);
  const navigate = useNavigate();
  return (
    <div>
      <Navbar
        style={{
          backgroundColor: "#90ee90",
          paddingLeft: "16px",
          paddingRight: "16px",
          boxShadow: "0 4px 6px -6px #222",
        }}
        bg="dark"
        data-bs-theme="dark"
      >
        <Nav className="me-auto"></Nav>
        <Nav.Link
          onClick={() => navigate("/Calendar")}
          style={{ color: "white", fontStyle: "oblique" }}
        >
          Calendar
        </Nav.Link>
        <Navbar.Brand
          style={{ cursor: "pointer", marginLeft: "20px" }}
          onClick={() => navigate("/")}
        >
          <img className="logo" src={logo} />
        </Navbar.Brand>
      </Navbar>

      <Row>
        <Col className="col-2 employeeList">
          <GetEmployees
            employees={employees}
            currentEmployee={currentEmployee}
            setCurrentEmployee={setCurrentEmployee}
          />
        </Col>
        <Col className="col-10" style={{ padding: "50px", fontSize: "large" }}>
          <GetTime dateToCheck={dateToCheck} setDateToCheck={setDateToCheck} />
          <WeekLayout
            currentTimeCard={currentTimeCard}
            setCurrentTimeCard={setCurrentTimeCard}
            currentEmployee={currentEmployee}
            dateToCheck={dateToCheck}
          />
        </Col>
      </Row>
    </div>
  );
};
export default Calendar;
