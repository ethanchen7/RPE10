const LOAD_ROOMS = "room/LOAD_ROOMS";
const LOAD_ALL_USERS = "room/LOAD_ALL_USERS";

export const loadRooms = (rooms) => {
  return {
    type: LOAD_ROOMS,
    rooms,
  };
};

export const loadAllUsers = (users) => {
  return {
    type: LOAD_ALL_USERS,
    users,
  };
};

export const getRooms = () => async (dispatch) => {
  const response = await fetch(`/api/users/rooms`);
  if (response.ok) {
    const user = await response.json();
    dispatch(loadRooms(user.rooms));
  }
};

export const getAllUsers = () => async (dispatch) => {
  const response = await fetch(`/api/users/`);
  if (response.ok) {
    const users = await response.json();
    dispatch(loadAllUsers(users.users));
  }
};

const initialState = { rooms: {}, users: [] };

const roomReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_ROOMS:
      return {
        ...state,
        rooms: {
          ...action.rooms,
        },
      };
    case LOAD_ALL_USERS:
      return {
        ...state,
        users: [...action.users],
      };
    default:
      return state;
  }
};

export default roomReducer;
