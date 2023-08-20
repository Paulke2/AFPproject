import { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useLogin } from "../CustomHooks/useLogin";

const LoginPage = () => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const { login, error, isLoading } = useLogin();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(name, password);
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
        {error && <div>{error}</div>}
      </Form>
    </>
  );
};

export default LoginPage;