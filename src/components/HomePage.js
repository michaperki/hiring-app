import React, { useState, useEffect } from "react";
import { auth, database, set } from "../firebase";
import { useNavigate } from "react-router-dom";
import ShortcutForm from "./ShortcutForm";
import ShortcutList from "./ShortcutList";
import { addShortcutToDatabase } from "../utils/firebaseUtils";
import { ref, onValue, push } from "firebase/database";
import PopularShortcutsGrid from "./PopularShortcutsGrid"; // Import the new component
import popularShortcutsData from "../public/popularShortcutsData";
import UserOnboardingForm from "./UserOnboardingForm"; // Import the UserOnboardingForm component

const Home = ({ isLoggedIn, user }) => {
  const navigate = useNavigate();
  const [shortcuts, setShortcuts] = useState([]);
  const [onboardingStatus, setOnboardingStatus] = useState(false); // New state variable for onboardingStatus

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

  const handleCompleteOnboarding = () => {
    // Update the database to indicate that the user has completed onboarding
    if (user) {
      const databaseRef = ref(database, `users/${user.uid}/onboardingComplete`);
      set(databaseRef, true);
    }
    setOnboardingStatus(true);
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
  return (
    <div>
      {/* If the user is logged in, show the shortcuts form and list */}
      {isLoggedIn && (
        <div>
          {/* If the user has not completed onboarding, show the onboarding form */}
          {!onboardingStatus && (
            <UserOnboardingForm
              user={user}
              onCompleteOnboarding={handleCompleteOnboarding}
            />
          )}
          {/* If the user has completed onboarding, show the shortcuts form and list */}
          {onboardingStatus && (
            <div>
              nothing here
            </div>
          )}
        </div>
      )}
      {/* If the user is not logged in, show the popular shortcuts grid */}
      nothing here
    </div>
  );
};

export default Home;
