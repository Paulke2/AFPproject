import Card from "react-bootstrap/Card";
import { Form } from "react-bootstrap";
import CardGroup from "react-bootstrap/CardGroup";
import { useCallback, useEffect,useState } from "react";
const moment = require("moment");
const WeekLayout = (props) => {
  //map over time employees time cards. if one matches the week, we want to load it. else, cr
  //create a time sheet
  const specificDate = moment(props.dateToCheck);
  const startOfWeek = specificDate.clone().startOf("isoWeek");
  const [error, setError] = useState(null);
  const [MondayString, setMondayString]=useState("");
  const [oldTimeCard, setOldTimeCard] = useState(props.currentTimeCard ?? {});
  const handleSave = useCallback(async () => {
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
      "employeeName": props.currentEmployee,
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
      console.log(props.currentTimeCard.startOfWeek)
      console.log(oldTimeCard.startOfWeek);
    }
}else{
    //patch request for the time card of oldTimeCard.id
    const timeCard = {
      "startOfWeek": props.currentTimeCard.startOfWeek,
      "Sunday": props.currentTimeCard.Sunday,
      "Monday": props.currentTimeCard.Monday,
      "Tuesday": props.currentTimeCard.Tuesday,
      "Wednesday": props.currentTimeCard.Wednesday,
      "Thursday": props.currentTimeCard.Thursday,
      "Friday": props.currentTimeCard.Friday,
      "Saturday": props.currentTimeCard.Saturday,
      "employeeName":props.currentTimeCard.employeeName,
      "totalHours": props.currentTimeCard.totalHours
    };
    const response = await fetch(`/timeCards/${props.currentTimeCard._id}`, {
      method: "PATCH",
      body: JSON.stringify(timeCard),
      headers: { "Content-Type": "application/json" },
    });
    
    if (!response.ok) {
      const errorData = await response.json(); // Try to parse error response if available
      const errorMessage = errorData?.error || "Unknown error";
      setError(errorMessage);
    } else {
      setError(null);
      console.log("Card updated");
      props.setCurrentTimeCard(timeCard);
    }
}}, [props.currentEmployee, startOfWeek]);
  return (
    <>
      {" "}
      <CardGroup style={{ padding: "20px" }}>
        <Card>
          <Card.Body style={{ minHeight: "500px", padding: "20px" }}>
            <Card.Title>Sunday</Card.Title>
            <Form.Group controlId="editName">
                    <Form.Control 
                    style={{color:"black"}}
                        value={MondayString}
                        placeholder="add hours"
                        onChange={(event) => {
                            setMondayString(event.target.value);
                            handleSave();
                        }}
                    />
                    
                </Form.Group>
          </Card.Body>
          <Card.Footer>
            <small className="text-muted">Total Hrs:</small>
          </Card.Footer>
        </Card>
        <Card>
          <Card.Body>
            <Card.Title>Monday</Card.Title>
            <Card.Text></Card.Text>
          </Card.Body>
          <Card.Footer>
            <small className="text-muted">Total Hrs:</small>
          </Card.Footer>
        </Card>
        <Card>
          <Card.Body>
            <Card.Title>Tuesday</Card.Title>
            <Card.Text></Card.Text>
          </Card.Body>
          <Card.Footer>
            <small className="text-muted">Total Hrs:</small>
          </Card.Footer>
        </Card>
        <Card>
          <Card.Body>
            <Card.Title>Wednesday</Card.Title>
            <Card.Text></Card.Text>
          </Card.Body>
          <Card.Footer>
            <small className="text-muted">Total Hrs:</small>
          </Card.Footer>
        </Card>
        <Card>
          <Card.Body>
            <Card.Title>Thursday</Card.Title>
            <Card.Text></Card.Text>
          </Card.Body>
          <Card.Footer>
            <small className="text-muted">Total Hrs:</small>
          </Card.Footer>
        </Card>

        <Card>
          <Card.Body>
            <Card.Title>Friday</Card.Title>
            <Card.Text></Card.Text>
          </Card.Body>
          <Card.Footer>
            <small className="text-muted">Total Hrs:</small>
          </Card.Footer>
        </Card>
        <Card>
          <Card.Body>
            <Card.Title>Saturday</Card.Title>
            <Card.Text></Card.Text>
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
