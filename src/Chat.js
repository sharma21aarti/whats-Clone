import { getDoc, doc, snapshotEqual } from "@firebase/firestore/lite";
import { Avatar, IconButton } from "@material-ui/core";
import {
  AttachFile,
  InsertEmoticon,
  Mic,
  MoreVert,
  Search,
} from "@material-ui/icons";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./Chat.css";
import db from "./firebase";

function Chat() {
  const [input, setInput] = useState("");
  const [profile, setProfile] = useState("");
  const { roomId } = useParams();
  const [roomName, setRoomName] = useState();
  console.log("params", roomId);

  async function getRoom(db) {
    console.log("Id", roomId);

    const roomColl = doc(db, "rooms", roomId);
    const roomdoc = await getDoc(roomColl);

    console.log("room data", roomdoc.data());
    setRoomName(roomdoc.data().Name);
  }

  useEffect(() => {
    getRoom(db);
    setProfile(Math.floor(Math.random() * 5000));
  }, [roomId]);

  const sendMessage = (e) => {
    e.preventDefault();
    console.log("first", input);
    setInput("");
  };

  return (
    <div className="chat">
      <div className="chatHeader">
        <Avatar
          src={`https://avatars.dicebear.com/api/adventurer/:${profile}.svg`}
        />

        <div className="chatHEader_Info">
          <h3>{roomName} </h3>
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
          <input
            placeholder="Type a message"
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <button onClick={sendMessage} type="submit">
            Send a message
          </button>
        </form>
        <Mic />
      </div>
    </div>
  );
}

export default Chat;
