
import { useState } from 'react';
import './App.css'
import { joinRoom } from "trystero";
const trysteroConfig = { appId: "thurn-und-taxis" };

const roomId = 'rasuls-room'

function App() {
  const room = joinRoom(trysteroConfig, roomId);

   const [sendColor, getColor] = room.makeAction("color");
   const [myColor, setMyColor] = useState("#c0ffee");
   const [peerColors, setPeerColors] = useState({});

   // whenever a new peer joins, send my color to them
   room.onPeerJoin((peer) => sendColor(myColor, peer));

   getColor((color, peer) => setPeerColors((peerColors) => ({ ...peerColors, [peer]: color })));

   const updateColor = (e) => {
     const { value } = e.target;

     setMyColor(value);
     // when updating my own color, broadcast it to all peers
     sendColor(value);
   };

  return (
    <>
      {/* <div id="debridgeWidget" /> */}
      <h1>Trystero + React</h1>

      <h2>My color:</h2>
      <input type="color" value={myColor} onChange={updateColor} />

      <h2>Peer colors:</h2>
      <ul>
        {Object.entries(peerColors).map(([peerId, color]) => (
          <li key={peerId} style={{ backgroundColor: color }}>
            {peerId}: {color}
          </li>
        ))}
      </ul>
    </>
  );
}

export default App
