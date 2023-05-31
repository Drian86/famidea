import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import "./Login.css"; // Import the custom CSS file for styling

function Login() {
  const navigate = useNavigate();
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
        navigate("/home", { state: { id: email } });
      } else if (response.data === "notexist") {
        setErrorMessage("User does not exist");
      }
    } catch (e) {
      setErrorMessage("Wrong details");
      console.log(e);
    }
  }

  const handleSignUp = () => {
    navigate("/signup");
  };

  return (
    <div className="login-container">
      <div className="login-form">
        <h1>Login</h1>

        {errorMessage && <p>{errorMessage}</p>}

        <form onSubmit={submit}>
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setErrorMessage("");
              }}
              placeholder="Enter your email"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setErrorMessage("");
              }}
              placeholder="Enter your password"
              required
            />
          </div>

          <button type="submit">Login</button>
        </form>

        <div className="signup-link">
          <p>Don't have an account?</p>
          <Link to="/signup">Sign up here</Link>
        </div>

        <button className="signup-button" onClick={handleSignUp}>
          Sign Up
        </button>
      </div>
    </div>
  );
}

export default Login;
