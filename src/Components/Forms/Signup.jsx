import React, { useState } from 'react';
import { login } from "../../store/authSlice";
import { Input, Button, Select } from "../index";
import authService from '../../appwrite/auth';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';

const Signup = () => {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false); // Track signup process
  const { register, handleSubmit } = useForm();
  const dispatch = useDispatch();

  const signupUser = async (data) => {
    setError("");
    setLoading(true); // Disable the button during signup
    try {
      console.log("Form submitted with data:", data); // Debug log
      const user = await authService.signUpUser(data); // Ensure `authService.signUpUser` returns a Promise
      console.log("User created:", user); // Debug log

      if (user) {
        const userData = await authService.getCurrentuser(); // Ensure this also returns a Promise
        if (userData) {
          const accountType = data.status; 
          console.log(accountType);
          
          dispatch(login({ userData, accountType }))
          navigate("/");
        } else {
          console.log("Navigating to login");
          navigate("/login");
        }
      }
    } catch (error) {
      console.error("Signup error:", error); // Debug error
      setError(error.message || "Something went wrong!");
    } finally {
      setLoading(false); // Re-enable the button
    }
  };

  return (
    <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-slate-600 p-10 rounded-lg shadow-3xl w-[96%] lg:w-1/2">
      <h1 className="text-4xl text-center text-white font-bold">Sign Up</h1>
      <p className="text-center text-gray-300 my-5">
        Already Have an Account?{" "}
        <Link to="/login" className="underline cursor-pointer hover:text-gray-100 transition-colors">
          Login
        </Link>
      </p>
      {error && <p className="text-red-600 text-center mt-8">{error}</p>}
      <form onSubmit={handleSubmit(signupUser)}>
        <div className="space-y-5">
          <Input
            label="Name"
            labelClass="text-white font-bold text-2xl drop-shadow-lg"
            type="text"
            placeholder="Enter Your Name"
            {...register("name", { required: true })}
          />
          <Input
            label="Email"
            labelClass="text-white font-bold text-2xl drop-shadow-lg"
            type="email"
            placeholder="Enter Your Email"
            {...register("email", {
              required: true,
              validate: {
                matchPattern: (value) =>
                  /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) || "Email should be valid",
              },
            })}
          />
          <Input
            label="Password"
            labelClass="text-white font-bold text-2xl drop-shadow-lg"
            type="password"
            placeholder="Enter Your password"
            {...register("password", {
              required: true,
              minLength: 8,
            })}
          />
          
          <Button
            className={`w-40 relative left-1/2 -translate-x-1/2 my-10 ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
            disabled={loading} // Disable the button when loading
          >
            {loading ? "Signing up..." : "Sign up"} {/* Show loading text */}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default Signup;
