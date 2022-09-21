import { useSockets } from "../context/socket.context";
import RoomsComponent from "../components/Rooms";
import MessagesComponent from "../components/Messages";
import { useRef, useEffect } from "react";
import "../styles/homeComponent.scss";
import "../styles/messagesComponent.scss";
import "../styles/roomComponent.scss";
import "../styles/globals.scss";
import title from "../image-assets/aloha-nobackground.png";

export default function Home() {
  const { socket, username, setUsername } = useSockets();
  const usernameRef = useRef(null);

  function handleSetUsername() {
    const value = usernameRef.current.value;
    if (!value) {
      return;
    }

    setUsername(value);

    localStorage.setItem("username", value);
  }

  // * Storing username for returning users

  useEffect(() => {
    if (usernameRef)
      usernameRef.current.value = localStorage.getItem("username") || "";
  }, []);

  return (
    <div className="home">
      {!username && (
        <div className="usernameWrapper">
          <div className="usernameInner fade-in">
            <img className="title" src={title} alt="title" />
            <input placeholder="enter your username" ref={usernameRef} />
            <button className="button-all" onClick={handleSetUsername}>
              Start
            </button>
          </div>
        </div>
      )}
      {username && (
        <div className="usernameContainer">
          <RoomsComponent />
          <MessagesComponent />
        </div>
      )}
    </div>
  );
}
