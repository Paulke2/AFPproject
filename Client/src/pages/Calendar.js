import ListGroup from "react-bootstrap/ListGroup";
import WeekLayout from "../Components/WeekLayout.js";
import { useState, useEffect } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import logo from "../pictures/AFPlogo.png";
import { useNavigate, useParams } from "react-router-dom";
import DisplayTimeCard from "../Components/DisplayTimeCard";

import "./Calendar.css";
const moment = require("moment");

import GetEmployees from "../Components/GetEmployees.js";
import GetTime from "../Components/GetTime.js";
import fetchTimeCard from "../functions/fetchTimeCard.js";
import TimeCardOptions from "../Components/TimeCardOptions.js";
const Calendar = (props) => {
  const [employees, setEmployees] = useState(null);
  const [currentEmployee, setCurrentEmployee] = useState(null);
  const [currentTimeCard, setCurrentTimeCard] = useState(null);
  const [currentWeekCards, setCurrentWeekCards] = useState({});
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
    const checkTimeCards = async () => {
     
      const updatedWeekCards = { ...currentWeekCards }; // Initialize the updatedWeekCards object
      if(employees!==null){
      for (const employee of employees) {
        const resolvedTimeCards = await Promise.all(
          (employee.timeCards || []).map(async (timeCardId) => {
            const timeCard = await fetchTimeCard(timeCardId);
            
            return timeCard;

          })
        );
  
        const specificDate = moment(dateToCheck);
        const startOfWeek = specificDate.clone().startOf("isoWeek");
  
        let matchedTimeCard = null; // Initialize matchedTimeCard
  
        for (const timeCard of resolvedTimeCards) {
          
          if (timeCard.startOfWeek === startOfWeek.format("l").toString()) {
          
            
            matchedTimeCard = timeCard; // Assign the matched time card
            break;
          }
        }
  
        updatedWeekCards[employee.employeeName] = matchedTimeCard; // Update the object with data for this employee
      }
    }
      setCurrentWeekCards(updatedWeekCards); // Update state once after processing all employees
    };
  
    checkTimeCards();
  }, [dateToCheck, employees]);
  useEffect(()=>{
  
    setCurrentTimeCard(currentWeekCards[currentEmployee?.employeeName])
    },[currentWeekCards,currentEmployee]);
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

      <Row >
        <Col className="col-2 employeeList">
          <GetEmployees
            employees={employees}
            currentEmployee={currentEmployee}
            setCurrentEmployee={setCurrentEmployee}
            setCurrentTimeCard={setCurrentTimeCard}
            dateToCheck={dateToCheck}
            currentWeekCards={currentWeekCards}

          />
        </Col>
        <Col className="col-10" style={{ padding: "0px", fontSize: "large" }}>
          <GetTime dateToCheck={dateToCheck} setDateToCheck={setDateToCheck} setCurrentTimeCard={setCurrentTimeCard} />
          <Row style={{ padding: "5px",paddingRight:"20px"}}>
          <WeekLayout
            currentTimeCard={currentTimeCard}
            setCurrentTimeCard={setCurrentTimeCard}
            currentEmployee={currentEmployee}
            dateToCheck={dateToCheck}
            setCurrentEmployee={setCurrentEmployee}
            currentWeekCards={currentWeekCards}
            setCurrentWeekCards={setCurrentWeekCards}
            ProjectNames={props.ProjectNames}
            employees={employees}
            setEmployees={setEmployees}
            
          />
          <div style={{ display: "flex", justifyContent: "center" }}>
          <DisplayTimeCard currentTimeCard={currentTimeCard} currentEmployee={currentEmployee} />
        { currentTimeCard? <TimeCardOptions currentTimeCard={currentTimeCard} />:<></>}
          </div>
          </Row>

        </Col>
      </Row>
    </div>
  );
};
export default Calendar;
