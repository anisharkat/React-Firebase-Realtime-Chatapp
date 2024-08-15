
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { GoogleAuthProvider , getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyBbkUerfBJB0VgbpsSPx3knF0shgkyEo0A",
  authDomain: "fir-learning-301cf.firebaseapp.com",
  databaseURL: "https://fir-learning-301cf-default-rtdb.firebaseio.com",
  projectId: "fir-learning-301cf",
  storageBucket: "fir-learning-301cf.appspot.com",
  messagingSenderId: "434929978276",
  appId: "1:434929978276:web:cd096cccec80bcafc8cf31",
  measurementId: "G-E9B90MLLZN"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);