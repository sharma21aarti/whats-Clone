import Chat from "./Chat";
import "./App.css";
import Sidebar from "./Sidebar";

function App() {
  return (
    <div className="App">
      <div className="app_body">
        <Sidebar />
        <Chat />
      </div>
    </div>
  );
}

export default App;
