import Card from "react-bootstrap/Card";
import { Button, Form } from "react-bootstrap";
import CardGroup from "react-bootstrap/CardGroup";
import { useCallback, useEffect, useState } from "react";
import updateTimeCardDay from "../functions/updateTimeCardDay";
import fetchTimeCard from "../functions/fetchTimeCard";
import "./WeekLayout.css";
import getTotalHoursForDay from "../functions/getTotalHoursForDay";
import DisplayTimeCard from "./DisplayTimeCard";
const moment = require("moment");
const WeekLayout = (props) => {
  //map over time employees time cards. if one matches the week, we want to load it. else, cr
  //create a time sheet
  const specificDate = moment(props.dateToCheck);
  const startOfWeek = specificDate.clone().startOf("isoWeek");
  const [error, setError] = useState(null);
  const [SundayString, setSundayString] = useState("");
  const [MondayString, setMondayString] = useState("");
  const [TuesdayString, setTuesdayString] = useState("");
  const [WednesdayString, setWednesdayString] = useState("");
  const [ThursdayString, setThursdayString] = useState("");
  const [FridayString, setFridayString] = useState("");
  const [SaturdayString, setSaturdayString] = useState("");
  const [SundayJobList, setSundayJobList] = useState([]);
  const [MondayJobList, setMondayJobList] = useState([]);
  const [TuesdayJobList, setTuesdayJobList] = useState([]);
  const [WednesdayJobList, setWednesdayJobList] = useState([]);
  const [ThursdayJobList, setThursdayJobList] = useState([]);
  const [FridayJobList, setFridayJobList] = useState([]);
  const [SaturdayJobList, setSaturdayJobList] = useState([]);
  const [SundayNumber, setSundayNumber] = useState();
  const [MondayNumber, setMondayNumber] = useState();
  const [TuesdayNumber, setTuesdayNumber] = useState();
  const [WednesdayNumber, setWednesdayNumber] = useState();
  const [ThursdayNumber, setThursdayNumber] = useState();
  const [FridayNumber, setFridayNumber] = useState();
  const [SaturdayNumber, setSaturdayNumber] = useState();
  const [totalSundayNumber, setTotalSundayNumber] = useState(0);
  const [totalMondayNumber, setTotalMondayNumber] = useState(0);
  const [totalTuesdayNumber, setTotalTuesdayNumber] = useState(0);
  const [totalWednesdayNumber, setTotalWednesdayNumber] = useState(0);
  const [totalThursdayNumber, setTotalThursdayNumber] = useState(0);
  const [totalFridayNumber, setTotalFridayNumber] = useState(0);
  const [totalSaturdayNumber, setTotalSaturdayNumber] = useState(0);
  const [weekTotalHours, setWeekTotalHours] = useState(0);

  const getStringForDay = (dayNumber, dayString) => {
    return dayNumber !== undefined
      ? dayString + "-" + dayNumber.toString()
      : "";
  };
  useEffect(() => {
    // Calculate the sum of hours for the week
    const sumOfWeek =
      totalSundayNumber +
      totalMondayNumber +
      totalTuesdayNumber +
      totalWednesdayNumber +
      totalThursdayNumber +
      totalFridayNumber +
      totalSaturdayNumber;

    // Update the weekTotalHours state
    setWeekTotalHours(sumOfWeek);
  }, [
    props?.currrentTimeCard,
    props?.currentEmployee,
    totalMondayNumber,
    totalTuesdayNumber,
    totalWednesdayNumber,
    totalThursdayNumber,
    totalFridayNumber,
    totalSaturdayNumber,
    totalSundayNumber,
  ]);
  const getTotalHours = () => {
    return (
      totalMondayNumber +
      totalTuesdayNumber +
      totalWednesdayNumber +
      totalThursdayNumber +
      totalFridayNumber +
      totalSaturdayNumber +
      totalSundayNumber +
      getWeekNumbers()
    );
  };
  const getWeekNumbers = () => {
    const total =
      (MondayNumber !== undefined ? parseInt(MondayNumber) : 0) +
      (SundayNumber !== undefined ? parseInt(SundayNumber) : 0) +
      (TuesdayNumber !== undefined ? parseInt(TuesdayNumber) : 0) +
      (WednesdayNumber !== undefined ? parseInt(WednesdayNumber) : 0) +
      (ThursdayNumber !== undefined ? parseInt(ThursdayNumber) : 0) +
      (FridayNumber !== undefined ? parseInt(FridayNumber) : 0) +
      (SaturdayNumber !== undefined ? parseInt(SaturdayNumber) : 0);
    console.log("total:" + total);
    return total;
  };
  const handleSave = async (event) => {
    event.preventDefault();
    console.log("in patch" + totalSundayNumber);
    if (
      !props.currentTimeCard ||
      props.currentEmployee.timeCards.some(
        (timeCard) => timeCard.startOfWeek === startOfWeek.format("l")
      )
    ) {
      //this is when is a brand new week.
      console.log("brand new week");
      const timeCard = {
        startOfWeek: startOfWeek.format("l"),
        Sunday: getStringForDay(SundayNumber, SundayString),
        Monday: getStringForDay(MondayNumber, MondayString),
        Tuesday: getStringForDay(TuesdayNumber, TuesdayString),
        Wednesday: getStringForDay(WednesdayNumber, WednesdayString),
        Thursday: getStringForDay(ThursdayNumber, ThursdayString),
        Friday: getStringForDay(FridayNumber, FridayString),
        Saturday: getStringForDay(SaturdayNumber, SaturdayString),
        employeeName: props.currentEmployee.employeeName,
        totalHours: weekTotalHours,
      };
      const response = await fetch("/timeCards/", {
        method: "POST",
        body: JSON.stringify(timeCard),
        headers: { "Content-Type": "application/json" },
      });
      const json = await response.json();
      if (!response.ok) {
        setError(json.error);
      } else {
        setError(null);
        console.log("new card added", json);

        props.setCurrentTimeCard(json);
        let updatedWeekCards = {
          ...props.currentWeekCards,
          [props.currentEmployee.employeeName]: json,
        };
        props.setCurrentWeekCards(updatedWeekCards);
      }
      const updatedTimeCards = [...props.currentEmployee.timeCards, json];
      const employee = { timeCards: updatedTimeCards };
      const employeesResponse = await fetch(
        `/employees/${props.currentEmployee._id}`,
        {
          method: "PATCH",
          body: JSON.stringify(employee),
          headers: { "Content-Type": "application/json" },
        }
      );

      const EmployeeJson = await employeesResponse.json();

      if (!employeesResponse.ok) {
        setError(EmployeeJson.error);
      } else {
        setError(null);
        props.setCurrentEmployee(EmployeeJson);
        console.log("employee time card updated", EmployeeJson);
      }
    } else {
      //if its not a new time card, we need to update our new card.

      const timeCard = {
        startOfWeek: startOfWeek.format("l"),
        Sunday: updateTimeCardDay(
          SundayString,
          SundayNumber,
          props.currentTimeCard.Sunday
        ),
        Monday: updateTimeCardDay(
          MondayString,
          MondayNumber,
          props.currentTimeCard.Monday
        ),
        Tuesday: updateTimeCardDay(
          TuesdayString,
          TuesdayNumber,
          props.currentTimeCard.Tuesday
        ),
        Wednesday: updateTimeCardDay(
          WednesdayString,
          WednesdayNumber,
          props.currentTimeCard.Wednesday
        ),
        Thursday: updateTimeCardDay(
          ThursdayString,
          ThursdayNumber,
          props.currentTimeCard.Thursday
        ),
        Friday: updateTimeCardDay(
          FridayString,
          FridayNumber,
          props.currentTimeCard.Friday
        ),
        Saturday: updateTimeCardDay(
          SaturdayString,
          SaturdayNumber,
          props.currentTimeCard.Saturday
        ),
        employeeName: props.currentEmployee.employeeName,
        totalHours: getTotalHours(),
      };

      const timeCardId = await fetchTimeCard(props.currentTimeCard._id);
      const response = await fetch(`/timeCards/${timeCardId._id}`, {
        method: "PATCH",
        body: JSON.stringify(timeCard),
        headers: { "Content-Type": "application/json" },
      });
      const json = await response.json();
      if (!response.ok) {
        setError(json.error);
      } else {
        setError(null);
        console.log("card updated", json);

        props.setCurrentTimeCard(json);
        //dont even think i need to do these two lines bellow. ill just leave them in for now
        let updatedWeekCards = {
          ...props.currentWeekCards,
          [props.currentEmployee.employeeName]: json,
        };
        props.setCurrentWeekCards(updatedWeekCards);
        
      }
    }
  };
useEffect(()=>{console.log(props.updatedWeekCards)},[props.updatedWeekCards]);
  return (
    <>
      <CardGroup style={{ padding: "20px", height: "70%" }}>
        <Card>
          <Card.Body style={{ padding: "20px" }}>
            <Card.Title>Sunday</Card.Title>
            <ul>
              {SundayJobList?.map((job) => (
                <li>{job}</li>
              ))}
            </ul>
            <Form.Group controlId="editName">
              <Form.Control
                style={{ color: "black" }}
                value={SundayString}
                placeholder="job location"
                onChange={(event) => {
                  setSundayString(event.target.value);
                }}
              />
              <Form.Group>
                <Form.Label>-</Form.Label>
                <Form.Control
                  type="number"
                  value={SundayNumber}
                  placeholder="hours"
                  onChange={(event) => setSundayNumber(event.target.value)}
                />
              </Form.Group>
              <Button variant="success" onClick={handleSave}>
                Save
              </Button>
            </Form.Group>
          </Card.Body>
          <Card.Footer>
            <small className="text-muted">Hours: {totalSundayNumber}</small>
          </Card.Footer>
        </Card>
      </CardGroup>
    </>
  );
};

export default WeekLayout;
