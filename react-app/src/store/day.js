const prefix = "day/";

const SET_DAYS = prefix + "SET_DAYS";
const CREATE_DAY = prefix + "CREATE_DAY";
const DELETE_DAY = prefix + "DELETE_DAY";
const UPDATE_DAY = prefix + "UPDATE_DAY";
const REMOVE_ALL_DAYS = prefix + "REMOVE_ALL_DAYS";

export const setDays = (days) => {
  return {
    type: SET_DAYS,
    days,
  };
};

export const createDay = (day) => {
  return {
    type: CREATE_DAY,
    day,
  };
};

export const deleteDay = (day) => {
  return {
    type: DELETE_DAY,
    day,
  };
};

export const updateDay = (day) => {
  return {
    type: UPDATE_DAY,
    day,
  };
};

export const removeAllDays = () => {
  return {
    type: REMOVE_ALL_DAYS,
  };
};

export const addDay = (weekId) => async (dispatch) => {
  const body = { notes: "" };
  const response = await fetch(`/api/week/${weekId}/days`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
  if (response.ok) {
    const data = await response.json();
    dispatch(createDay(data));
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

export const removeDay = (dayId) => async (dispatch) => {
  const response = await fetch(`/api/day/${dayId}`, {
    method: "DELETE",
  });
  if (response.ok) {
    const data = await response.json();
    dispatch(deleteDay(data));
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

export const editDay = (dayId, payload) => async (dispatch) => {
  const response = await fetch(`/api/day/${dayId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });
  if (response.ok) {
    const data = await response.json();
    dispatch(updateDay(data));
    return data;
  } else if (response.status < 500) {
    const data = await response.json();
    if (data) {
      return data;
    }
  } else {
    return "An error occurred. Please try again.";
  }
};

const initialState = {};

const dayReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_DAYS:
      return {
        ...state,
        ...action.days,
      };
    case CREATE_DAY:
      return {
        ...state,
        [action.day.id]: action.day,
      };
    case DELETE_DAY:
      const newState = {
        ...state,
      };
      delete newState[action.day.id];
      return newState;
    case UPDATE_DAY:
      return {
        ...state,
        [action.day.id]: action.day,
      };
    case REMOVE_ALL_DAYS:
      return {
        ...initialState,
      };
    default:
      return state;
  }
};

export default dayReducer;
