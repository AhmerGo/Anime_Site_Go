// import { useState } from "react";
// import SignUpForm from "../components/SignUpForm/SignUpForm";
// import PopupLoginForm from "../components/LoginForm/PopupLoginFormm";
// import "./AuthPage.css";

// export default function AuthPage({ setUser }) {
//   const [showSignUp, setShowSignUp] = useState(false);
//   const [showLoginPopup, setShowLoginPopup] = useState(false);

//   const handleLogIn = () => {
//     setShowLoginPopup(true);
//   };

//   const handleCloseLoginPopup = () => {
//     setShowLoginPopup(false);
//   };

//   return (
//     <main>
//       <h1 className="auth">AuthPage</h1>
//       <button
//         className="signup-button"
//         onClick={() => setShowSignUp(!showSignUp)}
//       >
//         {showSignUp ? "Log In" : "Sign Up"}
//       </button>

//       {/* Optionally, you can include the login popup here */}
//       {showLoginPopup && (
//         <PopupLoginForm setUser={setUser} onClose={handleCloseLoginPopup} />
//       )}
//     </main>
//   );
// }
