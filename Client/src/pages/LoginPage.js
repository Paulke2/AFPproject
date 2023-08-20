import { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useLogin } from "../CustomHooks/useLogin";
import { userAuthContext } from "../CustomHooks/userAuthContext";
import { useNavigate } from "react-router-dom";
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
    <>
      <Form onSubmit={handleSubmit}>
        <h3>Login</h3>
        name
        <Form.Control
          type="name"
          id="inputname"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        password
        <Form.Control
          type="password"
          id="inputPassword"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button disabled={isLoading} type="submit">
          Login
        </Button>
        <span>{user?.name}</span>
        {error && <div>{error}</div>}
      </Form>
    </>
  );
};

export default LoginPage;