import React, { Component } from "react";
import { signUp } from "../../utilities/users-service";
import "./SignUpForm.css";

export default class SignUpForm extends Component {
  state = {
    name: "",
    email: "",
    password: "",
    confirm: "",
    error: "",
  };

  handleChange = (evt) => {
    this.setState({
      [evt.target.name]: evt.target.value,
      error: "",
    });
  };

  handleSubmit = async (evt) => {
    evt.preventDefault();
    try {
      const { name, email, password, confirm } = this.state;

      // Check if password and confirm password fields match
      if (password !== confirm) {
        throw new Error("Passwords do not match!");
      }

      const formData = { name, email, password };

      // The signUp function should now handle errors and rethrow them with more context
      const user = await signUp(formData);

      // setUser in parent component with returned user object
      this.props.setUser(user);
      this.props.finishRegister();
      this.props.onClose(); // Close the form - assuming onClose is passed from PopupLoginForm

      // Optionally, if you have a method to close the modal or redirect the user, call it here
      // this.props.onSignUpSuccess(); // example method
    } catch (error) {
      // Log the error to the console for debugging
      console.error("Sign Up Error:", error);

      // Set error message in component state to display in the form
      this.setState({ error: error.message || "Sign Up Failed - Try Again" });
    }
  };

  render() {
    const { name, email, password, confirm, error } = this.state;
    const disable = password !== confirm;

    return (
      <div className="login bg-gray-800 text-white p-8 relative">
        {" "}
        <button
          className="absolute top-0 right-0 p-2"
          onClick={() => {
            this.props.finishRegister();
            this.props.onClose();
          }}
          aria-label="Close form" // for accessibility
          style={{
            background: "none",
            border: "none",
            fontSize: "1.5rem",
            cursor: "pointer",
          }}
        >
          &times;{" "}
          {/* This is the HTML entity for the multiplication sign, which looks like an X */}
        </button>
        <div className="form-container max-w-md mx-auto">
          <h2 className="text-2xl font-bold mb-8 text-center">
            Create Your Account
          </h2>
          <form
            autoComplete="off"
            onSubmit={this.handleSubmit}
            className="space-y-6"
          >
            {/* Name input */}
            <div>
              <label className="block mb-2">Name</label>
              <input
                type="text"
                name="name"
                value={name}
                onChange={this.handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 bg-gray-700 text-white"
              />
            </div>

            {/* Email input */}
            <div>
              <label className="block mb-2">Email</label>
              <input
                type="email"
                name="email"
                value={email}
                onChange={this.handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 bg-gray-700 text-white"
              />
            </div>

            {/* Password input */}
            <div>
              <label className="block mb-2">Password</label>
              <input
                type="password"
                name="password"
                value={password}
                onChange={this.handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 bg-gray-700 text-white"
              />
            </div>

            {/* Confirm Password input */}
            <div>
              <label className="block mb-2">Confirm Password</label>
              <input
                type="password"
                name="confirm"
                value={confirm}
                onChange={this.handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 bg-gray-700 text-white"
              />
            </div>

            {/* Error message display */}
            {error && <p className="error-message text-red-600">{error}</p>}

            {/* Sign Up button */}
            <div>
              <button
                type="submit"
                disabled={disable}
                className={`w-full py-3 px-4 text-white font-bold rounded-lg ${
                  disable ? "bg-gray-500" : "bg-blue-500 hover:bg-blue-700"
                } transition duration-200`}
              >
                SIGN UP
              </button>
            </div>
          </form>

          {/* Back to Login button */}
          <div className="flex justify-center pt-6">
            <button
              onClick={this.props.onBackToLoginClick}
              className="text-blue-200 hover:text-blue-400 transition duration-200"
            >
              Already have an account? Sign in
            </button>
          </div>
        </div>
      </div>
    );
  }
}
