import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import logo from "../pictures/AFPlogo.png";
import { useNavigate } from "react-router-dom"
import { Col, Row } from "react-bootstrap";
import { Card } from "react-bootstrap";
import GetJobList from "../Components/DesignJobPageComponents/GetJobList"
const DesignJobs = (props)=>{
//make it so ppl can claim jobs. have a backlog, ordered by date or priority
//make it like a ticket system
const navigate = useNavigate();
console.log("herererererere");
return (<> <Navbar
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
      onClick={() => navigate("/DesignJobs")}
      style={{ color: "white", fontStyle: "oblique",marginRight:"4%" }}
    >
      Design
    </Nav.Link>
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
  <Row style={{height:"100%",width:"100%"}}>
  <Col className="col-2 employeeList">
  <div><GetJobList designJobNames={props.designJobNames}/></div>
  </Col>
  <Col className="col-10">
  <Card style={{ width: '18rem'}}>
      <Card.Body>
        <Card.Title>Card Title</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">Card Subtitle</Card.Subtitle>
        <Card.Text>
          Some quick example text to build on the card title and make up the
          bulk of the card's content.
        </Card.Text>
      
      </Card.Body>
    </Card>
    <Card style={{ width: '18rem'}}>
      <Card.Body>
        <Card.Title>Card Title</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">Card Subtitle</Card.Subtitle>
        <Card.Text>
          Some quick example text to build on the card title and make up the
          bulk of the card's content.
        </Card.Text>
      
      </Card.Body>
    </Card><Card style={{ width: '18rem'}}>
      <Card.Body>
        <Card.Title>Card Title</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">Card Subtitle</Card.Subtitle>
        <Card.Text>
          Some quick example text to build on the card title and make up the
          bulk of the card's content.
        </Card.Text>
      
      </Card.Body>
    </Card>
  </Col>
  </Row>
  </>);
}

export default DesignJobs;