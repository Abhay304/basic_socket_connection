import React, { useState, useEffect } from "react";
import socketIOClient from "socket.io-client";
const ENDPOINT = "http://127.0.0.1:4001";

function App() {
  const [response, setResponse] = useState(0);

  useEffect(() => {
    const socket = socketIOClient(ENDPOINT, { transports: ["websocket"] });
    socket.on("Booking Services", (data) => {
      console.log(data);
      setResponse(data);
    });
    // unmount will disconnect the connection
    return () => socket.disconnect();
  }, []);

  return (
    <>
      <p>Booking Count {response.bookingCount}</p>
    </>
  );
}

export default App;
