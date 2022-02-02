import { Avatar, IconButton } from "@material-ui/core";
import React, { useState, useEffect } from "react";
import "./Chat.css";
import {
  AttachFile,
  InsertEmoticon,
  Mic,
  MoreVert,
  Search,
} from "@material-ui/icons";

function Chat() {
  const [profile, setProfile] = useState("");

  useEffect(() => {
    setProfile(Math.floor(Math.random() * 5000));
  }, []);
  return (
    <div className="chat">
      <div className="chatHeader">
        <Avatar
          src={`https://avatars.dicebear.com/api/adventurer/:${profile}.svg`}
        />

        <div className="chatHEader_Info">
          <h3>Person Name</h3>
          <p>Last Seen at...</p>
        </div>
        <div className="chat_headerRight">
          <IconButton>
            <Search />
          </IconButton>
          <IconButton>
            <AttachFile />
          </IconButton>
          <IconButton>
            <MoreVert />
          </IconButton>
        </div>
      </div>
      <div className="chatBody">
        <p className={`chat_message ${true && "chat_reciever"}`}>
          <span className="chat_name"> Aarti Sharma</span>
          hey guys
          <span className="chat_timespan">5:05pm</span>
        </p>
      </div>
      <div className="chatFooter">
        <InsertEmoticon />
        <form>
          <input placeholder="Type a message" type="text" />
          <button>Send a message</button>
        </form>
        <Mic />
      </div>
    </div>
  );
}

export default Chat;
