import {createContext} from 'react'
import firebase from '../firebase/config'

export const FirebaseContext=createContext()


export const FireBaseProvider=({children})=>{

    return (
    <FirebaseContext.Provider value={
        {
          firebase
        }
    }>
        {children}
    </FirebaseContext.Provider>
    )
}