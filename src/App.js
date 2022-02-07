import React, { useState } from "react";
import Chat from "./Chat";
import "./App.css";
import Sidebar from "./Sidebar";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import LogIn from "./LogIn";
// import { useParams } from "react-router";
// import { Room } from "@material-ui/icons";

function App() {
  const [user, setUser] = useState();

  return (
    <div className="App">
      {!user ? (
        <LogIn />
      ) : (
        <div className="app_body">
          {/* <Sidebar />
        <Chat /> */}
          <Router>
            <Sidebar />
            <Routes>
              <Route path="/rooms/:roomId" element={<Chat />} />
            </Routes>
            <Routes>
              <Route path="/" element={<Chat />}></Route>
            </Routes>
          </Router>
        </div>
      )}
    </div>
  );
}

export default App;
