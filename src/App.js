import React, { useEffect, useState } from "react";
import Chat from "./Chat";
import "./App.css";
import Sidebar from "./Sidebar";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";
import LogIn from "./LogIn";
import { useStateValue } from "./Reducer";
import Status from "./Status";
import ChatArea from "./ChatArea";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import db from "./firebase";
// import { useParams } from "react-router";
// import { Room } from "@material-ui/icons";

function App() {
  console.log("in app");
  const navigate = useNavigate();
  const user = useStateValue();
  const token = localStorage.getItem("token");

  async function checkUser() {
    const userDoc = await doc(db, "users", user?.uid);
    const userSnap = await getDoc(userDoc);
    console.log("here");
    if (userSnap?.data()?.token !== token) {
      window.localStorage.removeItem("user");
      window.localStorage.removeItem("token");
      const updateUser = await doc(db, "users", user.uid);
      const data = {
        isOnline: false,
      };
      updateDoc(updateUser, data)
        .then((docRef) => {
          console.log("Value of an Existing Document Field has been updated");
        })
        .catch((error) => {
          console.log(error);
        });
      navigate("/login");
    }
  }
  useEffect(() => {
    checkUser();
  }, [navigate, token]);

  return (
    <div className="App">
      {console.log("user", user)}
      {!user ? (
        <Routes>
          <Route path="/login" element={<LogIn />}></Route>
        </Routes>
      ) : (
        <div className="app_body">
          {/* <Sidebar /> */}

          <Routes>
            <Route exact path="/chat-area" element={<ChatArea />} />
            <Route path="/chat-area/:roomId" element={<ChatArea />}></Route>
            <Route exact path="status" element={<Status />} />
          </Routes>
        </div>
      )}
    </div>
  );
}

export default App;
