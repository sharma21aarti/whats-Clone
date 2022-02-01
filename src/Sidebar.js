import { Avatar, IconButton } from "@material-ui/core";
import { Chat, DonutLarge, MoreVert, Search } from "@material-ui/icons";
import React from "react";
import "./Sidebar.css";
import SidebarChats from "./SidebarChats";

function Sidebar() {
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
        <SidebarChats />
      </div>
    </div>
  );
}

export default Sidebar;
