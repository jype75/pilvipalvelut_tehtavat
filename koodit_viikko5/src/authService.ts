import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  type User,
  type UserCredential
} from "firebase/auth";

import firebaseConfig from "../firebaseConfig";
import { initializeApp } from "firebase/app";

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

/**
* Kirjautuminen
*/
export const loginWithEmail = async (
  email: string,
  password: string
): Promise<User> => {
  const result: UserCredential = await signInWithEmailAndPassword(
    auth,
    email,
    password
  );
  return result.user;
};

/**
* Rekisteröinti (ei pakollinen)
*/
export const registerWithEmail = async (
  email: string,
  password: string
): Promise<User> => {
  const result: UserCredential = await createUserWithEmailAndPassword(
    auth,
    email,
    password
  );
  return result.user;
};

/**
* Logout
*/
export const logout = async (): Promise<void> => {
  await signOut(auth);
};


