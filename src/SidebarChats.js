import {
  collection,
  addDoc,
  doc,
  getDocs,
  onSnapshot,
} from "@firebase/firestore";
import { Avatar } from "@material-ui/core";
import { query, orderBy } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import db from "./firebase";
import "./SidebarChats.css";
// import { collection, addDoc } from "firebase/firestore/lite";
// import { CompareArrowsOutlined } from "@material-ui/icons";

function SidebarChats({ id, name, addNewChat }) {
  const [profile, setProfile] = useState("");
  const [lastMsg, setLastMsg] = useState();

  async function getSidebarData(id) {
    console.log("called");

    let roomColl = doc(db, "rooms", id);
    console.log(roomColl);
    const collRef = collection(roomColl, "messages");

    console.log("dattttaaa", collRef);

    let a = [];
    await onSnapshot(query(collRef, orderBy("timestamp", "asc")), (snap) => {
      snap.docs.map((data) => {
        console.log("here it is", data.data().message);
        setLastMsg(data.data().message);
      });
    });

    console.log("a", a);
  }

  useEffect(() => {
    getSidebarData(id);
    setProfile(Math.floor(Math.random() * 5000));
  }, [id]);

  const createChat = () => {
    const PersonName = prompt("Hey! Enter your Name For Chat");

    if (PersonName) {
      // do after some time
      addDoc(collection(db, "rooms"), {
        Name: PersonName,
      });
      // console.log("hello", newRoomHandler, typeof newRoomHandler);
      // newRoomHandler(profile);
      // collection(db, "rooms").addDoc({
      //   name: PersonName,
      // });
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
          <p>{lastMsg}</p>
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
