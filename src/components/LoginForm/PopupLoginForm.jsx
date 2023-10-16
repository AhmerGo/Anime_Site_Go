import React, { useState } from "react";
import * as usersService from "../../utilities/users-service";
import "./LoginForm.css";
import SignUpForm from "../SignUpForm/SignUpForm";

export default function PopupLoginForm({
  isOpen,
  onClose,
  setUser,
  onRegisterClick,
  showRegister,
  onBackToLoginClick,
  finishRegister,
}) {
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");

  function handleChange(evt) {
    const { name, value } = evt.target;
    setCredentials({ ...credentials, [name]: value });
    setError(""); // Clear any previous errors when input changes
  }

  async function handleSubmit(evt) {
    evt.preventDefault();
    try {
      const user = await usersService.login(credentials);
      setUser(user);
      onClose();
    } catch (err) {
      setError("Log In Failed - Try Again");
    }
  }

  return (
    <div
      className={`fixed inset-0 flex items-center justify-center ${
        isOpen ? "block" : "hidden"
      }`}
      style={{ zIndex: 2000 }} // ensure the modal is always on top
    >
      <div
        className={`transition-transform duration-300 transform ${
          isOpen ? "scale-100" : "scale-95"
        } bg-gray-800 text-white rounded-lg shadow-2xl z-50 p-8`}
      >
        {showRegister ? (
          <SignUpForm
            onBackToLoginClick={onBackToLoginClick}
            setUser={setUser}
            onClose={onClose} // Pass the onClose prop to SignUpForm
            finishRegister={finishRegister}
          />
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              name="email"
              placeholder="Email"
              value={credentials.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-submain rounded-lg focus:outline-none focus:border-rare2 text-gray-100 bg-gray-700"
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={credentials.password}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-submain rounded-lg focus:outline-none focus:border-rare2 text-gray-100 bg-gray-700"
            />
            {error && <div className="error-message text-red-600">{error}</div>}
            <button
              type="submit"
              className="w-full py-2 px-4 bg-submain text-white font-bold rounded-lg hover:bg-rare2 transition duration-200"
            >
              Login
            </button>
            <button
              onClick={onClose}
              type="button"
              className="w-full py-2 px-4 bg-gray-600 text-white font-bold rounded-lg hover:bg-gray-500 transition duration-200"
            >
              Close
            </button>
            <div className="flex justify-center pt-4">
              <button
                className="text-rare2 hover:underline"
                onClick={onRegisterClick}
              >
                Don't have an account? Register
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
