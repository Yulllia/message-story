import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Explore from "./pages/destination/Explore";
import SignIn from "./pages/sign-in/SignIn";
import "../src/index.css";
import SignUp from "./pages/sign-up/SignUp";
import { ToastContainer } from "react-toastify";
import { useAuth } from "./hooks/AuthHook";
import PrivateRoute from "./components/PrivateRoute";
import { AuthContext } from "./context/AuthContext";
import ContextLocalStorage from "./context/MessageContext";
import React from 'react'

function App() {
  const {token, login, logout, userId} = useAuth();
  const isAuthenticated = !!token
  
  return (
    <div>
      <AuthContext.Provider value={{token, login, logout, userId, isAuthenticated}}>
        <ContextLocalStorage>
      <Router>
        <Routes>
        <Route path="/" element={<PrivateRoute />}>
          <Route path="/" element={<Explore />} />
          </Route>
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/sign-up" element={<SignUp />} />

        </Routes>
      </Router>
      </ContextLocalStorage>
      </AuthContext.Provider>
      <ToastContainer />
    </div>
  );
}

export default App;
