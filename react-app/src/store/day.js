const SET_DAYS = "day/SET_DAYS";
const CREATE_DAY = "day/CREATE_DAY";
const DELETE_DAY = "day/DELETE_DAY";
const UPDATE_DAY = "day/UPDATE_DAY";

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
    if (data.errors) {
      return data.errors;
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
    default:
      return state;
  }
};

export default dayReducer;
