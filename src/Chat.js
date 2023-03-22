import {
  addDoc,
  collection,
  doc,
  onSnapshot,
  query,
  serverTimestamp,
} from "@firebase/firestore";
import { Avatar, IconButton } from "@material-ui/core";
import {
  AttachFile,
  InsertEmoticon,
  Mic,
  MoreVert,
  Search,
} from "@material-ui/icons";
import Picker from "emoji-picker-react";
import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./Chat.css";
import db from "./firebase";

import { useStateValue } from "./Reducer";

function Chat() {
  const [input, setInput] = useState("");
  const [profile, setProfile] = useState("");
  const { roomId } = useParams();
  const [pickerOpen, setPickerOpen] = useState(false);
  const [roomName, setRoomName] = useState();
  const [messages, setMessages] = useState([]);
  const rId = JSON.parse(localStorage.getItem("chat-id"));
  const { user } = useStateValue();
  const messageRef = useRef(null);
  const onEmojiClick = (event, emojiObject) => {
    setInput((prv) => prv + emojiObject.emoji);
  };

  const scrollToBottom = () => {
    messageRef?.current?.scrollIntoView({ behavior: "smooth" });
  };
  const navigate = useNavigate();

  const id =
    user.uid > rId?.id
      ? `${rId?.id + " " + user?.uid}`
      : `${user?.uid + " " + rId?.id}`;

  useEffect(() => {
    scrollToBottom();
    if (!user) {
      navigate("/");
    }
  }, [messages]);

  useEffect(() => {
    onSnapshot(query(collection(db, "messages", id, "chat")), (snapshot) => {
      setMessages(
        snapshot.docs.map((doc) => {
          const docData = doc.data();
          return { docId: doc.id, ...docData };
        })
      );
    });

    setProfile(Math.floor(Math.random() * 5000));

    setRoomName(rId?.name);
  }, [id]);

  const sendMessage = async (e) => {
    e.preventDefault();
    await addDoc(collection(db, "messages", id, "chat"), {
      text: input,
      name: user.displayName,
      timestamp: serverTimestamp(),
      sender: user?.uid,
      receiver: rId,
    });

    setInput("");
  };

  // const deleteMsg = (id) => {
  //   const roomColl = collection(db, "rooms");
  //   const roomdoc = doc(roomColl, roomId);
  //   const messageColl = collection(roomdoc, "messages");

  //   const messageDoc = doc(messageColl, id);
  // };

  return (
    <>
      {rId?.id ? (
        <div className="chat">
          <div className="chatHeader">
            <Avatar
              src={`https://avatars.dicebear.com/api/adventurer/:${profile}.svg`}
              // src={`${user.photoURL}`}
            />

            <div className="chatHEader_Info">
              <h3>{roomName} </h3>
              <p>
                {rId.isOnline ? (
                  "Online"
                ) : (
                  <>
                    {" "}
                    Last Seen{" "}
                    {new Date(
                      messages[messages.length - 1]?.timestamp?.seconds * 1000
                    ).toLocaleString()}
                  </>
                )}
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
          <div
            className={`${pickerOpen ? "chatBody pickerSpace" : "chatBody"}`}
          >
            <div className="" style={{ padding: "30px" }}>
              {messages && messages?.length > 0 ? (
                messages
                  .sort((a, b) => (a.timestamp > b.timestamp ? 1 : -1))
                  .map((msg, i) => {
                    return (
                      <p
                        key={i}
                        className={`chat_message ${
                          msg?.name === user.displayName && "chat_reciever"
                        }`}
                      >
                        <span className="chat_name"> {msg?.name} </span>
                        {msg?.text}
                        <span className="chat_timespan">
                          {new Date(
                            msg?.timestamp?.seconds * 1000
                          ).toLocaleString()}
                        </span>
                        {/* {user.email === msg.email ? (
                        <IconButton onClick={() => deleteMsg(msg.docId)}>
                          <Delete />
                        </IconButton>
                      ) : null} */}
                      </p>
                    );
                  })
              ) : (
                <></>
              )}
            </div>

            <div ref={messageRef} />
          </div>
          {pickerOpen ? (
            <div
              className="emoji-picker"
              style={{ position: "absolute", top: "45%" }}
            >
              <Picker onEmojiClick={onEmojiClick} />
            </div>
          ) : (
            ""
          )}

          <div className="chatFooter">
            <InsertEmoticon onClick={() => setPickerOpen((prev) => !prev)} />

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
          <div
            className={`${pickerOpen ? "chatBody pickerSpace" : "chatBody"}`}
          >
            <div className="" style={{ padding: "30px" }}></div>

            <div ref={messageRef} />
          </div>
        </div>
      )}
    </>
  );
}

export default Chat;
