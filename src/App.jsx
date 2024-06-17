
import { useState } from 'react';
import './App.css'
import { joinRoom } from "trystero";
const trysteroConfig = { appId: "thurn-und-taxis" };

const roomId = 'rasuls-room'

function App() {
  const room = joinRoom(trysteroConfig, roomId);

   const [sendColor, getColor] = room.makeAction("color");
   const [sendTranscription, getTranscription] = room.makeAction("transcrib");
   const [myColor, setMyColor] = useState("#c0ffee");
   const [peerColors, setPeerColors] = useState({});
   const [myMessages, setMyMessages] = useState([])
   const [peerMessages, setPeerMessages] = useState([])

   // whenever a new peer joins, send my color to them
   room.onPeerJoin((peer) => sendColor(myColor, peer));

   getColor((color, peer) => setPeerColors((peerColors) => ({ ...peerColors, [peer]: color })));

   getTranscription((transcription, peer) =>
     setPeerMessages((peerMessages) => {
       console.log(peer);
       return [...peerMessages, transcription];
     })
   );

   const updateColor = (e) => {
     const { value } = e.target;

     setMyColor(value);
     // when updating my own color, broadcast it to all peers
     sendColor(value);
   };

  return (
    <>
      <ul>
        {peerMessages.map((message) => (
          <li key={message}>{message}</li>
        ))}
      </ul>
    </>
  );
}

export default App
