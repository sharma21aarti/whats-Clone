import React, { useEffect, useState } from "react";
import {
  getDoc,
  doc,
  collection,
  getDocs,
  addDoc,
} from "@firebase/firestore/lite";
import _ from "lodash";
import { Avatar, IconButton } from "@material-ui/core";
import {
  AttachFile,
  InsertEmoticon,
  Mic,
  MoreVert,
  Search,
} from "@material-ui/icons";
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
  const [message, setMessage] = useState([]);
  const [{ user }, dispatch] = useStateValue();

  console.log("params", roomId);

  async function getRoom(db) {
    console.log("Id", roomId);
    // if (roomId) {
    const roomColl = doc(db, "rooms", roomId);
    const roomdoc = await getDoc(roomColl);

    console.log("room data", roomdoc.data());
    setRoomName(roomdoc.data().Name);

    // const data = collection(db, "rooms");
    // const docData = doc(data, roomId);
    // const messageData = _.orderBy(
    //   collection(docData, "message"),
    //   "timestamp",
    //   "asc"
    // );
    const subcallref = collection(db, "rooms", roomId, "message");
    console.log("subcallref", subcallref);

    const a = await getDocs(subcallref);

    console.log("line 55", a);
    const chatData = [];
    const docData = a["_doc"];
    console.log("docData", docData);
    docData.map((item) => {
      console.log("itemmmmm", item.data());
      // setMessage([...message, item.data()]);
    });
    // }
    // const messageColl = collection(roomColl, "message").orderBy(
    //   "timespan",
    //   "asc"
    // );
    // setMessage(messageColl.data());
  }
  const getChatData = (roomId) => {
    //require unique roomID as an argument
    //pass args to firebase and get data to chats
    //verify data from database
    // set to a local state
    // return
  };

  useEffect(() => {
    getRoom(db);
    setProfile(Math.floor(Math.random() * 5000));
    // getChatData(roomId);
  }, [roomId]);

  const sendMessage = (e) => {
    e.preventDefault();
    console.log("input", input);

    const roomColl = collection(db, "rooms", roomId);
    // const subcallref = collection(roomColl, "message");
    addDoc(collection(roomColl, "message"), {
      message: input,
      name: user.displayName,
    });
    console.log("message", message);
    setMessage([...message]);
    setInput("");
  };

  return (
    <div className="chat">
      {console.log(message)}
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
        {message.map((message, i) => (
          <p key={i} className={`chat_message ${true && "chat_reciever"}`}>
            <span className="chat_name"> {message.name} </span>
            {message.message}
            <span className="chat_timespan">
              {new Date(message.timestamp?.toDate()).toUTCString()}
            </span>
          </p>
        ))}
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
