import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import logo from "../pictures/AFPlogo.png";
import { useNavigate } from "react-router-dom";
import { useLogout } from "../CustomHooks/useLogout";
const NavBar = () => {
  const navigate = useNavigate();
  const {logout}=useLogout()
  const handleLogOut = ()=>{
    logout()
    navigate("/")
  }
    
return(<Navbar
style={{
  backgroundColor: "#90ee90",
  
  boxShadow: "0 4px 6px -6px #222",
}}
bg="dark"
data-bs-theme="dark"
>

<Nav className="me-auto"></Nav>
<Nav.Link
          onClick={() =>{handleLogOut()}}
          style={{ color: "white", fontStyle: "oblique",marginRight:"20px"}}
        >Logout</Nav.Link>
<Nav.Link
  onClick={() => navigate("/DesignJobs")}
  style={{ color: "white", fontStyle: "oblique",marginLeft:"20px",marginRight:"20px"}}
>
  Design
</Nav.Link>
<Nav.Link
  onClick={() => navigate("/Calendar")}
  style={{ color: "white", fontStyle: "oblique",marginLeft:"20px",marginRight:"20px" }}
>
  Calendar
</Nav.Link>
<Navbar.Brand
  style={{ cursor: "pointer",marginRight:"10px" }}
  onClick={() => navigate("/")}
>
  <img className="logo" src={logo} />
</Navbar.Brand>
</Navbar>)

}

export default NavBar;
