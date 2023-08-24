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
import NavBar from "../Components/NavBar.js";
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
    const fetchData = async () => {
      const specificDate = moment(dateToCheck);
      const startOfWeek = specificDate.clone().startOf("isoWeek");
      let updatedWeekCards = {}; // Initialize the updatedWeekCards object

      if (employees !== null) {
        updatedWeekCards["date"] = startOfWeek.format("l");
        for (const employee of employees) {
          let matchedTimeCard = null;

          for (const timeCardId of employee.timeCards || []) {
            const timeCard = timeCardId.split("~~");

            if (timeCard[0] === startOfWeek.format("l")) {
              matchedTimeCard = timeCard[1].toString();
              break; // Once a match is found, no need to continue the loop
            }
          }

          let timeCardData = null;
          if (matchedTimeCard !== null) {
            timeCardData = await fetchTimeCard(matchedTimeCard);
          }

          updatedWeekCards[employee.employeeName] = timeCardData;
        }

        setCurrentWeekCards(updatedWeekCards);
      }
    };

    fetchData();
    console.log(currentWeekCards);
  }, [dateToCheck, employees]);
  useEffect(() => {
    setCurrentTimeCard(currentWeekCards[currentEmployee?.employeeName]);
  }, [currentWeekCards, currentEmployee]);
  const navigate = useNavigate();
  return (
    <>
      <NavBar />
      <Row>
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
          <GetTime
            dateToCheck={dateToCheck}
            setDateToCheck={setDateToCheck}
            setCurrentTimeCard={setCurrentTimeCard}
          />
          <Row style={{ padding: "5px", paddingRight: "20px" }}>
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
              <DisplayTimeCard
                currentTimeCard={currentTimeCard}
                currentEmployee={currentEmployee}
              />
              {currentTimeCard ? (
                <TimeCardOptions
                  currentEmployee={currentEmployee}
                  setCurrentEmployee={setCurrentEmployee}
                  setEmployees={setEmployees}
                  employees={employees}
                  setCurrentTimeCard={setCurrentTimeCard}
                  currentWeekCards={currentWeekCards}
                  currentTimeCard={currentTimeCard}
                  setCurrentWeekCards={setCurrentWeekCards}
                />
              ) : (
                <></>
              )}
            </div>
          </Row>
        </Col>
      </Row>
    </>
  );
};
export default Calendar;
