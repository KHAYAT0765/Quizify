import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

export default function EditQuiz() {
  const params = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState();
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading,setLoading] = useState(true);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (name === "active") {
      setFormData((prev) => ({ ...prev, active: checked }));
    } else if (name === "cid") {
      setFormData((prev) => ({
        ...prev,
        category: { cid: value },
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const validateForm = () => {
    const { title, description, maxMarks, numberOfQuestions, category } =
      formData;
    if (
      !title ||
      !description ||
      !maxMarks ||
      !numberOfQuestions ||
      !category.cid
    ) {
      setError("All fields are required.");
      return false;
    }
    setError("");
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      const token = window.localStorage.getItem("token");
      const res = await axios.put("http://localhost:8080/quiz/", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setSuccess("edit successfull!");
      setTimeout(() => navigate("/"), 2000);
    } catch (err) {
      setError("Failed to create quiz: " + err.message);
    }
  };
  const getQuizInfo = async () => {
    try {
      const token = window.localStorage.getItem("token");
      const res = await axios.get(`http://localhost:8080/quiz/${params.id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(res.data);
      setFormData(res.data);
      setLoading(false);
    } catch (err) {
      console.log("Failed to create quiz: " + err.message);
    }
  };
  useEffect(() => {
    getQuizInfo()
    console.log(formData);
  }, [])
  
  return (
    <div className="min-h-screen flex justify-center items-center w-screen">
      {loading && <>loading...</>}
      {!loading && (
        <form
          className="flex flex-col mx-1 gap-y-4 w-full max-w-md"
          onSubmit={handleSubmit}
        >
          <h2 className="text-2xl text-center font-bold">Create New Quiz</h2>

          {error && <p className="text-red-500 text-sm">{error}</p>}
          {success && <p className="text-green-500 text-sm">{success}</p>}

          <input
            className="p-2 bg-[#222222] text-white rounded-md"
            type="text"
            name="title"
            placeholder="Quiz Title"
            value={formData.title}
            onChange={handleChange}
          />

          <textarea
            className="p-2 bg-[#222222] text-white rounded-md"
            name="description"
            placeholder="Description"
            value={formData.description}
            rows="3"
            onChange={handleChange}
          />

          <input
            className="p-2 bg-[#222222] text-white rounded-md"
            type="number"
            name="maxMarks"
            value={formData.maxMarks}
            placeholder="Max Marks"
            onChange={handleChange}
          />

          <input
            className="p-2 bg-[#222222] text-white rounded-md"
            type="number"
            name="numberOfQuestions"
            placeholder="Number of Questions"
            value={formData.numberOfQuestions}
            onChange={handleChange}
          />

          <label className="flex items-center space-x-2 text-white">
            <input
              type="checkbox"
              name="active"
              checked={formData.active}
              onChange={handleChange}
            />
            <span>Active</span>
          </label>

          <button
            type="submit"
            className="bg-black text-sm font-semibold text-[#df94ff] border-2 border-[#df94ff] hover:bg-[#df94ff] hover:text-black p-2 px-6 rounded-md"
          >
            Edit Quiz
          </button>
        </form>
      )}
    </div>
  );
}
