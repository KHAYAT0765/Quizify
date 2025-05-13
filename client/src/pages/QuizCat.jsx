import { Button } from 'antd';
import React,{useState,useEffect} from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios'
export default function QuizCat() {
    const navig = useNavigate();
    const params = useParams();
    const [loading,setLoading] = useState(true);
    const [data,setData] = useState([]);
    const [authority,setAuthority] = useState(window.localStorage.getItem('authorities'));
    const loadQuiz = async()=>{
    try {
      const token = window.localStorage.getItem("token");
      const response1 = await axios.get(
        `http://localhost:8080/quiz/category/active/${params.id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setData(response1.data);
      setLoading(false);
    } catch (error) {
      console.log(error.message);
    }
  }
  useEffect(() => {
    loadQuiz();
  }, []);
  return (
    <div className="p-8">
      {loading && <p>Loading</p>}
      {!loading && (
        <>
          <h1 className="text-3xl text-pink-600 font-bold mb-6 text-center">
            Quiz List
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {data.map((quiz) => (
              <div
                key={quiz.qId}
                className="bg-black rounded-2xl shadow-md p-6 hover:shadow-lg transition"
              >
                <h2 className="text-xl font-semibold mb-2">{quiz.title}</h2>
                <p className=" mb-1">{quiz.description}</p>
                <p className="text-sm ">
                  Category:{" "}
                  <span className="font-medium">{quiz.category.title}</span> -{" "}
                  {quiz.category.description}
                </p>
                <p className="text-sm ">
                  Max Marks:{" "}
                  <span className="font-medium">{quiz.maxMarks}</span>
                </p>
                <p className="text-sm ">
                  Number of Questions:{" "}
                  <span className="font-medium">{quiz.numberOfQuestions}</span>
                </p>
                <p className="text-sm ">
                  Status:{" "}
                  {quiz.active ? (
                    <span className="text-green-600 font-semibold">Active</span>
                  ) : (
                    <span className="text-red-600 font-semibold">Inactive</span>
                  )}
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {authority == "NORMAL" && (
                    <button
                      className="bg-[#242424] text-white px-3 py-1 rounded-xl text-sm hover:bg-blue-600"
                      onClick={() => navig(`/quizinfo/${quiz.qId}`)}
                    >
                      Start
                    </button>
                  )}
                  {authority == "ADMIN" && (
                    <>
                      <button
                        className="bg-[#242424] text-white px-3 py-1 rounded-xl text-sm hover:bg-green-600"
                        onClick={() => {
                          navig(`/editquiz/${quiz.qId}`);
                        }}
                      >
                        Edit
                      </button>
                      <button
                        className="bg-[#242424] text-white px-3 py-1 rounded-xl text-sm hover:bg-yellow-600"
                        onClick={() => navig(`/questions/${quiz.qId}`)}
                      >
                        Add question
                      </button>
                      <button
                        className="bg-[#242424] text-white px-3 py-1 rounded-xl
                        text-sm hover:bg-yellow-600" onClick=
                        {() => navig(`/attemptsforquiz/${quiz.qId}`)}>
                          Attempts
                      </button>
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
