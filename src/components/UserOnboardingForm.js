import React, { useState } from "react";
import { collection, addDoc } from "firebase/firestore"; // Assuming you have imported the required Firestore functions.
import { database } from "../firebase";

const UserOnboardingForm = ({ user, onCompleteOnboarding }) => {
  const [isEmployer, setIsEmployer] = useState(null);
  const [hiringFor, setHiringFor] = useState("");
  const [lookingForJob, setLookingForJob] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const employer = isEmployer;
      const seeking = isEmployer === false ? lookingForJob : hiringFor;
      // Update the database to indicate that the user has completed onboarding
      onCompleteOnboarding(employer, seeking);
    } catch (error) {
      // Handle Firebase Firestore write errors
      console.error("Error saving user responses:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Question 1: Are you an employer or job seeker? */}
      <div>
        <label>
          <input
            type="radio"
            value="employer"
            checked={isEmployer === true}
            onChange={() => setIsEmployer(true)}
          />
          Employer
        </label>
        <label>
          <input
            type="radio"
            value="jobSeeker"
            checked={isEmployer === false}
            onChange={() => setIsEmployer(false)}
          />
          Job Seeker
        </label>
      </div>

      {/* Question 2: PATH A - Who are you hiring? */}
      {isEmployer === true && (
        <div>
          <label>
            Who are you hiring?
            <input
              type="text"
              value={hiringFor}
              onChange={(e) => setHiringFor(e.target.value)}
              required
            />
          </label>
        </div>
      )}

      {/* Question 3: PATH B - What job are you looking for? */}
      {isEmployer === false && (
        <div>
          <label>
            What job are you looking for?
            <input
              type="text"
              value={lookingForJob}
              onChange={(e) => setLookingForJob(e.target.value)}
              required
            />
          </label>
        </div>
      )}

      <button type="submit">Complete Onboarding</button>
    </form>
  );
};

export default UserOnboardingForm;
