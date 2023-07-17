import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { setNewUserOnboardingStatus, setOnboardingStatusComplete } from "../firebase";

const Signup = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSignUpSuccessful, setIsSignUpSuccessful] = useState(false); // New state variable

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      const userCred = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCred.user;
      await setNewUserOnboardingStatus(user.uid); // Set the onboarding status to true
      setIsSignUpSuccessful(true); // Set the state to true on successful sign-up
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode, errorMessage);
    }
  };

  return (
    <main className="flex items-center justify-center h-screen">
      <section>
        <div className="bg-white p-6 shadow-md rounded-md">
          <h1 className="text-2xl font-semibold mb-4">Shortcut Tracker</h1>

          {/* Conditionally render the success message or the signup form */}
          {isSignUpSuccessful ? (
            <>
              <p className="text-green-600 text-center mb-4">
                Sign up successful! Please log in.
              </p>
              <p className="text-sm text-gray-700 text-center">
                Already have an account?{" "}
                <NavLink to="/login" className="text-blue-600">
                  Sign in
                </NavLink>
              </p>
            </>
          ) : (
            <form onSubmit={onSubmit}>
              <div className="mb-4">
                <label
                  htmlFor="email-address"
                  className="block text-gray-700 font-medium"
                >
                  Email address
                </label>
                <input
                  type="email"
                  label="Email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="Email address"
                  className="w-full border rounded-md px-3 py-2 mt-1"
                />
              </div>

              <div className="mb-4">
                <label
                  htmlFor="password"
                  className="block text-gray-700 font-medium"
                >
                  Password
                </label>
                <input
                  type="password"
                  label="Create password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="Password"
                  className="w-full border rounded-md px-3 py-2 mt-1"
                />
              </div>

              <button
                type="submit"
                className="bg-blue-600 text-white px-4 py-2 rounded-md cursor-pointer"
              >
                Sign up
              </button>
            </form>
          )}
        </div>
      </section>
    </main>
  );
};

export default Signup;
