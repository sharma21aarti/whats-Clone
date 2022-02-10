import React, { useEffect, useState } from "react";
import { serverTimestamp } from "@firebase/firestore/lite";
import {
  getDoc,
  doc,
  collection,
  getDocs,
  addDoc,
} from "@firebase/firestore/lite";

import { orderBy } from "firebase/firestore";
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
    const subcallref = collection(roomColl, "messages");
    console.log("subcallref", subcallref);

    const a = await getDocs(subcallref);

    console.log(a);
    let chatData = [];
    const docData = a["_docs"];
    // // console.log(a._docs);
    docData.map((item) => {
      console.log("itemmmmm", item.data());
      chatData.push(item.data());
    });

    chatData.sort((a, b) => {
      return a.timestamp - b.timestamp;
    });
    setMessage(chatData);
    // }
    // const messageColl = collection(roomColl, "message").orderBy(
    //   "timespan",
    //   "asc"
    // );
    // setMessage(messageColl.data());
  }
  // useEffect(() => {
  //   const colRef = collection(db, "rooms");
  //   //real time update
  //   onSnapshot(colRef, (snapshot) => {
  //     snapshot.docs.forEach((doc) => {
  //       // setTestData((prev) => [...prev, doc.data()]);
  //       console.log("onsnapshot", doc.data());
  //     });
  //   });
  // }, []);
  useEffect(() => {
    getRoom(db);
    setProfile(Math.floor(Math.random() * 5000));
  }, [roomId]);

  const sendMessage = (e) => {
    e.preventDefault();
    console.log("input", input);

    const roomColl = doc(db, "rooms", roomId);
    // const subcallref = collection(roomColl, "messages");
    addDoc(collection(roomColl, "messages"), {
      message: input,
      name: user.displayName,
      timestamp: new Date().getTime(),
    });

    console.log("message", message);
    setMessage([
      ...message,
      {
        message: input,
        name: user.displayName,
        timestamp: new Date().getTime(),
      },
    ]);
    // console.log("somthingg new", [
    //   ...message,
    //   { message: input, name: user.displayName },
    // ]);
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
    <div className="chat">
      {console.log(message)}
      <div className="chatHeader">
        <Avatar
          src={`https://avatars.dicebear.com/api/adventurer/:${profile}.svg`}
        />

        <div className="chatHEader_Info">
          <h3>{roomName} </h3>
          <p>
            Last Seen{" "}
            {/* {new Date(message.timestamp[message.length]).toLocaleString()} */}
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
      <div className="chatBody">
        {message.map((msg, i) => {
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
  );
}

export default Chat;
