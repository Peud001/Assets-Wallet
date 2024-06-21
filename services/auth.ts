import { createUserWithEmailAndPassword, initializeAuth, signInWithEmailAndPassword, signOut, getReactNativePersistence} from "firebase/auth";
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
import { initializeApp } from "firebase/app";
import AsyncStorage from "@react-native-async-storage/async-storage";

const firebaseConfig = {
  apiKey: "AIzaSyDv0ldKZGBfyA4LoRkhXR4T25WJhiP8OVg",
  authDomain: "wallet-bd8fe.firebaseapp.com",
  projectId: "wallet-bd8fe",
  storageBucket: "wallet-bd8fe.appspot.com",
  messagingSenderId: "1016965412384",
  appId: "1:1016965412384:web:ca1e7241bd76d97ab96e45",
  measurementId: "G-E5KJ9ZZB6P"
};

const app = initializeApp(firebaseConfig);

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
    console.log(userCredentials)
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


