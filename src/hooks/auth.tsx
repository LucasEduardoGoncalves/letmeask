import { createContext, ReactNode, useState, useEffect, useContext, useCallback } from 'react';
import { auth, firebase } from '../services/firebase';

type User = {
    id: string;
    name: string;
    avatar: string;
}

type AuthContextType = {
    user: User | undefined;
    signInWithGoogle: () => Promise<void>;
    signOut: () => void;
}  

type AuthContextProviderProps = {
    children: ReactNode;
}

export const AuthContext = createContext({} as AuthContextType);

export function useAuth() {
    const value = useContext(AuthContext);
    return value;
}

export function AuthContextProvider(props: AuthContextProviderProps) {

    const [user, setUser] = useState<User>();

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            if(user) {
                const { displayName, photoURL, uid } = user

                if(!displayName || !photoURL) {
                    throw new Error('Missing information from Google Accont.');
                }

                setUser({
                    id: uid,
                    name: displayName,
                    avatar: photoURL,
                }) 
            }
        })
        return () => {
            unsubscribe();
        }
    },[]);

    const signOut = useCallback(async () => {
        await firebase.auth().signOut();
        setUser(undefined);
    },[])

    async function signInWithGoogle() {
        const provider = new firebase.auth.GoogleAuthProvider();

        const result = await auth.signInWithPopup(provider);

        if(result.user) {
            const { displayName, photoURL, uid } = result.user

            if(!displayName || !photoURL) {
            throw new Error('Missing information from Google Accont.');
            }

            setUser({
            id: uid,
            name: displayName,
            avatar: photoURL,
            })       
        };
    };
    
    return (
        <AuthContext.Provider value={{user, signInWithGoogle, signOut}}>
            {props.children}
        </AuthContext.Provider>
    )
} 