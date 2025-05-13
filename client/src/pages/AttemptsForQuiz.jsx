import React, { useEffect, useState } from "react";
import axios from "axios";
import { CheckCircle, XCircle } from "lucide-react";
import { useParams } from "react-router-dom";

const AttemptsForQuiz = () => {
const params = useParams();
  const [quizResults, setQuizResults] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const response = await axios.get(
          `https://quizifyresult.onrender.com/api/quiz-result?quizId=${params.id}`
        ); 
        setQuizResults(response.data);
      } catch (err) {
        console.error("Error fetching quiz results:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen ">
        <div className="text-lg font-medium text-white">Loading...</div>
      </div>
    );
  }

  if (!quizResults.length) {
    return (
      <div className="flex justify-center items-center min-h-screen text-white">
        <div className="text-lg font-medium text-red-500">
          No quiz results available.
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen mx-2">
      <h1 className="text-3xl font-bold text-center text-pink-700 mb-10">
        Quiz Results
      </h1>
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {quizResults.map((quiz) => {
          const scorePercent = (quiz.marks / quiz.maxMarks) * 100;
          const isPassed = scorePercent >= 40;

          return (
            <div
              key={quiz._id}
              className="bg-black shadow-xl rounded-2xl p-6 space-y-4 transition hover:scale-[1.02]"
            >
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold text-pink-600">
                  Quiz: {quiz.quizId}
                </h2>
                {isPassed ? (
                  <CheckCircle className="text-green-500 w-6 h-6" />
                ) : (
                  <XCircle className="text-red-500 w-6 h-6" />
                )}
              </div>
              <p className="text-gray-600">{quiz.description}</p>
              <div className="text-sm space-y-1">
                <p>
                  <span className="font-medium">User:</span> {quiz.userName}
                </p>
                <p>
                  <span className="font-medium">Marks:</span> {quiz.marks} /{" "}
                  {quiz.maxMarks}
                </p>
                <p>
                  <span className="font-medium">Score:</span>{" "}
                  {scorePercent.toFixed(1)}%
                </p>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className={`h-2 rounded-full ${
                    isPassed ? "bg-green-500" : "bg-red-400"
                  }`}
                  style={{ width: `${scorePercent}%` }}
                ></div>
              </div>
              <p className="text-xs text-center text-gray-500">
                {isPassed ? "Passed" : "Needs Improvement"}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AttemptsForQuiz;
