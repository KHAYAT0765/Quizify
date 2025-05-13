import { useState } from "react";
import { initializeApp } from "firebase/app";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";


const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_KEY,
  authDomain: "mernproject5thesem.firebaseapp.com",
  projectId: "mernproject5thesem",
  storageBucket: "mernproject5thesem.appspot.com",
  messagingSenderId: "494704108594",
  appId: "1:494704108594:web:6206677eb0bf2e341c482b",
  measurementId: "G-FW1PRPQQGH",
};

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

export default function AddQuestion() {
    const params = useParams();
    const navig = useNavigate();
  const [formData, setFormData] = useState({
    content: "",
    image: "",
    option1: "none",
    option2: "none",
    option3: "none",
    option4: "none",
    answer: "",
    quiz: {
      qId: params.id,
    },
  });

  const [uploading, setUploading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "qId") {
      setFormData({ ...formData, quiz: { qId: parseInt(value) } });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const timestamp = Date.now();
    const ext = file.name.split(".").pop(); 
    const filename = `quiz-${timestamp}.${ext}`;
    const storageRef = ref(storage, `quiz-images/${filename}`);

    const uploadTask = uploadBytesResumable(storageRef, file);
    setUploading(true);

    uploadTask.on(
      "state_changed",
      null,
      (error) => {
        console.error("Upload failed:", error);
        setUploading(false);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setFormData((prev) => ({ ...prev, image: downloadURL }));
          setUploading(false);
        });
      }
    );
  };


  const handleSubmit = async(e) => {
    e.preventDefault();
    console.log("Form Data Submitted:", formData);
    
    try {
      const token = window.localStorage.getItem("token");
      const response = await axios.post(
        "http://localhost:8080/question/",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      navig(`/questions/${params.id}`);
    } catch (error) {
      console.log("Error: " + error.message);
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 rounded-2xl shadow-lg bg-black">
      <h2 className="text-2xl font-bold mb-6">Add Question</h2>
      <form onSubmit={handleSubmit} className="space-y-4 bg-black">
        <div>
          <label className="block mb-1 font-medium">Question</label>
          <input
            type="text"
            name="content"
            value={formData.content}
            onChange={handleChange}
            className="w-full border border-gray-300 p-2 rounded"
            placeholder="Enter your question"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium ">Upload Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="w-full bg-pink-300 rounded-md"
          />
          {uploading && (
            <p className="text-sm text-blue-500 mt-1">Uploading...</p>
          )}
          {formData.image && (
            <img
              src={formData.image}
              alt="Preview"
              className="mt-2 w-40 h-auto rounded border"
            />
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[1, 2, 3, 4].map((num) => (
            <div key={num}>
              <label className="block mb-1 font-medium">{`Option ${num}`}</label>
              <input
                type="text"
                name={`option${num}`}
                value={formData[`option${num}`]}
                onChange={handleChange}
                className="w-full border border-gray-300 p-2 rounded"
                placeholder={`Enter Option ${num}`}
              />
            </div>
          ))}
        </div>

        <div>
          <label className="block mb-1 font-medium">Correct Answer</label>
          <select
            name="answer"
            value={formData.answer}
            onChange={handleChange}
            className="w-full border border-gray-300 p-2 rounded"
          >
            <option value="">Select the correct answer</option>
            {[
              { key: "option1", label: formData.option1 },
              { key: "option2", label: formData.option2 },
              { key: "option3", label: formData.option3 },
              { key: "option4", label: formData.option4 },
            ]
              .filter((opt) => opt.label) // Only show if filled
              .map(({ key, label }) => (
                <option key={key} value={label}>
                  {label}
                </option>
              ))}
          </select>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
        >
          Submit
        </button>
      </form>
    </div>
  );
}
