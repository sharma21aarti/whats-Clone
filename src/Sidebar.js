import { doc, query, where, getDocs } from "@firebase/firestore";
import { Avatar, IconButton } from "@material-ui/core";
import {
  // Chat,
  DonutLarge,
  MoreVert,
  Search,
  Unsubscribe,
} from "@material-ui/icons";

import { collection, onSnapshot, getDoc, updateDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { auth } from "./firebase";
import db from "./firebase";
import Modal from "./Modal";
import { useStateValue } from "./Reducer";
import "./Sidebar.css";
import SidebarChats from "./SidebarChats";
import Chat from "./Chat";
import { Link, useNavigate } from "react-router-dom";

export const UserContext = React.createContext();

function Sidebar() {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [openMenu, setOpenMenu] = useState(false);
  const [showMenu, setMenu] = useState(false);
  const user = useStateValue();
  const token = localStorage.getItem("token");

  function show() {
    setMenu((prev) => !prev);
    if (showMenu) {
      document.getElementById("thing").style.display = "block";
    } else {
      document.getElementById("thing").style.display = "none";
    }
  }

  async function fetchSidebar() {
    const q = query(
      collection(db, "users"),
      where("id", "not-in", [user?.uid])
    );
    console.log(user?.uid, "q");

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
  console.log(showMenu);
  async function checkUser() {
    window.localStorage.removeItem("user");
    window.localStorage.removeItem("token");
    const updateUser = await doc(db, "users", user.uid);
    const data = {
      isOnline: false,
    };
    updateDoc(updateUser, data)
      .then((docRef) => {
        console.log("Value of an Existing Document Field has been updated");
      })
      .catch((error) => {
        console.log(error);
      });

    navigate("/login");
  }

  useEffect(() => {
    fetchSidebar();
  }, []);

  const selectUser = (users) => {
    localStorage.setItem("chat-id", JSON.stringify(users));
  };
  return (
    <>
      <div className="sidebar">
        <div className="sidebar_header">
          <Avatar src={user.photoURL} />
          <div className="sidebar_headerRight">
            <Link to="/status">
              <IconButton>
                <DonutLarge />
              </IconButton>
            </Link>
            {/* <IconButton>
              <Chat />
            </IconButton> */}
            <div onClick={() => show()}>
              <IconButton>
                <MoreVert />
              </IconButton>
            </div>
          </div>
          <div className="menu" id="thing">
            <ul className="">
              <li>
                <button> New Group</button>
              </li>
              <li>
                <button> New Community </button>
              </li>
              <li>
                <button>Stared message</button>
              </li>
              <li>
                {" "}
                <button>Settings</button>
              </li>
              <li>
                {" "}
                <button onClick={() => setOpenMenu((prev) => !prev)}>
                  Log out
                </button>
              </li>
            </ul>
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
                key={user}
                id={user.data.id}
                name={user.data.name}
                users={user.data}
                selectUser={selectUser}
              />
              // <SidebarChats key={i + 1} name={room.Name} />
            );
          })}
        </div>
        {openMenu && (
          <Modal openModal={openMenu} setModel={setOpenMenu}>
            <div className="modalMenu">
              <div className="logout-heading">
                <h3>Log Out</h3>
              </div>
              <div className="">
                <p>Are You Sure You Want to log out?</p>
              </div>
              <div
                className="btn"
                style={{ position: "absolute", right: "0%", bottom: "0%" }}
              >
                <button
                  className="btn-cancle"
                  onClick={(prev) => setOpenMenu((prev) => !prev)}
                >
                  CANCLE
                </button>
                <button className="btn-logout" onClick={() => checkUser()}>
                  LOGOUT
                </button>
              </div>
            </div>
          </Modal>
        )}
      </div>
    </>
  );
}

export default Sidebar;
