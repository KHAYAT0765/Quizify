import React,{useState} from 'react'
import { Input } from "antd";
import { useNavigate } from 'react-router-dom';
import {Link} from "react-router-dom"
import axios from "axios";
export default function Login() {
  const navig = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    password: ""
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    if (
      !formData.username ||
      !formData.password
    ) {
      setError("All fields are required");
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
        "http://localhost:8080/generate-token",
        formData
      );
      window.localStorage.setItem('token',response.data.token);
      const response1 = await axios.get(
        "http://localhost:8080/current-user",
        {headers:{
          'Authorization':`Bearer ${response.data.token}`
        }}
      );
      const {password,username,authorities,...rest} = response1.data;
      window.localStorage.setItem("user", username);
      window.localStorage.setItem("authorities",authorities[0].authority);
      alert("logged in");
      navig("/");
    } catch (error) {
      setError("Error: " + error.message);
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center w-screen">
      <div className="flex flex-col mx-1 gap-y-2">
        <div className="flex flex-col justify-center items-center">
          <img
            className="h-[150px] w-[150px] rounded-xl border-2 border-pink-600"
            src="/quizifyLogo.png"
          />
          <p className="text-xl ">Welcome To Quizify</p>
        </div>
        {error && <p className="text-red-500 text-sm">{error}</p>}
        <input
          className="text-sm md:text-base text-white mb-4 outline-none p-2 rounded-md placeholder-gray-400 bg-[#222222] focus:scale-[1.03] transition duration-150 w-100"
          name="username"
          type="text"
          placeholder="username"
          onChange={handleChange}
        />
        <input
          className="text-sm md:text-base w-full text-white mb-4 outline-none p-2 rounded-md placeholder-gray-400 bg-[#222222] focus:scale-[1.03] transition duration-150"
          name="password"
          type="password"
          placeholder="password"
          onChange={handleChange}
        />
        <Link to="/register">New User?</Link>
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
