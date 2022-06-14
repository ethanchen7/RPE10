import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import SideBar from "../SideBar";
import { getRooms, getAllUsers } from "../../../store/room";
import ChatRoom from "./ChatRoom";
import "./index.css";

const Chat = () => {
  const user = useSelector((state) => state.session.user);
  const allUserObject = useSelector((state) => state.room.allUsers);
  const allRooms = useSelector((state) => state.room.rooms);
  const rooms = Object.values(allRooms);
  const dispatch = useDispatch();

  const [selectedRoom, setSelectedRoom] = useState(1);

  useEffect(() => {
    dispatch(getRooms());
    dispatch(getAllUsers());
    setSelectedRoom(1);
  }, []);

  if (!rooms || !allUserObject) {
    return null;
  }

  return (
    <div>
      <SideBar />
      <div className="chat-container">
        <div className="direct-messages-container">
          <h1>Messages</h1>
          {/* Search Box Component */}
          <div className="person-search-container">
            <input placeholder="Search for someone" />
          </div>
          {rooms?.map((room) => (
            <div
              className="room-person-container"
              key={`room-${room.id}`}
              onClick={() => setSelectedRoom(room.id)}
            >
              <div className="room-person-icon">
                <h3>
                  {room.friend_id === user.id
                    ? `${allUserObject[room.user_id]?.first_name
                        .charAt(0)
                        .toUpperCase()}${allUserObject[room.user_id]?.last_name
                        .charAt(0)
                        .toUpperCase()}`
                    : `${allUserObject[room.friend_id]?.first_name
                        .charAt(0)
                        .toUpperCase()}${allUserObject[
                        room.friend_id
                      ]?.last_name
                        .charAt(0)
                        .toUpperCase()}`}
                </h3>
              </div>
              <p>
                {room.friend_id === user.id
                  ? `${allUserObject[room.user_id].first_name} ${
                      allUserObject[room.user_id].last_name
                    }`
                  : `${allUserObject[room.friend_id]?.first_name} ${
                      allUserObject[room.friend_id]?.last_name
                    }`}
              </p>
            </div>
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
