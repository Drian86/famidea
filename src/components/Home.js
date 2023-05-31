import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

function Home() {
  const location = useLocation();
  const navigate = useNavigate();
  const [newPassword, setNewPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleDelete = async () => {
    const { id } = location.state;
    try {
      const response = await axios.delete(`http://localhost:8000/deleterecord/${id}`);

      console.log(response.data); // Optional: Display the response message
      navigate("/"); // Redirect to the login page or any other page
    } catch (error) {
      console.error("Error deleting record:", error);
      // Handle error if necessary
    }
  };

  const handleUpdatePassword = async () => {
    const { id } = location.state;
    try {
      const response = await axios.put(`http://localhost:8000/updatepassword/${id}`, {
        password: newPassword,
      });
      alert(response.data); // Display the response message
      setNewPassword(""); // Clear the input field
    } catch (error) {
      console.error("Error updating password:", error);
      setErrorMessage("Error updating password. Please try again."); // Display error message
    }
  };

  return (
    <div className="login-container">
      <div className="welcome-message">
        <h1>Welcome, {location.state.id}!</h1>
      </div>

      <div className="login-form password-update">
        <h2>Update Password</h2>
        <input
          type="password"
          placeholder="New Password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          required
        />
        <button onClick={handleUpdatePassword}>Update Password</button>
        {errorMessage && <p>{errorMessage}</p>}
      </div>

      <div className="login-form account-delete">
        <h2>Delete Account</h2>
        <button onClick={handleDelete}>Delete Account</button>
      </div>
    </div>
  );
}

export default Home;
