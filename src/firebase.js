// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getDatabase, ref, set, push } from "firebase/database";



// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
// Your web app's Firebase configuration

const firebaseConfig = {
  apiKey: "AIzaSyDU-vtsA6I-K4dGI59AEJ-aFR7BPRVUOyY",
  authDomain: "hiring-app-56769.firebaseapp.com",
  databaseURL: "https://hiring-app-56769-default-rtdb.firebaseio.com",
  projectId: "hiring-app-56769",
  storageBucket: "hiring-app-56769.appspot.com",
  messagingSenderId: "478007660523",
  appId: "1:478007660523:web:ca70be77da9e09f65953ae",
  measurementId: "G-DVJ6XHN89P",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const database = getDatabase(app);

const addShortcutToDatabase = (shortcut, userId, userEmail) => {
  const newShortcutRef = ref(database, `users/${userId}/shortcuts`);
  const newShortcutData = {
    ...shortcut,
    userId,
    userEmail,
    deleted: false,
  };

  const newShortcutKey = push(newShortcutRef).key;
  const newShortcutWithKey = { ...newShortcutData, key: newShortcutKey };

  return set(newShortcutRef.child(newShortcutKey), newShortcutWithKey).then(
    () => newShortcutWithKey
  );
};

const updateShortcutInDatabase = (shortcutKey, updates) => {
  const databaseRef = ref(
    database,
    `users/${updates.userId}/shortcuts/${shortcutKey}`
  );
  return set(databaseRef, updates, { merge: true });
};

const setNewUserOnboardingStatus = (userId) => {
  const databaseRef = ref(database, `users/${userId}`);
  return set(databaseRef, { onboardingComplete: false }, { merge: true });
};

const setOnboardingStatusComplete = (userId) => {
  const databaseRef = ref(database, `users/${userId}`);
  return set(databaseRef, { onboardingComplete: true }, { merge: true });
};

export {
  auth,
  database,
  ref,
  set,
  addShortcutToDatabase,
  updateShortcutInDatabase,
  setNewUserOnboardingStatus,
  setOnboardingStatusComplete,
};
