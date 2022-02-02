import { Avatar } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import "./SidebarChats.css";

function SidebarChats({ addNewChat }) {
  const [profile, setProfile] = useState("");

  useEffect(() => {
    setProfile(Math.floor(Math.random() * 5000));
  }, []);

  const createChat = () => {
    const PersonName = prompt("Hey! Enter your Name For Chat");

    if (PersonName) {
      //do after some time
    }
  };

  return !addNewChat ? (
    <div className="sidebarChats">
      <Avatar
        src={`https://avatars.dicebear.com/api/adventurer/:${profile}.svg`}
      />
      <div className="sidebarChats_Info">
        <h2>Person Name</h2>
        <p>Last Chat ....</p>
      </div>
    </div>
  ) : (
    <div onClick={createChat} className="sidebarChats">
      <h2>Add New Chat</h2>
    </div>
  );
}

export default SidebarChats;
