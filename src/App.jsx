import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
// import { BrowserRouter } from 'react-router-dom';
// import { createRoot } from 'react-dom';
import { getUser } from "./utilities/users-service";
import Home from "./Screens/Home";
import AuthPage from "./AuthPage/AuthPage";
import Mood from "./Screens/Mood";
import Watchlist from "./Screens/Watchlist";
import Description from "./Screens/Description";
import Navbar from "./Layout/Navbar/Navbar";
import * as userService from "./utilities/users-service";

// import Footer from './Layout/Footer/Footer';
import Player from "./Screens/Player";
import Watch from "./components/Watch";
import "./components/LoginForm/PopupLoginForm";
import "./AppCss/App.css";
import PopupLoginForm from "./components/LoginForm/PopupLoginForm";

export default function App() {
  const [user, setUser] = useState(getUser());
  const [isLoginOpen, setLoginOpen] = useState(false);
  const [showRegister, setShowRegister] = useState(false); // New state

  const handleSignInClick = () => {
    setLoginOpen(true);
  };

  const handleSignOutClick = () => {
    userService.logOut();
    setUser(null);
  };
  const handleRegisterClick = () => {
    setShowRegister(true); // Show the register form when "Register" is clicked
  };
  const handleRegisterClickTwo = () => {
    setShowRegister(false); // Show the register form when "Register" is clicked
  };

  const handleBackToLoginClick = () => {
    setShowRegister(false); // Return to the login form
  };

  const handleCloseLogin = () => {
    setLoginOpen(false);
  };

  return (
    <>
      <Navbar
        user={user}
        setUser={setUser}
        onSignInClick={handleSignInClick}
        onSignOutClick={handleSignOutClick}
      />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/mood" element={<Mood />} />
        <Route path="/player" element={<Player />} />
        <Route path="/watchlist" element={<Watchlist />} />
        <Route path="/description" element={<Description />} />
        <Route path="/watch" element={<Watch />} />
      </Routes>
      <div className={`overlay ${isLoginOpen ? "active" : ""}`} />
      <PopupLoginForm
        isOpen={isLoginOpen}
        onClose={handleCloseLogin}
        setUser={setUser}
        onRegisterClick={handleRegisterClick}
        showRegister={showRegister}
        onBackToLoginClick={handleBackToLoginClick}
        finishRegister={handleRegisterClickTwo}
      />
    </>
  );
}

// <BrowserRouter>
//   {/* <Box sx={{ backgroundColor: '#001155'}}> */}
//     <div className=" bg-[url('./assets/fr5.png')] h-screen w-screen">
//       <div className=" w-screen">
//       <Routes>
//       <Route path="" element={<Home />} />
//         <Route path="/" element={<Home />} />
//         <Route path="/home" element={<Home />} />
//         <Route path="/player" exact element={<Player />} />
//         <Route path="/mood" exact element={<Mood />} />
//         <Route path="/watchlist" exact element={<Watchlist />} />

//       </Routes>
//       </div>
//     </div>

//     {/* </Box> */}
//   </BrowserRouter>
