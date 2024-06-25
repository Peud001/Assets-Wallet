import { createUserWithEmailAndPassword, initializeAuth, signInWithEmailAndPassword, signOut, getReactNativePersistence} from "firebase/auth";
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
import { initializeApp } from "firebase/app";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: process.env.EXPO_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.EXPO_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.EXPO_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.EXPO_PUBLIC_FIREBASE_MEASUREMENT_ID
}

const app = initializeApp(firebaseConfig)
export const firebaseDb = getFirestore(app)
export const firebaseStorage = getStorage(app)

const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});

export default auth;

type SignInType = {
  email: string;
  password: string;
};

type SignUpType = {
  firstName: string
  lastName: string
  email: string
  password: string
}

export const SignIn = async ({ email, password }: SignInType) => {
  try {
    const userCredentials = await signInWithEmailAndPassword(auth, email, password);
    const userData =await AsyncStorage.getItem('user')
    return userCredentials.user;
  } catch (error) {
    return error;
  }
};

export const SignUp = async ({ firstName, lastName, email, password }: SignUpType) => {
  try {
    const userCredentials = await createUserWithEmailAndPassword(auth, email, password);
    await AsyncStorage.setItem('user', JSON.stringify({firstName, lastName}))
    return userCredentials.user;
  } catch (error) {
    return error;
  }
};

export const SignOut = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    return error;
  }
};


