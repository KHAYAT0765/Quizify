import { useState,useEffect } from 'react'
import Login from "./pages/Login"
import { Route, BrowserRouter as Router, Routes ,useLocation} from "react-router-dom";
import Register from './pages/Register';
import HomePage from './pages/HomePage';
import Navbar from './components/Navbar';
import LandingPage from './pages/LandingPage';
import Categories from './pages/Categories';
import { Check } from '@phosphor-icons/react';
import AddCategory from './pages/AddCategory';
import QuizCat from './pages/QuizCat';
import AllQuiz from './pages/AllQuiz';
import AddQuiz from './pages/AddQuiz';
import EditQuiz from './pages/EditQuiz';
import Questions from './pages/Questions';
import AddQuestion from './pages/AddQuestion';
import QuizPage from './pages/QuizPage';
import QuizConfirm from './pages/QuizConfirm';
import Result from './pages/Result';
import Attempts from './pages/Attempts';
import AttemptsForQuiz from './pages/AttemptsForQuiz';
function App() {
  const Location = useLocation();
  const [logged,setLogged] = useState(false);
  const [authority,setAuthority] = useState();
const CheckLog=()=>{
  if (window.localStorage.getItem("token")) {
    setLogged(true);
    setAuthority(window.localStorage.getItem("authorities"));
    return;
  }
}
  useEffect(() => {
    CheckLog();
  }, [Location])
  
return (
  <div className="flex w-screen flex-col h-screen overflow-auto">
    <div>{logged && <Navbar />}</div>
    <Routes>
      {logged && authority == "NORMAL" && (
        <>
          <Route path="/" element={<Categories />} />
          <Route path="/quizcat/:id" element={<QuizCat />} />
          <Route path="/attemptquiz/:id" element={<QuizPage />} />
          <Route path="/quizinfo/:id" element={<QuizConfirm />} />
          <Route path="/result/:id" element={<Result />} />
          <Route path="/attempts" element={<Attempts />} />
          <Route path="/landingpage" element={<LandingPage />} />
        </>
      )}
      {logged && authority == "ADMIN" && (
        <>
          <Route path="/" element={<Categories />} />
          <Route path="/addcategory" element={<AddCategory />} />
          <Route path="/quizcat/:id" element={<QuizCat />} />
          <Route path="/allquiz" element={<AllQuiz />} />
          <Route path="/addquiz/:id" element={<AddQuiz />} />
          <Route path="/editquiz/:id" element={<EditQuiz />} />
          <Route path="/questions/:id" element={<Questions />} />
          <Route path="/addquestion/:id" element={<AddQuestion />} />
          <Route path="/attemptsforquiz/:id" element={<AttemptsForQuiz />} />
          <Route path="/landingpage" element={<LandingPage />} />
        </>
      )}
      {!logged && (
        <>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/" element={<LandingPage />} />
        </>
      )}
    </Routes>
  </div>
);
}

export default App
