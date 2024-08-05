
import { useState } from 'react';
import './App.css'
import { joinRoom } from "trystero";
import { SocketHandler } from './SocketWrapper';
import { Transcriber } from './Transcriber';
const trysteroConfig = { appId: "thurn-und-taxis" };

const roomId = 'rasuls-room'

function App() {
  const room = joinRoom(trysteroConfig, roomId);

   const [sendTranscription, getTranscription] = room.makeAction("transcrib");
   const [myMessages, setMyMessages] = useState([])
   const [peerMessages, setPeerMessages] = useState([])

   const handleMessage = (message) => {
    const newMessages = [...myMessages, message];
    sendTranscription(message)
    setMyMessages(newMessages);
   }


   // whenever a new peer joins, send my color to them

   getTranscription((transcription, peer) =>
     setPeerMessages((peerMessages) => {
       console.log(peer);
       return peerMessages;
     })
   );


  return (
    <>
      <SocketHandler handleMessage={handleMessage} />
      <Transcriber onMessageUpdate={handleMessage} />
      {/* <ul>
        {peerMessages.map((message) => (
          <li key={message}>{message}</li>
        ))}
      </ul> */}
      <p>{peerMessages}</p>
    </>
  );
}

export default App
