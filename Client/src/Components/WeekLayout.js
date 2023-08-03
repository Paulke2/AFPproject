import Card from "react-bootstrap/Card";
import { Button, Form } from "react-bootstrap";
import CardGroup from "react-bootstrap/CardGroup";
import { useCallback, useEffect, useState } from "react";
import updateTimeCardDay from "../functions/updateTimeCardDay";
import fetchTimeCard from "../functions/fetchTimeCard";
import "./WeekLayout.css";
import getTotalHoursForDay from "../functions/getTotalHoursForDay";
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
  const getStringForDay=(dayNumber, dayString)=>{
    return(SundayNumber!== undefined? SundayString+SundayNumber.toString(): "");

  };

  const handleSave = async (event) => {
    event.preventDefault();

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
        Sunday: getStringForDay(SundayNumber,SundayString),
        Monday: getStringForDay(MondayNumber,MondayString),
        Tuesday: getStringForDay(SundayNumber,SundayString),
        Wednesday: getStringForDay(SundayNumber,SundayString),
        Thursday: getStringForDay(SundayNumber,SundayString),
        Friday: getStringForDay(SundayNumber,SundayString),
        Saturday: getStringForDay(SundayNumber,SundayString),
        employeeName: props.currentEmployee.employeeName,
        totalHours: 0,
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
      }
      const updatedTimeCards = [...props.currentEmployee.timeCards, json];
      const employee = { timeCards: updatedTimeCards };
      console.log("new employee cards:");
      console.log(JSON.stringify(employee));
      console.log(timeCard._id);

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
        totalHours: 2,
      };

      const timeCardId = await fetchTimeCard(props.currentTimeCard._id);
      console.log("id:" + timeCardId);
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
        console.log("new card added", json);

        props.setCurrentTimeCard(json);
      }
    }
  };

  return (
    <>
      <CardGroup style={{ padding: "20px", minHeight: "100%" }}>
        <Card>
          <Card.Body style={{ padding: "20px" }}>
            <Card.Title>Sunday</Card.Title>
            <ul>
              {props?.currentTimeCard?.Sunday &&
                props.currentTimeCard.Sunday.split(",").map((element) => (
                  <li>{element}</li>
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
            <small className="text-muted">Total Hrs:</small>
          </Card.Footer>
        </Card>
        <Card>
          <Card.Body>
            <Card.Title>Monday</Card.Title>
            <ul>
              {props?.currentTimeCard?.Monday &&
                props.currentTimeCard.Monday.split(",").map((element) => (
                  <li>{element}</li>
                ))}
            </ul>
            <Form.Group controlId="editName">
              <Form.Control
                style={{ color: "black" }}
                value={MondayString}
                placeholder="job location"
                onChange={(event) => {
                  setMondayString(event.target.value);
                }}
              />
              <Form.Group>
                <Form.Label>-</Form.Label>
                <Form.Control
                  type="number"
                  value={MondayNumber}
                  placeholder="hours"
                  onChange={(event) => setMondayNumber(event.target.value)}
                />
              </Form.Group>
              <Button variant="success" onClick={handleSave}>
                Save
              </Button>
            </Form.Group>
          </Card.Body>
          <Card.Footer>
            <small className="text-muted">Total Hrs:</small>
          </Card.Footer>
        </Card>
        <Card>
          <Card.Body>
            <Card.Title>Tuesday</Card.Title>
             <ul>
      {props?.currentTimeCard?.Tuesday &&
        props.currentTimeCard.Tuesday.split(",").map((element) => {
          return <li>{element}</li>;
        })}
    </ul>
            <Form.Group controlId="editName">
              <Form.Control
                style={{ color: "black" }}
                value={TuesdayString}
                placeholder="job location"
                onChange={(event) => {
                  setTuesdayString(event.target.value);
                }}
              />
              <Form.Group>
                <Form.Label>-</Form.Label>
                <Form.Control
                  type="number"
                  value={TuesdayNumber}
                  placeholder="hours"
                  onChange={(event) => setTuesdayNumber(event.target.value)}
                />
              </Form.Group>
              <Button variant="success" onClick={handleSave}>
                Save
              </Button>
            </Form.Group>
          </Card.Body>
          <Card.Footer>
            <small className="text-muted">Total Hrs: </small>
          </Card.Footer>
        </Card>
        <Card>
          <Card.Body>
            <Card.Title>Wednesday</Card.Title>
            <ul>
              {props?.currentTimeCard?.Wednesday &&
                props.currentTimeCard.Wednesday.split(",").map((element) => (
                  <li>{element}</li>
                ))}
            </ul>
            <Form.Group controlId="editName">
              <Form.Control
                style={{ color: "black" }}
                value={WednesdayString}
                placeholder="job location"
                onChange={(event) => {
                  setWednesdayString(event.target.value);
                }}
              />
              <Form.Group>
                <Form.Label>-</Form.Label>
                <Form.Control
                  type="number"
                  value={WednesdayNumber}
                  placeholder="hours"
                  onChange={(event) => setWednesdayNumber(event.target.value)}
                />
              </Form.Group>
              <Button variant="success" onClick={handleSave}>
                Save
              </Button>
            </Form.Group>
          </Card.Body>
          <Card.Footer>
            <small className="text-muted">Total Hrs:</small>
          </Card.Footer>
        </Card>
        <Card>
          <Card.Body>
            <Card.Title>Thursday</Card.Title>
            <ul>
              {props?.currentTimeCard?.Thursday &&
                props.currentTimeCard.Thursday.split(",").map((element) => (
                  <li>{element}</li>
                ))}
            </ul>
            <Form.Group controlId="editName">
              <Form.Control
                style={{ color: "black" }}
                value={ThursdayString}
                placeholder="job location"
                onChange={(event) => {
                  setThursdayString(event.target.value);
                }}
              />
              <Form.Group>
                <Form.Label>-</Form.Label>
                <Form.Control
                  type="number"
                  value={ThursdayNumber}
                  placeholder="hours"
                  onChange={(event) => setThursdayNumber(event.target.value)}
                />
              </Form.Group>
              <Button variant="success" onClick={handleSave}>
                Save
              </Button>
            </Form.Group>
          </Card.Body>
          <Card.Footer>
            <small className="text-muted">Total Hrs: </small>
          </Card.Footer>
        </Card>

        <Card>
          <Card.Body>
            <Card.Title>Friday</Card.Title>
            <ul>
              {props?.currentTimeCard?.Friday &&
                props.currentTimeCard.Friday.split(",").map((element) => (
                  <li>{element}</li>
                ))}
            </ul>
            <Form.Group controlId="editName">
              <Form.Control
                style={{ color: "black" }}
                value={FridayString}
                placeholder="job location"
                onChange={(event) => {
                  setFridayString(event.target.value);
                }}
              />
              <Form.Group>
                <Form.Label>-</Form.Label>
                <Form.Control
                  type="number"
                  value={FridayNumber}
                  placeholder="hours"
                  onChange={(event) => setFridayNumber(event.target.value)}
                />
              </Form.Group>
              <Button variant="success" onClick={handleSave}>
                Save
              </Button>
            </Form.Group>
          </Card.Body>
          <Card.Footer>
            <small className="text-muted">Total Hrs:</small>
          </Card.Footer>
        </Card>
        <Card>
          <Card.Body>
            <Card.Title>Saturday</Card.Title>
            <ul>
              {props?.currentTimeCard?.Saturday &&
                props.currentTimeCard.Saturday.split(",").map((element) => (
                  <li>{element}</li>
                ))}
            </ul>
            <Form.Group controlId="editName">
              <Form.Control
                style={{ color: "black" }}
                value={SaturdayString}
                placeholder="job location"
                onChange={(event) => {
                  setSaturdayString(event.target.value);
                }}
              />
              <Form.Group>
                <Form.Label>-</Form.Label>
                <Form.Control
                  type="number"
                  value={SaturdayNumber}
                  placeholder="hours"
                  onChange={(event) => setSaturdayNumber(event.target.value)}
                />
              </Form.Group>
              <Button variant="success" onClick={handleSave}>
                Save
              </Button>
            </Form.Group>
          </Card.Body>
          <Card.Footer>
            <small className="text-muted">Total Hrs:</small>
          </Card.Footer>
        </Card>
      </CardGroup>
    </>
  );
};

export default WeekLayout;
