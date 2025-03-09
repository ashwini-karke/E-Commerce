import React, { useState } from "react";
import { registerUser } from "../services/auth.service";
import { Link, useNavigate } from "react-router-dom";

const RegisterForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await registerUser(name, email, password);
      console.log("User registered:", response);
      navigate("/login"); // Redirect to login page
    } catch (error) {
      console.error("Registration error:", error);
      setErrorMessage("Error registering user.");
    }
  };

  return (
    <div className="form-container">
      <div className="form-content">
        <h2>Register</h2>
        {errorMessage && <div className="error">{errorMessage}</div>}
        <form onSubmit={handleRegister} className="form">
          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit">Register</button>
        </form>
        <div className="toggle-form">
          <span>
            Already have an account?{" "}
            <Link className="toggle-link" to="/login">Login</Link>
          </span>
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;
