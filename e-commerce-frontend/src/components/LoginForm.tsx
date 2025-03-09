import React, { useState } from "react";
import { loginUser } from "../services/auth.service";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isRegistering, setIsRegistering] = useState(false);
  const [name, setName] = useState("");

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
      setErrorMessage("Invalid credentials");
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("User registered:", { name, email, password });
  };

  return (
    <div className="form-container">
      <div className="form-content">
        <h2>{isRegistering ? "Register" : "Login"}</h2>
        {errorMessage && <div className="error">{errorMessage}</div>}
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
            <a
              href="/register"
              onClick={() => setIsRegistering(!isRegistering)}
              className="toggle-link"
            >
              {isRegistering ? "Login" : "Register"}
            </a>
          </span>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
