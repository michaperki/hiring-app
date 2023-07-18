import React, { useState, useEffect } from "react";
import { auth, database, set } from "../firebase";
import { useNavigate } from "react-router-dom";
import { addShortcutToDatabase } from "../utils/firebaseUtils";
import { ref, onValue, push } from "firebase/database";
import UserOnboardingForm from "./UserOnboardingForm"; // Import the UserOnboardingForm component
import SwipeableViews from "react-swipeable-views"; // Import the SwipeableViews component
import JobSwipeContainer from "./JobSwipeContainer";

const Home = ({ isLoggedIn, user }) => {
  const navigate = useNavigate();
  const [shortcuts, setShortcuts] = useState([]);
  const [onboardingStatus, setOnboardingStatus] = useState(false); // New state variable for onboardingStatus
  const [swipeIndex, setSwipeIndex] = useState(0); // New state to keep track of swipe index

  // Handle swipe right or left
  const handleSwipe = (index) => {
    // Perform actions based on swiping left or right
    if (index === 1) {
      console.log("Swiped right (like)");
    } else if (index === -1) {
      console.log("Swiped left (dislike)");
    }
  };

  const handleOnboarding = () => {
    // Check if the user has completed onboarding
    if (user) {
      const databaseRef = ref(database, `users/${user.uid}/onboardingComplete`);
      onValue(databaseRef, (snapshot) => {
        const onboardingComplete = snapshot.val();
        if (onboardingComplete) {
          setOnboardingStatus(true);
        } else {
          setOnboardingStatus(false);
        }
      });
    }
    return onboardingStatus;
  };

  // Fetch existing shortcuts when the user logs in, but only run once
  useEffect(() => {
    if (user) {
      // Check if the user has completed onboarding
      const databaseRef = ref(database, `users/${user.uid}/onboardingComplete`);
      onValue(databaseRef, (snapshot) => {
        const onboardingComplete = snapshot.val();
        if (onboardingComplete) {
          setOnboardingStatus(true);
        } else {
          setOnboardingStatus(false);
        }
      });
    }
  }, [user]);

  const handleCompleteOnboarding = (employer, seeking) => {
    // Update the database to indicate that the user has completed onboarding
    if (user) {
      const databaseRef = ref(database, `users/${user.uid}/onboardingComplete`);
      set(databaseRef, true);
    }
    setOnboardingStatus(true);
    // TODO - add the user's answers to the database
    // Navigate to the home page
    navigate("/");
  };

  return (
    <>
      <div>
        {isLoggedIn ? (
          <div>
            {onboardingStatus ? (
              <div>
                <div>
                  <JobSwipeContainer />
                </div>
                <div>
                  <h1>Swipe right to like, left to dislike</h1>
                </div>
              </div>
            ) : (
              <UserOnboardingForm
                user={user}
                onCompleteOnboarding={handleCompleteOnboarding}
              />
            )}
          </div>
        ) : (
          <div>
            <h1>Sign up or log in to get started!</h1>
          </div>
        )}
      </div>
    </>
  );
};


export default Home;
