import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import logo from "./logo.svg";
import "./App.css";
import Home from "./Containers/Home/Home";
import Login from "./Containers/Login/Login";
import PreExam from "./Containers/PreExam/PreExam";
import Exam from "./Containers/Exam/Exam";
//import Exam from "./Containers/Exam/Exam";
import Layout from "./Components/Layout";
import { Switch, Route, Redirect } from "react-router-dom";
import Signup from "./Containers/Signup/Signup";
import store from "./store/store";
import { getUser } from "./store/actions/authActions";
import Admin from "./Components/Admin/AdminHome/Admin";
import CreateExam from "./Containers/Admin/CreateExam/CreateExam";
import Exams from "./Containers/Admin/Exams/Exams";
import CreateQuestions from "./Containers/Admin/CreateQuestions/CreateQuestions";
import Results from "./Containers/Admin/Results/Results";

function App() {
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const { loading } = useSelector((state) => state.notification);
  console.log(user.role);
  useEffect(() => {
    if (isAuthenticated === false) {
      store.dispatch(getUser());
      console.log("not auth");
    }
  }, []);

  return (
    <Switch>
      <Layout>
        {user.role === "issuer" ? (
          <>
            {/* admin and examiner routes */}
            <Route path="/" exact>
              <Admin />
            </Route>
            <Route path="/create-exam" exact>
              <CreateExam />
            </Route>
            <Route path="/create-questions" exact>
              <CreateQuestions />
            </Route>
            <Route path="/exams" exact>
              <Exams />
            </Route>
            <Route path="/results" exact>
              <Results />
            </Route>
          </>
        ) : (
          <>
            <Route path="/" exact>
              <Home />
            </Route>
            <Route path="/login">{isAuthenticated ? <Redirect to="/" /> : <Login />}</Route>
            <Route path="/signup">{isAuthenticated ? <Redirect to="/" /> : <Signup />}</Route>
            <Route path="/exam/:examCode/:resultId">
              <Exam />
            </Route>
            {/* <Route path="/exam/">
                <Exam />
              </Route> */}
            <Route path="/exam-setup" exact>
              <PreExam />
            </Route>
            <Route path="/exam-setup/:examCode/:userId">
              <PreExam />
            </Route>
            <Route path="/exam-setup/:examCode">
              <PreExam />
            </Route>
          </>
        )}
      </Layout>
    </Switch>
  );
}

export default App;
