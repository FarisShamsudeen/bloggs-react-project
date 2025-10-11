import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyA9TdKBmg8OMz4Ohu3kaAe6eO-zoCLAemU",
  authDomain: "simple-react-blog-project.firebaseapp.com",
  projectId: "simple-react-blog-project",
  storageBucket: "simple-react-blog-project.firebasestorage.app",
  messagingSenderId: "781753433061",
  appId: "1:781753433061:web:885b1b4362ea6c2b2b8d0c"
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

