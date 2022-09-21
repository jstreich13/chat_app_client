import { useRef } from "react";
import EVENTS from "../config/events";
import { useSockets } from "../context/socket.context";
import "../styles/roomComponent.scss";

function RoomsComponent() {
  const { socket, roomId, rooms } = useSockets();
  const newRoomRef = useRef(null);

  function handleCreateRoom() {
    //getting our room name
    const roomName = newRoomRef.current.value || "";

    if (!String(roomName).trim()) return;

    // emit created room event
    socket.emit(EVENTS.CLIENT.CREATE_ROOM, { roomName });

    // resetting room input to empty string
    newRoomRef.current.value = "";
  }

  function handleJoinRoom(key) {
    if (key === roomId) return;

    socket.emit(EVENTS.CLIENT.JOIN_ROOM, key);
  }

  return (
    <nav className="rooms_wrapper">
      <div className="createRoomWrapper">
        <input ref={newRoomRef} placeholder="Chat room name" />
        <button className="button-all" onClick={handleCreateRoom}>
          CREATE NEW ROOM 🚀
        </button>
      </div>

      <div className="roomList">
        {Object.keys(rooms).map((key) => {
          return (
            <div key={key}>
              <button
                className="button-all"
                disabled={key === roomId}
                title={`Enter ${rooms[key].name}`}
                onClick={() => handleJoinRoom(key)}
              >
                {rooms[key].name}
              </button>
            </div>
          );
        })}
      </div>
    </nav>
  );
}

export default RoomsComponent;
