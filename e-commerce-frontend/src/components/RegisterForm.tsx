// src/components/Register.tsx
import React, { useState } from "react";
import { registerUser } from "../services/auth.service";

const RegisterForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const result = await registerUser(name, email, password);
      console.log("User registered:", result);
      window.location.href = "/login"; // Redirect after successful registration
    } catch (error) {
      setErrorMessage("Error registering user.");
    }
  };

  return (
    <div>
      <h2>Register</h2>
      {errorMessage && <div>{errorMessage}</div>}
      <form onSubmit={handleRegister}>
        <input
          type="text"
          placeholder="Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default RegisterForm;
