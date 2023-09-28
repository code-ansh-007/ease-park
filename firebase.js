import { initializeApp } from "firebase/app";
import {
  addDoc,
  getDocs,
  getFirestore,
  query,
  where,
  collection,
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// db
export const db = getFirestore(app);

// ? after google login this user will be created in firebase

export const createUserInFirestore = async (user) => {
  try {
    // first check if the user already exists in the database if not then proceed further with user creation

    // const q = query(collection(db, "users"), where("userId", "==", user.id));
    // const userSnap = await getDocs(q);
    // if (!userSnap.empty) {
    //   return;
    // }

    await addDoc(collection(db, "users"), {
      userId: user.id,
      method: "oauth",
      name: user.name,
      email: user.email,
      image: user.image,
    });
  } catch (error) {
    console.error("Error creating the user in firestore: ", error);
  }
};
