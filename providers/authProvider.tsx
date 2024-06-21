import { User, onAuthStateChanged } from "firebase/auth";
import { ReactNode, createContext, useState } from "react";
import { router } from "expo-router";
import auth from "@/services/auth";



const AuthContext = createContext<{user: User|null}>({
    user : null
})

const AuthProvider = ({children}: {children : ReactNode}) => {

    const [user, setUser] = useState<User|null>(null)
    console.log(user)

    onAuthStateChanged(auth, (user) => {
        if(user){
            setUser(user)
            router.push('/home')
        }else{
            setUser(null)
            router.push('/')
        }
    })

    return(
        <AuthContext.Provider value={{user}}>{children}</AuthContext.Provider>
    )
}
export default AuthProvider