import React from "react";
import { Button } from "@material-ui/core";
import "./LogIn.css";
import { signInWithPopup } from "@firebase/auth";
import { provider, auth } from "./firebase";
import { actionTypes, useStateValue } from "./Reducer";
// import { useStateValue } from "./StateProvider";
// import { error } from "firebase-functions/logger";

function LogIn() {
  console.log("logIn");
  const [{ user }, dispatch] = useStateValue();
  console.log("in login", user);
  const signIn = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        console.log("hello", result.user);
        console.log("SET_USER", actionTypes.SET_USER);
        dispatch({
          type: actionTypes.SET_USER,
          user: result.user,
        });
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
