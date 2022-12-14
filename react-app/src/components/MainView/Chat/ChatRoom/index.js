import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getRoomChats, addChat } from "../../../../store/chat";

import { io } from "socket.io-client";
import "./index.css";

let socket;

const ChatRoom = ({ selectedRoom }) => {
  const dispatch = useDispatch();

  const chats = useSelector((state) => state.chat);
  const chatArr = Object.values(chats);

  const user = useSelector((state) => state.session.user);
  const allUsers = useSelector((state) => state.room.allUsers);

  const [chatInput, setChatInput] = useState("");

  useEffect(() => {
    socket = io();
    socket.emit("join", { room: selectedRoom });
    socket.on("chat", (chat) => {
      dispatch(getRoomChats(selectedRoom));
    });

    return () => {
      socket.emit("leave", { room: selectedRoom });
      socket.disconnect();
    };
  }, [selectedRoom, dispatch]);

  const updateChatInput = (e) => {
    setChatInput(e.target.value);
  };

  const sendChat = (e) => {
    e.preventDefault();
    let timestamp = "";
    const newTime = new Date();
    const datestamp = newTime.toLocaleDateString();
    const time = newTime.toLocaleTimeString().split(" ");
    const hourMin = time[0].split(":");
    timestamp +=
      datestamp +
      " at " +
      hourMin[0] +
      ":" +
      hourMin[1] +
      time[1].toLowerCase();
    socket.emit("chat", {
      user: user,
      room: selectedRoom,
      msg: chatInput,
      created_at: timestamp,
    });
    dispatch(
      addChat({
        room_id: selectedRoom,
        message: chatInput,
        created_at: timestamp,
      })
    );
    setChatInput("");
  };

  const scroll = () => {
    const chatContainer = document.querySelector(".chats-messages-container");
    if (chatContainer) {
      chatContainer.scrollTop = chatContainer.scrollHeight;
    }
  };

  useEffect(() => {
    dispatch(getRoomChats(selectedRoom));
    scroll();
  }, [selectedRoom]);

  return (
    <>
      <div className="chats-messages-container">
        {chatArr.map((chat, ind) => (
          <div
            className="message-bubble right"
            key={`${chat.message}-${chat.id}-${ind}`}
          >
            <div
              className={`left-message-bubble-icon ${
                chat.user_id === user.id ? "self" : ""
              }`}
            >
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
      </div>
      <form
        className={`chat-input-container${
          selectedRoom === 0 ? " disabled" : ""
        }`}
        onSubmit={sendChat}
      >
        <input value={chatInput} onChange={updateChatInput} />
        <button
          type="submit"
          className={`${selectedRoom === 0 ? " disabled" : ""}`}
        >
          <i className="fa-regular fa-paper-plane fa-2xl"></i>
        </button>
      </form>
    </>
  );
};

export default ChatRoom;
