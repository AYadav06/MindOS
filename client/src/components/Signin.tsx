
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

export const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:3000/api/v1/signin", {
        email,
        password,
      });
      localStorage.setItem("token", response.data.token);
      navigate("/dashboard");
    } catch (error) {
      console.error("Signin error:", error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center text-light-text">
      <div className=" bg-light-card p-8 rounded-xl shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Welcome Back</h2>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            placeholder="Email"
            required
            className="w-full p-3 rounded-md bg-light-secondary text-light-text border border-transparent focus:outline-none focus:border-primary"
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            className="w-full p-3 rounded-md bg-light-secondary text-light-text border border-transparent focus:outline-none focus:border-primary"
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            type="submit"
            className="w-full bg-light-secondary text-light-text font-semibold py-3 rounded-md hover:bg-opacity-90 transition"
          >
            Sign In
          </button>
        </form>
        <p className="mt-4 text-center text-sm text-light-text">
          Don't have an account?{" "}
          <Link to="/signup" className="text-light-text underline">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
};
