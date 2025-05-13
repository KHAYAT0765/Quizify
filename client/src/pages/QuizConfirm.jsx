import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import axios from 'axios';
const QuizConfirm = () => {
    const params = useParams();
    const navig = useNavigate();
  const [quiz,setQuiz] = useState();
  const [loading,setLoading] = useState(true)
    const setQuizInfo = async()=>{
        try {
          const token = window.localStorage.getItem("token");
          const response1 = await axios.get(
            `http://localhost:8080/quiz/${params.id}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          setQuiz(response1.data);
          setLoading(false);
        } catch (error) {
          console.log(error.message);
        }
    }
  const handleStartQuiz = () => {
    // Add navigation or logic here
    alert(`Starting quiz: ${quiz.title}`);
    navig(`/attemptquiz/${quiz.qId}`)
  };
  useEffect(() => {
    setQuizInfo();
  }, [])
  
  return (
    <div className="min-h-screen p-6 flex items-center justify-center">
        {loading && <>Loading...</>}
        {!loading &&
      <div className="bg-black rounded-2xl shadow-xl p-8 max-w-xl w-full">
        <h1 className="text-3xl font-bold text-pink-600 mb-4">{quiz.title}</h1>
        <p className="text-white mb-2">{quiz.description}</p>

        <div className="grid grid-cols-2 gap-4 mt-6 text-white">
          <div>
            <p className="font-semibold">Max Marks:</p>
            <p>{quiz.maxMarks}</p>
          </div>
          <div>
            <p className="font-semibold">Questions:</p>
            <p>{quiz.numberOfQuestions}</p>
          </div>
          <div>
            <p className="font-semibold">Status:</p>
            <p
              className={
                quiz.active
                  ? "text-green-600 font-bold"
                  : "text-red-600 font-bold"
              }
            >
              {quiz.active ? "Active" : "Inactive"}
            </p>
          </div>
          <div>
            <p className="font-semibold">Quiz ID:</p>
            <p>{quiz.qId}</p>
          </div>
        </div>

        <div className="mt-6 border-t pt-4">
          <h2 className="text-xl font-semibold text-purple-400">Category</h2>
          <p className="text-white mt-1">
            <span className="font-semibold">Title:</span> {quiz.category.title}
          </p>
          <p className="text-white">
            <span className="font-semibold">Description:</span>{" "}
            {quiz.category.description}
          </p>
        </div>

        <div className="mt-8 text-center">
          <button
            onClick={handleStartQuiz}
            className="px-6 py-3 bg-pink-600 text-white rounded-xl hover:bg-blue-700 transition duration-200 shadow"
          >
            Start Quiz
          </button>
        </div>
      </div>}
    </div>
  );
};

export default QuizConfirm;
