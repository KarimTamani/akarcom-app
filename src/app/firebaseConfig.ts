// firebase.js
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, GithubAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyA0Z1Cp9VQ1283F8SwZM0OUuidMYT1ZIWA",
  authDomain: "akarcom-13b05.firebaseapp.com",
  projectId: "akarcom-13b05",
  storageBucket: "akarcom-13b05.firebasestorage.app",
  messagingSenderId: "203769904036",
  appId: "1:203769904036:web:b80b945202e9381950df31",
  measurementId: "G-M1BPR1VK36"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const googleProvider = new GoogleAuthProvider();

export { auth, googleProvider };
