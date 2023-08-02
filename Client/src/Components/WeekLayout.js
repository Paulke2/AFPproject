import Card from "react-bootstrap/Card";
import { Button, Form } from "react-bootstrap";
import CardGroup from "react-bootstrap/CardGroup";
import { useCallback, useEffect,useState } from "react";

const moment = require("moment");
const WeekLayout = (props) => {
  //map over time employees time cards. if one matches the week, we want to load it. else, cr
  //create a time sheet
  const specificDate = moment(props.dateToCheck);
  const startOfWeek = specificDate.clone().startOf("isoWeek");
  const [error, setError] = useState(null);
  const [SundayString, setSundayString]=useState("");
  const [MondayString, setMondayString]=useState("");
  const [TuesdayString, setTuesdayString]=useState("");
  const [WednesdayString, setWednesdayString]=useState("");
  const [ThursdayString, setThursdayString]=useState("");
  const [FridayString, setFridayString]=useState("");
  const [SaturdayString, setSaturdayString]=useState("");
  const [oldTimeCard, setOldTimeCard] = useState(props.currentTimeCard ?? {});
  const handleSave = async (event) => {
    event.preventDefault();
    if(
      !props.currentTimeCard || 
      oldTimeCard.startOfWeek !== props.currentTimeCard.startOfWeek
    ){
    const timeCard = {
      "startOfWeek": startOfWeek.format('l'),
      "Sunday": "",
      "Monday": MondayString,
      "Tuesday": "",
      "Wednesday": "",
      "Thursday": "",
      "Friday": "",
      "Saturday": "",
      "employeeName": props.currentEmployee.employeeName,
      "totalHours": 0,
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
    
      props.setCurrentTimeCard(timeCard);
      setOldTimeCard(timeCard)

    }
    const updatedTimeCards = [...props.currentEmployee.timeCards, json ]
    const employee = { timeCards:updatedTimeCards};
    console.log("new employee cards:");
    console.log(JSON.stringify(employee));
    console.log(timeCard._id)

    const employeesResponse = await fetch(`/employees/${props.currentEmployee._id}`, {
      method: "PATCH",
      body: JSON.stringify(employee),
      headers: { "Content-Type": "application/json" },
    });
    console.log("before");
    const EmployeeJson = await employeesResponse.json();
    console.log("after");
    if(!employeesResponse.ok){
        setError(EmployeeJson.error);
    }
    else{
      setError(null);
      console.log("employee time card updated",EmployeeJson);
    }
}else{
}}
  return (
    <>
      {" "}
      <CardGroup style={{ padding: "20px" , minHeight: "100%"}}>
        <Card>
          <Card.Body style={{ padding: "20px" }}>
            <Card.Title>Sunday</Card.Title>
            <Form.Group controlId="editName">
                    <Form.Control 
                    style={{color:"black"}}
                        value={SundayString}
                        placeholder="add hours"
                        onChange={(event) => {
                            setSundayString(event.target.value)
                        }}
                    />
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
            <Form.Group controlId="editName">
                    <Form.Control 
                    style={{color:"black"}}
                        value={MondayString}
                        placeholder="add hours"
                        onChange={(event) => {
                            setMondayString(event.target.value)
                        }}
                    />
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
            <Form.Group controlId="editName">
                    <Form.Control 
                    style={{color:"black"}}
                        value={TuesdayString}
                        placeholder="add hours"
                        onChange={(event) => {
                            setTuesdayString(event.target.value)
                        }}
                    />
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
            <Card.Title>Wednesday</Card.Title>
            <Form.Group controlId="editName">
                    <Form.Control 
                    style={{color:"black"}}
                        value={WednesdayString}
                        placeholder="add hours"
                        onChange={(event) => {
                            setWednesdayString(event.target.value)
                        }}
                    />
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
            <Form.Group controlId="editName">
                    <Form.Control 
                    style={{color:"black"}}
                        value={ThursdayString}
                        placeholder="add hours"
                        onChange={(event) => {
                            setThursdayString(event.target.value)
                        }}
                    />
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
            <Card.Title>Friday</Card.Title>
            <Form.Group controlId="editName">
                    <Form.Control 
                    style={{color:"black"}}
                        value={FridayString}
                        placeholder="add hours"
                        onChange={(event) => {
                            setFridayString(event.target.value)
                        }}
                    />
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
            <Form.Group controlId="editName">
                    <Form.Control 
                    style={{color:"black"}}
                        value={SaturdayString}
                        placeholder="add hours"
                        onChange={(event) => {
                            setSaturdayString(event.target.value)
                        }}
                    />
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
