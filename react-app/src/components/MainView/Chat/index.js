import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import SideBar from "../SideBar";
import { getRooms, getAllUsers } from "../../../store/room";
import ChatRoom from "./ChatRoom";
import "./index.css";

const Chat = () => {
  const allRooms = useSelector((state) => state.room.rooms);
  const rooms = Object.values(allRooms);
  const dispatch = useDispatch();

  const [selectedRoom, setSelectedRoom] = useState(1);

  useEffect(() => {
    dispatch(getRooms());
    dispatch(getAllUsers());
    setSelectedRoom(1);
  }, []);

  return (
    <div>
      <SideBar />
      <div className="chat-container">
        <div className="direct-messages-container">
          <h1>Messages</h1>
          {/* Search Box Component */}
          <div>
            <input placeholder="Search for someone" />
          </div>
          {rooms.map((room) => (
            <div
              key={`room-${room.id}`}
              onClick={() => setSelectedRoom(room.id)}
            >{`room with ${room.friend_id}`}</div>
          ))}
        </div>
        <div className="chat-box-container">
          <ChatRoom selectedRoom={selectedRoom} />
        </div>
      </div>
    </div>
  );
};

export default Chat;
