import { useEffect,useState } from "react";
import React from 'react'
import axios from 'axios'
import { useNavigate, useParams } from "react-router-dom";
export default function Questions() {
    const params = useParams();
    const navig = useNavigate();
    const [quizData,setQuizData] = useState();
    const [loading,setLoading] = useState(true);
    const setQuiz = async()=>{
        try {
          const token = window.localStorage.getItem("token");
          const response1 = await axios.get(
            `http://localhost:8080/question/quiz/${params.id}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          setQuizData(response1.data);
          setLoading(false);
        } catch (error) {
          console.log(error.message);
        }
    };
    const handleDelete = async(id)=>{
        try {
           const token = window.localStorage.getItem("token");
           const response = await axios.delete(
             `http://localhost:8080/question/${id}`,
             {
               headers: {
                 Authorization: `Bearer ${token}`,
               },
             }
           );
           setQuiz();
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
      setQuiz();
    }, [])
    
 return (
   <div className="p-6 min-h-screen mb-4">
     <button
       className="py-2 w-full border bg-black border-pink-600 text-pink-600 rounded-md hover:bg-red-700 hover:text-black cursor-pointer"
       onClick={() => {
         navig(`/addquestion/${params.id}`);
       }}
     >
       Add question
     </button>
     {!loading && quizData[0] && (
       <h1 className="text-3xl font-bold mb-6 text-center">
         {quizData[0].quiz.title}
       </h1>
     )}
     {loading && <>the list is empty</>}
     {!loading && (
       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
         {quizData.map((q) => (
           <div key={q.quesId} className="p-5 rounded-2xl shadow-md bg-black">
             {q.image && q.image != "" && (
               <img
                 src={q.image}
                 alt="question"
                 className="w-full h-48 object-contain mb-4 rounded-md "
               />
             )}
             {q.image == "" && (
               <img
                 src='/quizifyLogo.png'
                 alt="question"
                 className="w-full h-48 object-contain mb-4 rounded-md "
               />
             )}
             <h2 className="text-xl font-semibold mb-2">Q: {q.content}</h2>
             <ul className="mb-3 space-y-1">
               <li>1. {q.option1}</li>
               <li>2. {q.option2}</li>
               <li>3. {q.option3}</li>
               <li>4. {q.option4}</li>
             </ul>
             <p className="text-green-600 font-medium">
               Correct Answer: {q.answer}
             </p>
             <button
               className="py-2 w-full border border-red-700 text-red-700 rounded-md hover:bg-red-700 hover:text-black cursor-pointer"
               onClick={() => handleDelete(q.quesId)}
             >
               Delete
             </button>
           </div>
         ))}
       </div>
     )}
   </div>
 );
}
