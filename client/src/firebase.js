import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
	// apiKey: process.env.FIREBASE_KEY,
	apiKey: "AIzaSyAe8kRS0Jhoc2A9h_h845xhrZd6ngAX10k",
	authDomain: "dima-tube.firebaseapp.com",
	projectId: "dima-tube",
	storageBucket: "dima-tube.appspot.com",
	messagingSenderId: "831386683441",
	appId: "1:831386683441:web:4236d246f73ac6b0ce2d10",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const provider = new GoogleAuthProvider();

export default app;