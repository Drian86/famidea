import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  async function submit(e) {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:8000/signup", {
        email,
        password,
      });

      if (response.data === "exist") {
        setMessage("User already exists.");
      } else if (response.data === "notexist") {
        setMessage("User registered successfully.");
      }
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <div className="login-container">
      <div className="login-form">
        <h1>Signup</h1>

        <form onSubmit={submit}>
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              required
            />
          </div>

          <button type="submit">Signup</button>
        </form>

        <br />
        <p>{message}</p>

        <br />
        <p>OR</p>
        <br />

        <Link to="/">Login Page</Link>
      </div>
    </div>
  );
}

export default Signup;
