import React, { useEffect, useState } from "react";
import axios from "axios";
import { CheckCircle, XCircle } from "lucide-react";
import { Link, useParams } from "react-router-dom";

const Result = () => {
    const params = useParams();
  const [quizData, setQuizData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchQuizData = async () => {
      try {
        const response = await axios.get(
          `https://quizifyresult.onrender.com/api/quiz-result?id=${params.id}`
        );
        setQuizData(response.data);
      } catch (error) {
        console.error("Error fetching quiz data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchQuizData();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-100">
        <div className="text-lg font-medium text-gray-600">Loading...</div>
      </div>
    );
  }

  if (!quizData) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-100">
        <div className="text-lg font-medium text-red-500">
          No quiz data found.
        </div>
      </div>
    );
  }

  const scorePercent = (quizData.marks / quizData.maxMarks) * 100;
  const isPassed = scorePercent >= 40;

  return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-r from-indigo-100 to-purple-200 px-4">
      <div className="bg-white shadow-2xl rounded-2xl p-8 max-w-lg w-full">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-3xl font-bold text-indigo-700">Quiz Result</h2>
          {isPassed ? (
            <CheckCircle className="text-green-500 w-8 h-8" />
          ) : (
            <XCircle className="text-red-500 w-8 h-8" />
          )}
        </div>

        <div className="space-y-4 text-gray-800">
          <div className="flex justify-between">
            <span className="font-semibold">Quiz ID:</span>
            <span>{quizData.quizId}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-semibold">Description:</span>
            <span>{quizData.description}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-semibold">User:</span>
            <span>{quizData.userName}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-semibold">Marks Obtained:</span>
            <span>
              {quizData.marks} / {quizData.maxMarks}
            </span>
          </div>
          <div className="mt-4 w-full bg-gray-200 rounded-full h-3">
            <div
              className={`h-3 rounded-full ${
                isPassed ? "bg-green-500" : "bg-red-400"
              }`}
              style={{ width: `${scorePercent}%` }}
            ></div>
          </div>
          <p className="text-sm text-center text-gray-600 mt-2">
            You scored {scorePercent.toFixed(1)}%
          </p>
          <Link to={"/"}>got to home</Link>
        </div>
      </div>
    </div>
  );
};

export default Result;
