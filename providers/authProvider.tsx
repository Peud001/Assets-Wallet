import { User, onAuthStateChanged } from "firebase/auth";
import { ReactNode, createContext, useState, useEffect } from "react";
import { router } from "expo-router";
import auth from "@/services/auth";

type AuthContextType = {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>; 
};

export const AuthContext = createContext<AuthContextType>({
  user: null,
  setUser: () => {}, 
});

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        router.replace("(tabs)/home");
      } else {
        setUser(null);
        router.push("/");
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};
export default AuthProvider;
