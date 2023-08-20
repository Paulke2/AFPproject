import { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useLogin } from "../CustomHooks/useLogin";
import { userAuthContext } from "../CustomHooks/userAuthContext";
import { useNavigate } from "react-router-dom";
import "./LoginPage.css"
import backgroundLogo from "../pictures/backgroundLogo.png"
const LoginPage = () => {
  const {user}=userAuthContext();
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const { login, error, isLoading } = useLogin();
  const navigate = useNavigate()
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Assuming login returns a Promise that resolves to the user
    const newUser = await login(name, password);
    
    if (newUser) {
      // Assuming login sets the user state upon successful login
      navigate("/");
    }
    
    console.log("whats dis");
    console.log(newUser); // This should now contain the updated user
  };

  return (
    <div className="loginFormContainer">
      <img src={backgroundLogo} />
    <div className="loginForm">
      <Form onSubmit={handleSubmit}>
        <h3 style={{color:"white"}}>Login</h3>
        
        <Form.Control
        placeholder="Name"
          type="name"
          id="inputname"
           className="formInput"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <br></br>
        <Form.Control
          type="password"
          placeholder="Password"
          className="formInput"
          id="inputPassword"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <br></br>
        <Button variant="danger"className="loginButton" disabled={isLoading} type="submit">
          Login
        </Button>
        <span>{user?.name}</span>
        {error && <div>{error}</div>}
      </Form>
      </div>
    </div>
  );
};

export default LoginPage;