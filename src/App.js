import "./App.css";
import { useState } from "react";
import Client from "./Client";

function App() {
  const [disconnected, setDisconnect] = useState(false);
  const handleDisconnect = () => {
    setDisconnect(true);
  };
  return (
    <div className="App">
      {disconnected ? <p>booking service Disconnected</p> : <Client />}
      <button onClick={handleDisconnect}>Disconnect</button>
    </div>
  );
}

export default App;
