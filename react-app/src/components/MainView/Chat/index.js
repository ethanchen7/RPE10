import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import SideBar from "../SideBar";
import { getRooms, getAllUsers } from "../../../store/room";
import "./index.css";
// import the socket
import { io } from "socket.io-client";

// outside of your component, initialize the socket variable
let socket;
const Chat = () => {
  const user = useSelector((state) => state.session.user);
  const allUsers = useSelector((state) => state.room.users);
  const allRooms = useSelector((state) => state.room.rooms);
  const rooms = Object.values(allRooms);
  const dispatch = useDispatch();
  const [messages, setMessages] = useState([]);
  // use state for controlled form input
  const [chatInput, setChatInput] = useState("");

  useEffect(() => {
    dispatch(getRooms());
    dispatch(getAllUsers());
  }, []);

  useEffect(() => {
    // create websocket
    socket = io();

    // listen for chat events
    socket.on("chat", (chat) => {
      // when we recieve a chat, add it into our messages array in state
      setMessages((messages) => [...messages, chat]);
    });

    // when component unmounts, disconnect
    return () => {
      socket.disconnect();
    };
  }, []);

  const updateChatInput = (e) => {
    setChatInput(e.target.value);
  };

  const sendChat = (e) => {
    e.preventDefault();
    // emit a message
    socket.emit("chat", { user: user.first_name, room: "1", msg: chatInput });
    // clear the input field after the message is sent
    setChatInput("");
  };

  // additional code to be added
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
            <div>{`room with ${room.friend_id}`}</div>
          ))}
        </div>
        <div className="chat-box-container">
          <div>
            {messages.map((message, ind) => (
              <div key={ind}>{`${message.user}: ${message.msg}`}</div>
            ))}
          </div>
          <form onSubmit={sendChat}>
            <input value={chatInput} onChange={updateChatInput} />
            <button type="submit">Send</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Chat;
