import React from "react";
import { Button } from "@material-ui/core";
import "./LogIn.css";
import { signInWithPopup } from "@firebase/auth";
import { provider, auth } from "./firebase";
import { actionTypes, useStateValue } from "./Reducer";
import db from "./firebase";
import { doc, setDoc } from "firebase/firestore";
function LogIn() {
  const [{ user }, dispatch] = useStateValue();

  const signIn = () => {
    async function addCollection(result) {
      dispatch({
        type: actionTypes.SET_USER,
        user: result.user,
      });

      const newUser = await doc(db, "users", result.user.uid);
      await setDoc(newUser, {
        id: result.user.uid,
        name: result.user.displayName,
      });
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
