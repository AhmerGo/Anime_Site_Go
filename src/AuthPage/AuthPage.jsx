import { useState } from "react";
import SignUpForm from "../../components/SignUpForm/SignUpForm";
import LoginForm from "../../components/LoginForm/LoginForm";
import "./AuthPage.css";

export default function AuthPage({ setUser }) {
  const [showSignUp, setShowSignUp] = useState(false);
  return (
    <main>
      <h1 className="auth">AuthPage</h1>
      <button
        classname="signup-button"
        onClick={() => setShowSignUp(!showSignUp)}
      >
        {showSignUp ? "Log In" : "Sign Up"}
      </button>
      {showSignUp ? (
        <SignUpForm setUser={setUser} />
      ) : (
        <LoginForm setUser={setUser} />
      )}
    </main>
  );
}
