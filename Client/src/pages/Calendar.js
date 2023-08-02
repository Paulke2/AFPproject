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


   const fetchEmployees = async (id) => {
      const response = await fetch(`/timeCards/${id}`);

      const json = await response.json();

      if (response.ok) {
        return(json);
      }
    };
  const [dateToCheck, setDateToCheck] = useState(moment().format("L"));
  useEffect(() => {
    console.log("ineffect");
    //this is checking if the time card already exits for the week if there is an employee selected
    if (currentEmployee !== null && currentEmployee.timeCards.length > 0) {
      const checkTimeCards = async () => {
        const promises = currentEmployee.timeCards.map(async (timeCardId) => {
          const timeCard = await fetchEmployees(timeCardId);
          return timeCard;
        });
  
        const resolvedTimeCards = await Promise.all(promises);
        const specificDate = moment(dateToCheck);
        const startOfWeek = specificDate.clone().startOf("isoWeek");
        for ( const timeCard of resolvedTimeCards) {
          console.log(timeCard.startOfWeek);
          console.log(startOfWeek.format("l").toString());
          console.log("checking"+timeCard);
          if (timeCard.startOfWeek === startOfWeek.format("l").toString()) {
            setCurrentTimeCard(timeCard);
            console.log(timeCard);
            break;
          }
        }
      };
      checkTimeCards();
    }
  }, [currentEmployee, dateToCheck]);
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
            setCurrentTimeCard={setCurrentTimeCard}
          />
        </Col>
        <Col className="col-10" style={{ padding: "50px", fontSize: "large" }}>
          <GetTime dateToCheck={dateToCheck} setDateToCheck={setDateToCheck} setCurrentTimeCard={setCurrentTimeCard} />
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
