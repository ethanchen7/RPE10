import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getRoomChats } from "../../../../store/chat";

import { io } from "socket.io-client";

let socket;

const ChatRoom = ({ selectedRoom }) => {
  const dispatch = useDispatch();

  const rooms = useSelector((state) => state.room.rooms);
  const chats = useSelector((state) => state.chat);
  const user = useSelector((state) => state.session.user);
  const allUsers = useSelector((state) => state.room.users);

  const [messages, setMessages] = useState([]);
  const [chatInput, setChatInput] = useState("");

  useEffect(() => {
    socket = io();
    socket.on("chat", (chat) => {
      setMessages((messages) => [...messages, chat]);
    });

    return () => {
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
    setChatInput("");
  };

  useEffect(() => {
    dispatch(getRoomChats(selectedRoom));
  }, [selectedRoom]);

  if (!chats || !chats.length) {
    return null;
  }
  return (
    <>
      <div>
        {chats.map((message, ind) => (
          <div key={ind}>{`${message.user}: ${message.msg}`}</div>
        ))}
      </div>
      <form onSubmit={sendChat}>
        <input value={chatInput} onChange={updateChatInput} />
        <button type="submit">Send</button>
      </form>
    </>
  );
};

export default ChatRoom;
