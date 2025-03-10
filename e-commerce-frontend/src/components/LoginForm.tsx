import React, { useState } from "react";
import { loginUser, registerUser } from "../services/auth.service";
import { Link, useNavigate } from "react-router-dom";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorLoginMessage, setErrorLoginMessage] = useState("");
  const [errorRegisterMessage, setErrorRegisterMessage] = useState("");
  const [isRegistering, setIsRegistering] = useState(false);
  const [name, setName] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await loginUser(email, password);

      console.log("User logged in:", response);

      if (response.isAdmin) {
        window.location.href = "/admin-profile"; // Redirect admin users
      } else {
        window.location.href = "/user-profile"; // Redirect regular users
      }
    } catch (error) {
      console.error("Login error:", error);
      setErrorLoginMessage("Invalid credentials");
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await registerUser(name, email, password);
      console.log("User registered:", response);

      if (response) {
        navigate("/login"); // Navigate only if registration succeeds
        setErrorRegisterMessage("");
        setEmail("");
        setPassword("");
        setIsRegistering(!isRegistering)
      }
    } catch (error) {
      console.error("Registration error:", error);
      setErrorRegisterMessage("Error registering user.");
    }
  };

  return (
    <div className="form-container">
      <div className="form-content">
        <h2>{isRegistering ? "Register" : "Login"}</h2>
        {isRegistering && errorRegisterMessage && (
          <div className="error">{errorRegisterMessage}</div>
        )}
        {!isRegistering && errorLoginMessage && (
          <div className="error">{errorLoginMessage}</div>
        )}

        <form
          onSubmit={isRegistering ? handleRegister : handleLogin}
          className="form"
        >
          {isRegistering && (
            <input
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          )}
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
          <button type="submit">{isRegistering ? "Register" : "Login"}</button>
        </form>
        <div className="toggle-form">
          <span>
            {isRegistering
              ? "Already have an account? "
              : "Don't have an account? "}

            <Link
              className="toggle-link"
              onClick={() => setIsRegistering(!isRegistering)}
              to="/login"
            >
              {isRegistering ? "Login" : "Register"}
            </Link>
          </span>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
