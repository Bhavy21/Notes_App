import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../utils/axiosInstance";
import { useAuth } from "../context/AuthContext";
import "./AuthForm.css";

function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const res = await axios.post("/api/auth/login", form);
      login(res.data);
      navigate("/notes");
    } catch (err) {
      if (err.response && err.response.data && err.response.data.message === "Email does not exist") {
        setError("Email does not exist. Please register.");
      } else if (err.response && err.response.data && err.response.data.message === "Invalid password") {
        setError("Invalid password. Please try again.");
      } else {
        setError("Login failed. Please try again.");
      }
      console.error("Login failed:", err);
    }
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-form">
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <input name="email" placeholder="Email" type="email" onChange={handleChange} required />
          <input name="password" placeholder="Password" type="password" onChange={handleChange} required />
          <button type="submit">Login</button>
        </form>
        <p style={{ marginTop: '1.5rem', color: '#fff', fontWeight: '500' }}>
          New Here! <a href="/register" style={{ color: '#a3c9ff', textDecoration: 'None' }}>Register</a>
        </p>
      </div>
    </div>
  );
}

export default Login;
