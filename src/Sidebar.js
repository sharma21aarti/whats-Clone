import { Avatar, IconButton } from "@material-ui/core";
import { Chat, DonutLarge, MoreVert, Search } from "@material-ui/icons";
import React, { useState, useEffect } from "react";
import "./Sidebar.css";
import SidebarChats from "./SidebarChats";
import db from "./firebase";
import { collection, getDocs } from "firebase/firestore/lite";
function Sidebar() {
  console.log("first");
  const [rooms, setRooms] = useState([]);
  const [newRoomId, setNewRoomId] = useState("");
  const newRoomHandler = (roomId) => {
    setNewRoomId(roomId);
  };
  useEffect(() => {
    console.log("callewd");
    async function getRooms(db) {
      const roomCol = collection(db, "rooms");

      const roomSnapshot = await getDocs(roomCol);
      const roomList = roomSnapshot.docs.map((doc) => ({
        id: doc.id,
        data: doc.data(),
      }));
      console.log(roomList);
      setRooms(roomList);
    }
    // getDocs(collection(db, "rooms")).onSnaopshot((snapshot) =>
    //   setRooms(
    //     snapshot.docs.map((doc) => ({
    //       id: doc.id,
    //       data: doc.data(),
    //     }))
    //   )
    // );

    getRooms(db);

    // const a = getDocs(collection(db, "rooms"));
    // setRooms(a.docs);
  }, [newRoomId]);

  // console.log("sss", rooms);
  return (
    <div className="sidebar">
      <div className="sidebar_header">
        <Avatar />
        <div className="sidebar_headerRight">
          <IconButton>
            <DonutLarge />
          </IconButton>
          <IconButton>
            <Chat />
          </IconButton>
          <IconButton>
            <MoreVert />
          </IconButton>
        </div>
      </div>
      <div className="sidebar_search">
        <div className="sidebar_searchContainer">
          <Search />
          <input placeholder="Search or Start the new chats" type="text" />
        </div>
      </div>
      <div className="sidebar_chats">
        <SidebarChats addNewChat newRoomHandler={newRoomHandler} />
        {rooms.map((room) => {
          // const name = room.data();
          // console.log("okkaaa", name);
          return (
            <SidebarChats key={room.id} id={room.id} name={room.data.Name} />
            // <SidebarChats key={i + 1} name={room.Name} />
          );
        })}
      </div>
    </div>
  );
}

export default Sidebar;
