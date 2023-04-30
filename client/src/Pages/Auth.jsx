import React, { useState } from "react";
import axios from "axios";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [_, setCookies] = useCookies(["access_token"]);
  const navigate = useNavigate();

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/auth/login", {
        username,
        password,
      });
      setCookies("access_token", response.data.token);
      window.localStorage.setItem("TodoUserId", response.data.UserId);
      window.localStorage.setItem("TodoUsername", username);
      // console.log(response);
      if (!response.data.UserId) {
        navigate("/login");
        alert("Incorrect Username and password");
      } else {
        navigate("/");
        alert("Login Successful");
      }
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div>
      <Form
        username={username}
        setUsername={setUsername}
        password={password}
        setPassword={setPassword}
        onSubmit={onSubmit}
        label="Login"
      />
    </div>
  );
};

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  // const navigate = useNavigate();

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/auth/register", {
        username,
        password,
      });
      setUsername("");
      setPassword("");
      alert("Registration Complete, Login Now");
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div>
      <Form
        username={username}
        setUsername={setUsername}
        password={password}
        setPassword={setPassword}
        onSubmit={onSubmit}
        label="Register"
      />
    </div>
  );
};

const Form = ({
  username,
  password,
  setUsername,
  setPassword,
  label,
  onSubmit,
}) => {
  return (
    <div>
      <form onSubmit={onSubmit}>
        <h3>{label}</h3>
        <input
          type="text"
          name="username"
          value={username}
          placeholder="username"
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="text"
          name="password"
          value={password}
          placeholder="password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">{label}</button>
      </form>
    </div>
  );
};

const Auth = () => {
  return (
    <div>
      <Login />
      <Register />
    </div>
  );
};

export default Auth;
