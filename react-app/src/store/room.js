const LOAD_ROOMS = "room/LOAD_ROOMS";
const LOAD_ALL_USERS = "room/LOAD_ALL_USERS";
const CREATE_ROOM = "room/CREATE_ROOM";

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

export const createRoom = (room) => {
  return {
    type: CREATE_ROOM,
    room,
  };
};

export const getRooms = () => async (dispatch) => {
  const response = await fetch(`/api/users/rooms`);
  if (response.ok) {
    const user = await response.json();
    console.log(user);
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

export const addRoom = (payload) => async (dispatch) => {
  const response = await fetch("/api/room/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });
  if (response.ok) {
    const data = await response.json();
    dispatch(createRoom(data));
    return data;
  } else if (response.status < 500) {
    const data = await response.json();
    if (data.errors) {
      return data;
    }
  } else {
    return "An error occurred. Please try again.";
  }
};

const initialState = { rooms: {}, users: [], allUsers: {} };

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
      const userObject = {};
      action.users.forEach((user) => (userObject[user.id] = user));
      return {
        ...state,
        users: [...action.users],
        allUsers: {
          ...userObject,
        },
      };
    case CREATE_ROOM:
      return {
        ...state,
        rooms: {
          ...state.rooms,
          [action.room.id]: action.room,
        },
      };
    default:
      return state;
  }
};

export default roomReducer;
