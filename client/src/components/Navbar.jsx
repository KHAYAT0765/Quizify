import React, { useEffect, useState } from "react";
import {
  PlugsConnected,
  MagnifyingGlass,
  SignOut,
  List,
  X,
} from "@phosphor-icons/react";
import Sidebar from './Sidebar';
export default function Navbar() {
    const [menu, setMenu] = useState(false);
    const [user,setUser] = useState(
      {
      user: window.localStorage.getItem("user"),
      authority: window.localStorage.getItem("authorities"),
    }
    );
    const showMenu = () => {
      setMenu(!menu);
    };
    
  return (
    <div className="flex bg-black h-[50px] w-screen items-center justify-between px-1">
      {!menu && (
        <button className="bg-black p-2"
          onClick={() => {
            showMenu();
          }}
        >
          <List className=" dark:text-white text-black" size={16} />
        </button>
      )}
      {menu && (
        <button className="bg-black p-2"
          onClick={() => {
            showMenu();
          }}
        >
          <X className=" dark:text-white text-black" size={16} />
        </button>
      )}
      <div className="text-2xl text-pink-600">
        Quizify
      </div>
      <div>
        <p>
           Hi,{user.user} 
        </p>
      </div>
      <div
        className={` fixed inset-y-0 top-[50px] left-0 z-10 transform w-screen ${
          menu ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-500 ease-in-out`}
        onClick={() => {
          setMenu(false);
        }}
      >
        <Sidebar user={user.authority}/>
      </div>
    </div>
  );
}
