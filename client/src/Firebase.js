import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyB2N80x7GRw-fOrWQ7mENiAGHRMGFaR6tM",
  authDomain: "blog-app-806ae.firebaseapp.com",
  projectId: "blog-app-806ae",
  storageBucket: "blog-app-806ae.appspot.com",
  messagingSenderId: "62381551182",
  appId: "1:62381551182:web:170b25da131bd1af575d1f"
};

const app = initializeApp(firebaseConfig);
export default app;