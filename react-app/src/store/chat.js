const LOAD_CHATS = "chat/LOAD_CHATS";

export const loadChats = (chats) => {
  return {
    type: LOAD_CHATS,
    chats,
  };
};

export const getRoomChats = (roomId) => async (dispatch) => {
  const response = await fetch(`/api/room/${roomId}/chats`);
  if (response.ok) {
    const room = await response.json();
    dispatch(loadChats(room.chats));
  }
};

const initialState = {};

const chatReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_CHATS:
      return {
        ...state,
        ...action.chats,
      };
    default:
      return state;
  }
};

export default chatReducer;
