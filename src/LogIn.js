import React from "react";
import { Button } from "@material-ui/core";
import "./LogIn.css";
import { signInWithPopup } from "@firebase/auth";
import { provider, auth } from "./firebase";
import { actionTypes, useStateValue } from "./Reducer";
import db from "./firebase";
import {
  collection,
  doc,
  getDoc,
  onSnapshot,
  query,
  setDoc,
} from "firebase/firestore";
import { useNavigate } from "react-router-dom";
function LogIn() {
  // const { user  = useStateValue();
  const navigate = useNavigate();
  console.log("dsfd ");
  const signIn = () => {
    async function addCollection(result) {
      window.localStorage.setItem("user", JSON.stringify(result.user));

      const newUser = await doc(db, "users", result.user.uid);
      await setDoc(newUser, {
        id: result.user.uid,
        name: result.user.displayName,
        isOnline: true,
        token: result.user.stsTokenManager.accessToken,
      });
      const userDoc = await doc(db, "users", result.user.uid);
      const userSnap = await getDoc(userDoc);
      localStorage.setItem("token", userSnap.data()?.token);
      navigate("/chat-area");
    }

    signInWithPopup(auth, provider)
      .then((result) => {
        addCollection(result);
      })
      .catch((error) => {
        alert(error.message);
      });
  };
  return (
    <div className="login">
      <div className="login_container">
        <img
          src="https://logos-download.com/wp-content/uploads/2016/03/WhatsApp_Icon.png"
          alt=""
        />
        <div className="login_text">
          <h1>Sign In to WhatsApp</h1>
        </div>
        <Button onClick={signIn}>Sign In with Google</Button>
      </div>
    </div>
  );
}

export default LogIn;
