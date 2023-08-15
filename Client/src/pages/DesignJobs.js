import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import logo from "../pictures/AFPlogo.png";
import { useNavigate, useParams } from "react-router-dom";
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
  <div><GetJobList designJobNames={props.designJobNames}/></div>
  </>);
}

export default DesignJobs;