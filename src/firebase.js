// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// import Firebase from "firebase/database";
// const firebaseConfig = {
//   apiKey: "AIzaSyCy1icN1TsOfWXxwxGY6mVhR-lMJAXZJLQ",
//   authDomain: "whats-app-clone-eb7b5.firebaseapp.com",
//   projectId: "whats-app-clone-eb7b5",
//   storageBucket: "whats-app-clone-eb7b5.appspot.com",
//   messagingSenderId: "960410942394",
//   appId: "1:960410942394:web:3f865e815e759c75ed3b83",
//   measurementId: "G-8GQZZNFQ25",
// };

// const firebaseApp = Firebase.initializeApp(firebaseConfig);
// const db = firebaseApp.firestore();
// const auth = firebase.auth();
// const provider = new firebase.auth.GoogleAuthProvider();

// export { auth, provider };
// export default db;

import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore/lite";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
// import { firestore } from "firebase-functions/v1";
const firebaseConfig = {
  apiKey: "AIzaSyCy1icN1TsOfWXxwxGY6mVhR-lMJAXZJLQ",
  authDomain: "whats-app-clone-eb7b5.firebaseapp.com",
  projectId: "whats-app-clone-eb7b5",
  storageBucket: "whats-app-clone-eb7b5.appspot.com",
  messagingSenderId: "960410942394",
  appId: "1:960410942394:web:3f865e815e759c75ed3b83",
  measurementId: "G-8GQZZNFQ25",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth();
const provider = new GoogleAuthProvider();

export { auth, provider };
export default db;

// const subcallref = collection(roomColl, "message");
// console.log("subcallref", subcallref);

// const a = await getDocs(subcallref);

// console.log(a);
// // // console.log(a._docs);
// a._docs.map((item) => {
//   console.log("itemmmmm", item.data());
//   setMessage([...message, item.data()]);
// });
