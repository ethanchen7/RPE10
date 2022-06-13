import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getRoomChats, addChat } from "../../../../store/chat";

import { io } from "socket.io-client";

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
  const allUsers = useSelector((state) => state.room.users);

  // const [messages, setMessages] = useState([]);
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
    dispatch(getRoomChats(selectedRoom));
  }, [selectedRoom]);

  if (!chatArr || !chatArr.length) {
    return null;
  }
  return (
    <>
      <div>
        {chatArr.map((chat, ind) => (
          <div key={ind}>{`${chat.user_id}: ${chat.message}`}</div>
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
