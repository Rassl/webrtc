import { useState, useEffect } from "react";
import io from "socket.io-client";

const socket = io("http://127.0.0.1:5000");

export const SocketHandler = ({ handleMessage }) => {
  const [transcription, setTranscription] = useState("");
  const [error, setError] = useState("");

  console.log("init");

  useEffect(() => {
    socket.on("connect", () => {
      console.log("Connected to server");
    });

    socket.on("transcription", (data) => {
      console.log("here", data);
      handleMessage(data.transcription)
      setTranscription(data.transcription);
    });

    socket.on("error", (data) => {
      console.log("error");
      setError(data.error);
    });

    return () => {
      socket.off("transcription");
      socket.off("error");
    };
  }, []);

  return (
    <div>
      {transcription && (
        <div>
          <h2>Transcription</h2>
          <p>{transcription}</p>
        </div>
      )}
      {error && (
        <div>
          <h2>Error</h2>
          <p>{error}</p>
        </div>
      )}
    </div>
  );
};
