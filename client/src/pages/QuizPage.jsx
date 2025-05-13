import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

export default function QuizPage() {
  const navig = useNavigate();
  const params = useParams();
  const [quizData, setQuizData] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchQuizData = async () => {
      try {
        const token = window.localStorage.getItem("token");
        const response = await axios.get(
          `http://localhost:8080/question/quiz/${params.id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setQuizData(response.data); 
        setLoading(false);
      } catch (error) {
        setError("Failed to load quiz data.");
        setLoading(false);
      }
    };
  useEffect(() => {
    fetchQuizData();
  }, []);

  const currentQ = quizData[currentIndex];

  const handleOptionClick = (selectedOption) => {
    setAnswers({
      ...answers,
      [currentQ.quesId]: selectedOption,
    });
  };

  const handleSubmit = () => {
    setIsSubmitted(true);
  };

  const calculateScore = async() => {
    let score = 0;
    quizData.forEach((q) => {
      if (answers[q.quesId] === q.answer) {
        score += 1;
      }
    });
    const maxMarks = parseInt(quizData[0].quiz.maxMarks);
    const numberOfQuestions = parseInt(quizData[0].quiz.numberOfQuestions);
    const perques = maxMarks / numberOfQuestions;
    const totalmarks = quizData.length * perques;
    const scoredmarks = perques * score;
    const datatosend = ({
      quizId : quizData[0].quiz.qId,
      description : quizData[0].quiz.title,
      marks : scoredmarks,
      maxMarks : totalmarks,
      userName : window.localStorage.getItem("user")
    })
    try {
      const res = await axios.post("https://quizifyresult.onrender.com/api/quiz-result",datatosend);
      navig(`/result/${res.data.id}`);
    } catch (error) {
      console.log(error);
    }
  };

  if (loading) return <div>Loading quiz data...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <div className="shadow-lg rounded-2xl p-6 w-full max-w-xl bg-black">
        <h2 className="text-xl font-bold mb-4">Question {currentIndex + 1}</h2>
        <p className="text-white mb-4">{currentQ.content}</p>

        {currentQ.image && (
          <img
            src={currentQ.image}
            alt="question"
            className="mb-4 rounded-lg max-h-60 object-contain"
          />
        )}

        <div className="grid grid-cols-1 gap-2 mb-6">
          {[
            currentQ.option1,
            currentQ.option2,
            currentQ.option3,
            currentQ.option4,
          ].map((opt, idx) => (
            <button
              key={idx}
              onClick={() => handleOptionClick(opt)}
              className={`p-3 rounded-xl border ${
                answers[currentQ.quesId] === opt
                  ? "bg-blue-500 text-white"
                  : "hover:text-black hover:bg-blue-200"
              }`}
            >
              {opt}
            </button>
          ))}
        </div>

        <div className="flex justify-between">
          <button
            onClick={() => setCurrentIndex((prev) => Math.max(prev - 1, 0))}
            disabled={currentIndex === 0}
            className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400 disabled:opacity-50"
          >
            Previous
          </button>
          {currentIndex < quizData.length - 1 ? (
            <button
              onClick={() => setCurrentIndex((prev) => prev + 1)}
              className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700"
            >
              Next
            </button>
          ) : (
            <button
              onClick={()=>calculateScore()}
              className="px-4 py-2 rounded bg-green-600 text-white hover:bg-green-700"
            >
              Submit
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
