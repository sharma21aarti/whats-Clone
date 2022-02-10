import { Avatar } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./SidebarChats.css";
import db from "./firebase";
import { orderBy } from "firebase/firestore";
import {
  getDoc,
  doc,
  collection,
  getDocs,
  addDoc,
} from "@firebase/firestore/lite";
// import { collection, addDoc } from "firebase/firestore/lite";
// import { CompareArrowsOutlined } from "@material-ui/icons";

function SidebarChats({ id, name, addNewChat, newRoomHandler }) {
  const [profile, setProfile] = useState("");
  // const [messages, setMessages] = useState();

  // async function getSidebarData() {
  //   if (id) {
  //     const roomColl = collection(db, "rooms", id, "messages");
  //     roomColl.orderBy("timestamp", "desc");
  //   }
  // }

  useEffect(() => {
    // getSidebarData();
    setProfile(Math.floor(Math.random() * 5000));
  }, []);

  const createChat = () => {
    const PersonName = prompt("Hey! Enter your Name For Chat");

    if (PersonName) {
      //do after some time
      addDoc(collection(db, "rooms"), {
        Name: PersonName,
      });
      console.log("hello", newRoomHandler, typeof newRoomHandler);
      newRoomHandler(profile);
    }
  };

  return !addNewChat ? (
    <Link to={`rooms/${id}`}>
      <div className="sidebarChats">
        <Avatar
          src={`https://avatars.dicebear.com/api/adventurer/:${profile}.svg`}
        />
        <div className="sidebarChats_Info">
          <h2>{name}</h2>
          <p>Last Chat ....</p>
        </div>
      </div>
    </Link>
  ) : (
    <div onClick={createChat} className="sidebarChats">
      <h2>Add New Chat</h2>
    </div>
  );
}

export default SidebarChats;
