import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import "./App.css";
import AuthPage from "./AuthPage";
import Home from "./Home";

function App() {
  const isLoggedIn = () => {
    const token = localStorage.getItem("token");
    return token !== null; // Check if a token exists
  };
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            isLoggedIn() ? (
              <Home /> // Render Home if logged in
            ) : (
              <AuthPage /> // Render AuthPage if not logged in
            )
          }
        />
        {/* Redirect all unmatched routes to "/" */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;
