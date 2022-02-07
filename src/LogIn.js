import React from "react";
import { Button } from "@material-ui/core";
import { auth, provider } from "./firebase";
import { signInWithPopup } from "@firebase/auth";
import "./LogIn.css";
// import { error } from "firebase-functions/logger";

function LogIn() {
  const signIn = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        console.log(result);
      })
      .catch((error) => alert(error.message));
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
