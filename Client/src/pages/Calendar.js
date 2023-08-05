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
import fetchTimeCard from "../functions/fetchTimeCard.js";
const Calendar = () => {
  const [employees, setEmployees] = useState(null);
  const [currentEmployee, setCurrentEmployee] = useState(null);
  const [currentTimeCard, setCurrentTimeCard] = useState(null);
  const [startOfDesiredWeek, setStartOfDesiredWeek] = useState(null);
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


  const [dateToCheck, setDateToCheck] = useState(moment().format("l"));
  useEffect(() => {

    //this is checking if the time card already exits for the week if there is an employee selected
    if (currentEmployee !== null && currentEmployee.timeCards.length > 0) {
      console.log("here");
      console.log(currentEmployee.timeCards);
      const checkTimeCards = async () => {
        const promises = currentEmployee.timeCards.map(async (timeCardId) => {
          console.log(timeCardId);
          const timeCard = await fetchTimeCard(timeCardId);
          return timeCard;
        });
  
        const resolvedTimeCards = await Promise.all(promises);
        const specificDate = moment(dateToCheck);
        const startOfWeek = specificDate.clone().startOf("isoWeek");
        for ( const timeCard of resolvedTimeCards) {
          if (timeCard.startOfWeek === startOfWeek.format("l").toString()) {
            setCurrentTimeCard(timeCard);
            console.log("found match")
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
          <Row>
          <WeekLayout
            currentTimeCard={currentTimeCard}
            setCurrentTimeCard={setCurrentTimeCard}
            currentEmployee={currentEmployee}
            dateToCheck={dateToCheck}
            setCurrentEmployee={setCurrentEmployee}
          />
          </Row>
          <Row>
          <DisplayTimeCard currentTimeCard={currentTimeCard} />
          </Row>
        </Col>
      </Row>
    </div>
  );
};
export default Calendar;
