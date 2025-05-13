import React from 'react'
import { useEffect,useState } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Button } from 'antd';
export default function Categories() {
  const navig = useNavigate();
  const [loading,setLoading] = useState(true);
  const [data,setData] = useState([]);
  const [authority,setAuthority] = useState(window.localStorage.getItem('authorities'));
  const loadCategories = async()=>{
    try {
      const token = window.localStorage.getItem("token");
      const response1 = await axios.get(
        "http://localhost:8080/category/",
        {headers:{
          'Authorization':`Bearer ${token}`
        }}
      );
      setData(response1.data);
      setLoading(false);
    } catch (error) {
      console.log(error.message);
      window.localStorage.removeItem("token");
      navig('/login');
    }
  }
  useEffect(() => {
    loadCategories();
    
  }, [])
  
  return (
    <div className="flex flex-col w-3/4 mx-auto justify-center">
      <div className="mb-8 py-4 text-center">
        <p className="text-pink-600 text-4xl sm:text-9xl mb-8">Categories</p>
        {authority == "ADMIN" && (
          <button
            className="bg-black text-sm md:text-base font-semibold text-[#df94ff] border-2 border-[#df94ff] hover:bg-[#df94ff] hover:text-black p-2 px-6 md:px-8 rounded-md tracking-wide"
            onClick={() => navig("/addCategory")}
          >
            Add Category
          </button>
        )}
      </div>

      {loading && (
        <div className="text-3xl flex items-center justify-center">
          Loading...
        </div>
      )}
      {!loading && (
        <div className="flex flex-col gap-2 mt-2 px-2 items-center">
          {data.map((item) => (
            <div
              key={item.cid}
              className="bg-black rounded-2xl shadow-md p-4 hover:shadow-lg transition w-full flex justify-between"
            >
              <div className="max-w-1/2 flex flex-col h-full">
                <h2 className="text-xl font-semibold text-gray-100 mb-2 truncate">
                  {item.title}
                </h2>
                <p className="text-white truncate">{item.description}</p>
              </div>
              <div className="flex gap-2 flex-col sm:flex-row">
                <button
                  className="bg-[#242424] hover:bg-pink-200 hover:text-black p-4 mx-1 rounded-xl"
                  onClick={() => {
                    navig(`/quizcat/${item.cid}`);
                  }}
                >
                  All quiz
                </button>
                {authority == "ADMIN" && (
                  <button className="bg-[#242424] hover:bg-pink-200 hover:text-black p-4 mx-1 rounded-xl"
                  onClick={()=>{navig(`/addquiz/${item.cid}`)}}>
                    Add quiz
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
