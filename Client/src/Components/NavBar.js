import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import logo from "../pictures/AFPlogo.png";
import { useNavigate } from "react-router-dom";

const NavBar = () => {
    const navigate = useNavigate();
return(<Navbar
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
</Navbar>)

}

export default NavBar;
