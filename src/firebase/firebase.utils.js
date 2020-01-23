import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const config = {
  apiKey: "AIzaSyDhGRFUlkG5dliS9ZOYuLw2jwj11LZ5UNA",
  authDomain: "princekart-26e6f.firebaseapp.com",
  databaseURL: "https://princekart-26e6f.firebaseio.com",
  projectId: "princekart-26e6f",
  storageBucket: "princekart-26e6f.appspot.com",
  messagingSenderId: "189412987929",
  appId: "1:189412987929:web:6c64169e77ff0e139e0688",
  measurementId: "G-H03MZW16Z7"
};
firebase.initializeApp(config);

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      });
    } catch (error) {
      console.log("error creating user", error.message);
    }
  }

  return userRef;
};

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
