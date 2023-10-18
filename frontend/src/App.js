import React from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import Login from "./components/Login";
import Tracking from "./components/Tracking";

function App() {
  return (
    <>
      <nav className="navbar navbar-expand navbar-light bg-light">
        <div className="container-fluid">
          <a className="navbar-brand" href="/">
            <b>Binger</b>
          </a>
          <ul className="navbar-nav">
            <li className="nav-item">
              <a className="nav-link" href="/Login">
                Login
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/Tracking">
                Tracking
              </a>
            </li>
          </ul>
        </div>
      </nav>
      <Routes>
        <Route path="/" element={
          <>
            <h3 className="text-center text-white m-4">Welcome</h3>
          </>
        }>
        </Route>
        <Route path="/Tracking" element={<Tracking />} />
        <Route path="/Login" element={<Login />} />
      </Routes>
    </>
  );
}

export default App;
