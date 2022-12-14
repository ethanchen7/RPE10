const prefix = "chat/";

const LOAD_CHATS = prefix + "LOAD_CHATS";
const CREATE_CHAT = prefix + "CREATE_CHAT";

export const loadChats = (chats) => {
  return {
    type: LOAD_CHATS,
    chats,
  };
};

export const createChat = (chat) => {
  return {
    type: CREATE_CHAT,
    chat,
  };
};

export const getRoomChats = (roomId) => async (dispatch) => {
  const response = await fetch(`/api/room/${roomId}/chats`);
  if (response.ok) {
    const room = await response.json();
    dispatch(loadChats(room.chats));
  }
};

export const addChat = (payload) => async (dispatch) => {
  const response = await fetch(`/api/chat/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });
  if (response.ok) {
    const data = await response.json();
    dispatch(createChat(data));
    return data;
  } else if (response.status < 500) {
    const data = await response.json();
    if (data.errors) {
      return data.errors;
    }
  } else {
    return "An error occurred. Please try again.";
  }
};

const initialState = {};

const chatReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_CHATS:
      const chatObjects = Object.values(action.chats);
      const chats = {};
      chatObjects.forEach((chat) => (chats[chat.id] = chat));
      return {
        ...chats,
      };
    case CREATE_CHAT:
      return {
        ...state,
        [action.chat.id]: action.chat,
      };
    default:
      return state;
  }
};

export default chatReducer;
