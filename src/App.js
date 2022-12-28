import React, { useState } from "react";
import Chat from "./Chat";
import "./App.css";
import Sidebar from "./Sidebar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LogIn from "./LogIn";
import { useStateValue } from "./Reducer";
// import { useParams } from "react-router";
// import { Room } from "@material-ui/icons";

function App() {
  const [{ user }, dispatch] = useStateValue();
  console.log(user, "user");
  const [rId, setRId] = useState("");
  return (
    <div className="App">
      {!user ? (
        <LogIn />
      ) : (
        <div className="app_body">
          <Router>
            <Sidebar setRId={setRId} />
            <Routes>
              <Route path="rooms" element={<Sidebar />}></Route>
              <Route path="/users/:roomId" element={<Chat rId={rId} />} />
            </Routes>
            {/* <Routes>
              <Route path="/" element={<Chat />}></Route>
            </Routes> */}
          </Router>
        </div>
      )}
    </div>
  );
}

export default App;
