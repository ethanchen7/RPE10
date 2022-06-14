import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getRoomChats, addChat } from "../../../../store/chat";

import { io } from "socket.io-client";
import arrow from "../../../../assets/images/svgexport-26.svg";
import "./index.css";

let socket;

const ChatRoom = ({ selectedRoom }) => {
  const dispatch = useDispatch();

  const rooms = useSelector((state) => state.room.rooms);
  const chats = useSelector((state) => state.chat);
  const allChats = Object.values(chats);
  const chatArr = allChats.filter(
    (chat) => chat.room_id === parseInt(selectedRoom)
  );
  const user = useSelector((state) => state.session.user);
  const allUsers = useSelector((state) => state.room.allUsers);

  const [messages, setMessages] = useState([]);
  const [chatInput, setChatInput] = useState("");

  useEffect(() => {
    socket = io();
    socket.emit("join", { room: selectedRoom });
    socket.on("chat", (chat) => {
      // setMessages([...messages, chat]);
      dispatch(getRoomChats(selectedRoom));
    });

    return () => {
      socket.emit("leave", { room: selectedRoom });
      socket.disconnect();
    };
  }, []);

  const updateChatInput = (e) => {
    setChatInput(e.target.value);
  };

  const sendChat = (e) => {
    e.preventDefault();
    socket.emit("chat", {
      user: user.first_name,
      room: selectedRoom,
      msg: chatInput,
    });
    dispatch(
      addChat({
        room_id: selectedRoom,
        message: chatInput,
      })
    );
    setChatInput("");
  };

  useEffect(() => {
    console.log("this");
    dispatch(getRoomChats(selectedRoom));
  }, [selectedRoom]);
  console.log(chatArr);
  return (
    <>
      <div className="chats-messages-container">
        {chatArr.map((chat, ind) => (
          <div
            className="message-bubble"
            key={`${chat.message}-${chat.id}-${ind}`}
          >
            <div className="left-message-bubble-icon">
              <div>{`${allUsers[chat.user_id]?.first_name
                .charAt(0)
                .toUpperCase()}${allUsers[chat.user_id]?.last_name
                .charAt(0)
                .toUpperCase()}`}</div>
            </div>
            <div className="right-message-bubble-icon">
              <p>
                {`${allUsers[chat.user_id]?.first_name} ${
                  allUsers[chat.user_id]?.last_name
                }`}
                <span> {chat.created_at}</span>
              </p>
              <p>{chat.message}</p>
            </div>
          </div>
        ))}
        {/* {messages.map((message, ind) => (
          <div
            key={`${ind}-${message.msg}`}
          >{`${message.user}: ${message.msg}`}</div>
        ))} */}
      </div>
      <form className="chat-input-container" onSubmit={sendChat}>
        <input value={chatInput} onChange={updateChatInput} />
        <button type="submit">
          <img src={arrow} className="filter"></img>
        </button>
      </form>
    </>
  );
};

export default ChatRoom;
