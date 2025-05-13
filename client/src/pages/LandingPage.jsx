import React from "react";
import { useNavigate } from "react-router-dom";
export default function LandingPage() {
  const navig = useNavigate();
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6">
      <h1 className="text-5xl font-extrabold mb-4 text-pink-600">Quizify</h1>
      <p className="text-gray-400 text-lg mb-10 text-center max-w-md">
        Test your knowledge with interactive quizzes. Sign in or register to
        begin your journey!
      </p>

      <div className="flex space-x-6">
        <button className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-6 py-3 rounded-xl transition duration-200" onClick={()=>{navig('/login')}}>
          Login
        </button>
        <button className="bg-gray-800 hover:bg-gray-700 border border-gray-600 text-white font-semibold px-6 py-3 rounded-xl transition duration-200" onClick={()=>{navig('/register')}}>
          Register
        </button>
      </div>

      <footer className="mt-20 text-sm text-gray-600">
        © {new Date().getFullYear()} Quizify. All rights reserved.
      </footer>
    </div>
  );
}
