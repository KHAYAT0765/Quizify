import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { CirclesFour,PencilLine,ArrowsOut,SignOut } from '@phosphor-icons/react';
export default function Sidebar(user) {
  const navig = useNavigate();
  const logout = ()=>{
    window.localStorage.removeItem('user');
    window.localStorage.removeItem("authorities");
    window.localStorage.removeItem("token");
    navig('/landingpage');
  }
  return (
    <div className="bg-black w-[300px] h-screen flex flex-col items-start gap-2 p-2">
      <button
        className="hover:bg-[#242424] cursor-pointer p-2 w-full rounded-md text-start flex gap-1"
        onClick={() => {
          navig("/");
        }}
      >
        <CirclesFour size={24} />
        <p>Categories</p>
      </button>
      {user.user == "NORMAL" && (
        <button
          className="hover:bg-[#242424] cursor-pointer p-2 w-full rounded-md text-start flex gap-1"
          onClick={() => {
            navig("/attempts");
          }}
        >
          <PencilLine size={24} />
          <p>Attempts</p>
        </button>
      )}
      {user.user == "ADMIN" && (
        <button
          className="hover:bg-[#242424] cursor-pointer p-2 w-full rounded-md text-start flex gap-1"
          onClick={() => {
            navig("/allquiz");
          }}
        >
          <ArrowsOut size={24} />
          <p>All Quiz</p>
        </button>
      )}
      <button className="hover:bg-[#242424] cursor-pointer p-2 w-full rounded-md text-start flex gap-1"
      onClick={()=>{
        logout();
      }}>
        <SignOut size={24} />
        <p>Logout</p>
      </button>
    </div>
  );
}
