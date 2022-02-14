import {
  addDoc,
  collection,
  doc,
  onSnapshot,
  orderBy,
  query,
} from "@firebase/firestore";
import { Avatar, IconButton } from "@material-ui/core";
import {
  AttachFile,
  InsertEmoticon,
  Mic,
  MoreVert,
  Search,
} from "@material-ui/icons";
import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import "./Chat.css";
import db from "./firebase";
import { useStateValue } from "./Reducer";
// import { user } from "firebase-functions/v1/auth";

function Chat() {
  const [input, setInput] = useState("");
  const [profile, setProfile] = useState("");
  const { roomId } = useParams();
  const [roomName, setRoomName] = useState();
  const [messages, setMessages] = useState([]);
  const [{ user }, dispatch] = useStateValue();
  const messageRef = useRef(null);

  console.log("params", roomId);
  const scrollToBottom = () => {
    messageRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();

    const roomColl = doc(db, "rooms", roomId);

    onSnapshot(roomColl, (snap) => setRoomName(snap.data().Name));

    onSnapshot(
      query(collection(roomColl, "messages"), orderBy("timestamp", "asc")),
      (snapshot) => {
        setMessages(snapshot.docs.map((doc) => doc.data()));
      }
    );

    setProfile(Math.floor(Math.random() * 5000));
    if (messageRef) {
      scrollToBottom();
    }
  }, [roomId]);

  const sendMessage = (e) => {
    e.preventDefault();
    console.log("tou typed >>>", input);
    const roomColl = collection(db, "rooms");
    const roomdoc = doc(roomColl, roomId);
    // const subcallref = collection(roomColl, "messages");
    addDoc(collection(roomdoc, "messages"), {
      message: input,
      name: user.displayName,
      timestamp: new Date().getTime(),
    });

    setInput("");
  };

  // const getChatData = (roomId) => {
  //   //require unique roomID as an argument
  //   //pass args to firebase and get data to chats
  //   //verify data from database
  //   // set to a local state
  //   // return
  // };

  return (
    <>
      {messages.length > 0 ? (
        <div className="chat">
          <div className="chatHeader">
            <Avatar
              src={`https://avatars.dicebear.com/api/adventurer/:${profile}.svg`}
            />

            <div className="chatHEader_Info">
              <h3>{roomName} </h3>
              <p>
                Last Seen{" "}
                {new Date(
                  messages[messages.length - 1].timestamp
                ).toLocaleString()}{" "}
              </p>
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
          <div className="chatBody" ref={messageRef}>
            {messages.map((msg, i) => {
              return (
                <p
                  key={i}
                  className={`chat_message ${
                    msg.name === user.displayName && "chat_reciever"
                  }`}
                >
                  <span className="chat_name"> {msg.name} </span>
                  {msg.message}
                  <span className="chat_timespan">
                    {new Date(msg.timestamp).toLocaleString()}
                  </span>
                </p>
              );
            })}
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
      ) : (
        <div className="chat">
          <div className="chatHeader">
            <Avatar
              src={`https://avatars.dicebear.com/api/adventurer/:${profile}.svg`}
            />

            <div className="chatHEader_Info">
              <h3>{roomName} </h3>
              <p>Last Seen </p>
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
          <div className="chatBody" ref={messageRef}>
            {messages.map((msg, i) => {
              return (
                <p
                  key={i}
                  className={`chat_message ${
                    msg.name === user.displayName && "chat_reciever"
                  }`}
                >
                  <span className="chat_name"> {msg.name} </span>
                  {msg.message}
                  <span className="chat_timespan">
                    {new Date(msg.timestamp).toLocaleString()}
                  </span>
                </p>
              );
            })}
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
      )}
    </>
  );
}

export default Chat;
