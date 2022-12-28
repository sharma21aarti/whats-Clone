import { addDoc, collection, doc, onSnapshot } from "@firebase/firestore";
import { Avatar } from "@material-ui/core";
// import { user } from "firebase-functions/v1/auth";
import { orderBy, query, where } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useStateValue } from "./Reducer";
import { Link } from "react-router-dom";
import db from "./firebase";
import "./SidebarChats.css";
// import { collection, addDoc } from "firebase/firestore/lite";
// import { CompareArrowsOutlined } from "@material-ui/icons";

function SidebarChats({ id, name, users, selectUser }) {
  const [profile, setProfile] = useState("");
  const [lastMsg, setLastMsg] = useState();
  const [{ user }, dispatch] = useStateValue();
  const id1 =
    user.uid > id ? `${id + " " + user.uid}` : `${user.uid + " " + id}`;

  async function getSidebarData(id) {
    console.log(id, id1, "id");
    const collRef = collection(db, "messages");

    onSnapshot(query(collection(db, "messages", id1, "chat")), (snapshot) => {
      setLastMsg(
        snapshot.docs.map((doc) => {
          console.log(doc.data(), "doc");
          const docData = doc.data();
          return { docId: doc.id, ...docData };
        })
      );
    });
  }
  console.log(
    lastMsg?.sort((a, b) => (a.timestamp > b.timestamp ? 1 : -1))[
      lastMsg.length - 1
    ]?.text,
    "last"
  );
  useEffect(() => {
    getSidebarData(id);
    setProfile(Math.floor(Math.random() * 5000));
  }, [id]);

  return (
    <Link to={`users/${id}`}>
      <div className="sidebarChats" onClick={() => selectUser(users)}>
        <Avatar
          src={`https://avatars.dicebear.com/api/adventurer/:${profile}.svg`}
        />
        <div className="sidebarChats_Info">
          <h2>{name}</h2>
          <p>
            {
              lastMsg?.sort((a, b) => (a.timestamp > b.timestamp ? 1 : -1))[
                lastMsg.length - 1
              ]?.text
            }
          </p>
        </div>
      </div>
    </Link>
  );
}

export default SidebarChats;
