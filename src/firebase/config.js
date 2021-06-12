import firebase from 'firebase'
import 'firebase/auth'
import 'firebase/firestore'
import 'firebase/storage'

const firebaseConfig = {
    apiKey: "AIzaSyCTD2qS9aoHcIh9LHeap25PlK-89kL7Gdc",
    authDomain: "olx-clone-84da1.firebaseapp.com",
    projectId: "olx-clone-84da1",
    storageBucket: "olx-clone-84da1.appspot.com",
    messagingSenderId: "73604274978",
    appId: "1:73604274978:web:e1bc3c9773aaf546c9637b",
    measurementId: "G-2CWXY0WCLY"
  };


  export default firebase.initializeApp(firebaseConfig)