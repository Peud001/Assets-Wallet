import { User, onAuthStateChanged } from "firebase/auth";
import { ReactNode, createContext, useState } from "react";
import { auth } from "../app/_layout";



const authContext = createContext<{user: User|null}>({
    user : null
})

const AuthProvider = ({children}: {children : ReactNode}) => {

    const [user, setUser] = useState<User|null>(null)

    onAuthStateChanged(auth, (user) => {
        if(user){
            setUser(user)
        }else{
            setUser(null)
        }
    })

    return(
        <authContext.Provider value={{user}}>{children}</authContext.Provider>
    )
}
export default AuthProvider