import { createUserWithEmailAndPassword, initializeAuth, signInWithEmailAndPassword, signOut } from "firebase/auth"
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
import { initializeApp } from "firebase/app";


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
export const auth = initializeAuth(app, { persistence: getReactNativePersistence(ReactNativeAsyncStorage) });


type AuthType = {
    email: string
    password: string
}

export const signin =  async({email, password}: AuthType) => {
    try{
        const userCredentials = await signInWithEmailAndPassword(auth, email, password)
        return userCredentials.user
    }catch(error){
        return error
    }
}

export const register = async({email, password}: AuthType) => {
    try{
        const userCredentials = await createUserWithEmailAndPassword(auth, email, password)
        return userCredentials.user
    }catch(error){
        return error
    }
}

export const signout = async () => {
    await signOut(auth)
}

function getReactNativePersistence(ReactNativeAsyncStorage: any): import("@firebase/auth").Persistence | import("@firebase/auth").Persistence[] | undefined {
    throw new Error("Function not implemented.");
}
