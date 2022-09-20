import { useEffect, useRef } from "react";
import EVENTS from "../config/events";
import { useSockets } from "../context/socket.context";
import "../styles/messagesComponent.scss";

function MessagesComponent() {
  const { socket, messages, roomId, username, setMessages } = useSockets();
  const newMessageRef = useRef(null);
  const messageEndRef = useRef(null);

  function handleSendMessage() {
    const message = newMessageRef.current.value;

    if (!String(message).trim()) {
      return;
    }

    socket.emit(EVENTS.CLIENT.SEND_ROOM_MESSAGE, { roomId, message, username });

    const date = new Date();

    setMessages([
      ...messages,
      {
        username: "You",
        message,
        time: `${date.getHours()}:${date.getMinutes()}`,
      },
    ]);

    newMessageRef.current.value = "";
  }

  //* Scrolling to end of window when receive new message
  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  if (!roomId) {
    return <div />;
  }
  return (
    <>
      <div className="wrapper">
        <div className="messageList">
          {messages.map(({ message, username, time }, index) => {
            return (
              <div key={index} className="message">
                <div key={index} className="messageInner">
                  <span className="messageBody, message" />
                  <span className="messageSender">
                    {username} - {time}
                  </span>
                </div>
              </div>
            );
          })}
          <div ref={messageEndRef} />
        </div>
        <div className="messageBox">
          <textarea rows={1} placeholder="Say hello 👋" ref={newMessageRef} />
          <button className="button-all" onClick={handleSendMessage}>
            SEND
          </button>
        </div>
      </div>
    </>
  );
}

export default MessagesComponent;
