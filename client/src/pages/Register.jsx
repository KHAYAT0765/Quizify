import React, { useState } from "react";
import {Link} from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Input } from "antd";

function Register() {
  const navig = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    firstName: "",
    lastName: "",
    password: "",
    email: "",
    profile: "test.png",
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    if (
      !formData.firstName ||
      !formData.lastName ||
      !formData.username ||
      !formData.email ||
      !formData.password
    ) {
      setError("All fields are required");
      return false;
    }
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(formData.email)) {
      setError("Invalid email format");
      return false;
    }
    setError("");
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    try {
      const response = await axios.post(
        "http://localhost:8080/user/",
        formData
      );
      if (
        response.data ==
        "User with this Username is already there in DB !! try with another one"
      )
      {
        setError("Error:This user name already exists");
        return;
      }
      alert("registeration successfull");
      navig("/login");
    } catch (error) {
      setError("Error: " + error.message);
    }
  };

  return (
    <div className="h-screen flex justify-center items-center w-screen">
      <div className="flex flex-col mx-1 gap-y-2">
        <div className="flex flex-col justify-center items-center">
          <img
            className="h-[150px] w-[150px] rounded-xl border-2 border-pink-600"
            src="/quizifyLogo.png"
          />
          <p className="text-xl ">Welcome To Quizify</p>
        </div>
        {error && <p className="text-red-500 text-sm">{error}</p>}
        <div className="flex space-between gap-1">
          <input
            className="text-sm md:text-base w-full text-white mb-4 outline-none p-2 rounded-md placeholder-gray-400 bg-[#222222] focus:scale-[1.03] transition duration-150"
            name="firstName"
            type="text"
            placeholder="First Name"
            onChange={handleChange}
          />
          <input
            className="text-sm md:text-base w-full text-white mb-4 outline-none p-2 rounded-md placeholder-gray-400 bg-[#222222] focus:scale-[1.03] transition duration-150"
            name="lastName"
            type="text"
            placeholder="Last Name"
            onChange={handleChange}
          />
        </div>
        <input
          className="text-sm md:text-base w-full text-white mb-4 outline-none p-2 rounded-md placeholder-gray-400 bg-[#222222] focus:scale-[1.03] transition duration-150"
          name="username"
          type="text"
          placeholder="UserName"
          onChange={handleChange}
        />
        <input
          className="text-sm md:text-base w-full text-white mb-4 outline-none p-2 rounded-md placeholder-gray-400 bg-[#222222] focus:scale-[1.03] transition duration-150"
          name="email"
          type="text"
          placeholder="email"
          onChange={handleChange}
        />
        <input
          className="text-sm md:text-base w-full text-white mb-4 outline-none p-2 rounded-md placeholder-gray-400 bg-[#222222] focus:scale-[1.03] transition duration-150"
          name="password"
          type="text"
          placeholder="password"
          onChange={handleChange}
        />
        <Link to="/login">already an user?</Link>
        <button
          className="bg-black text-sm md:text-base font-semibold text-[#df94ff] border-2 border-[#df94ff] hover:bg-[#df94ff] hover:text-black p-2 px-6 md:px-8 rounded-md tracking-wide"
          onClick={handleSubmit}
        >
          Submit
        </button>
      </div>
    </div>
  );
}

export default Register;
