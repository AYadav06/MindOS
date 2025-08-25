import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export const SignUp = () => {
  const navigate=useNavigate();

    const [form,setForm]=useState({"username":"","email":"","password":""});

    const handleSubmit=async(e:React.FormEvent)=>{
   e.preventDefault();

   try {
   const res=await axios.post("/api/v1/signup",form);
    console.log("Signup successful:", res.data);

     setForm({"username":"","email":"","password":""});

     navigate("/signin")
   } catch (error:any) {
  console.error("Signup failed:", error.response?.data || error.message);
   }
   
    }

    const handleChange=(e:React.ChangeEvent<HTMLInputElement>)=>{

        setForm({
          ...form,
          [e.target.name]:e.target.value});

    }
  return (
    <div className="min-h-screen flex items-center justify-center bg-dark-bg text-light-text shadow-2xl">
      <div className="bg-light-card p-8 rounded-xl shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Create Account</h2>
        <form onSubmit={handleSubmit}className="space-y-4">
          <input
            type="text"
            name="username"
            value={form.username}
            onChange={handleChange}
            required


            placeholder="User Name"
            className="w-full p-3 rounded-md bg-light-secondary text-light-text border border-transparent focus:outline-none focus:border-light-accent"
          />
          <input
            type="email"
            name="email"
             value={form.email}
            onChange={handleChange}
            required
            placeholder="Email"
            className="w-full p-3 rounded-md bg-light-secondary text-light-text border border-transparent focus:outline-none focus:border-primary"
          />
          <input
            type="password"
            name="password"
             value={form.password}
            onChange={handleChange}
            required
            placeholder="Password"
            className="w-full p-3 rounded-md bg-light-secondary text-light-text border border-transparent focus:outline-none focus:border-primary"
          />
          <button
            type="submit"                   
            className="w-full bg-light-secondary text-light-text font-semibold py-3 rounded-md hover:bg-opacity-90 transition"
          >
            Sign Up
          </button>
        </form>
        <p className="mt-4 text-center text-sm text-gray-800">
          Already have an account?{" "}
          <Link to="/signin" className="text-light-text underline">
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
};
