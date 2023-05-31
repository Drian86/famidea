import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

function Login() {
  const history = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  async function submit(e) {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:8000/", {
        email,
        password,
      });

      if (response.data === "exist") {
        history("/home", { state: { id: email } });
      } else if (response.data === "notexist") {
        setErrorMessage("User does not exist");
      }
    } catch (e) {
      setErrorMessage("Wrong details");
      console.log(e);
    }
  }

  return (
    <div className="login">
      <h1>Login</h1>

      {errorMessage && <p>{errorMessage}</p>}

      <form action="POST">
        <input
          type="email"
          onChange={(e) => {
            setEmail(e.target.value);
            setErrorMessage(""); // Clear error message when input changes
          }}
          placeholder="Email"
        />
        <input
          type="password"
          onChange={(e) => {
            setPassword(e.target.value);
            setErrorMessage(""); // Clear error message when input changes
          }}
          placeholder="Password"
        />

        <input type="submit" onClick={submit} />
      </form>

      <br />
      <p>OR</p>
      <br />

      <Link to="/signup">Signup Page</Link>
    </div>
  );
}

export default Login;