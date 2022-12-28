import { doc, query, where, getDocs } from "@firebase/firestore";
import { Avatar, IconButton } from "@material-ui/core";
import {
  // Chat,
  DonutLarge,
  MoreVert,
  Search,
  Unsubscribe,
} from "@material-ui/icons";

import { collection, onSnapshot } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { auth } from "./firebase";
import db from "./firebase";

import { useStateValue } from "./Reducer";
import "./Sidebar.css";
import SidebarChats from "./SidebarChats";
import Chat from "./Chat";

export const UserContext = React.createContext();

function Sidebar({ setRId }) {
  const [users, setUsers] = useState([]);
  const [{ user }, dispatch] = useStateValue();

  async function fetchSidebar() {
    const q = query(
      collection(db, "users"),
      where("id", "not-in", [auth.currentUser.uid])
    );
    console.log(q, "q");

    //execute query
    const unsub = onSnapshot(q, (user) => {
      let users = [];
      user.forEach((doc) => {
        return users.push({ id: doc.id, data: doc.data() });
      });
      setUsers(users);
    });

    return () => unsub();
  }

  useEffect(() => {
    fetchSidebar();
  }, []);
  // console.log(users, "users");
  const selectUser = (users) => {
    setRId(users);
  };
  return (
    <>
      <div className="sidebar">
        <div className="sidebar_header">
          <Avatar src={user.photoURL} />
          <div className="sidebar_headerRight">
            <IconButton>
              <DonutLarge />
            </IconButton>
            {/* <IconButton>
              <Chat />
            </IconButton> */}
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
          {/* {rooms.map((room) => {
            return (
              <SidebarChats key={room.id} id={room.id} name={room.data.Name} />
              // <SidebarChats key={i + 1} name={room.Name} />
            );
          })} */}

          {users.map((user) => {
            return (
              <SidebarChats
                key={user.uid}
                id={user.data.id}
                name={user.data.name}
                users={user.data}
                selectUser={selectUser}
              />
              // <SidebarChats key={i + 1} name={room.Name} />
            );
          })}
        </div>
      </div>
    </>
  );
}

export default Sidebar;
