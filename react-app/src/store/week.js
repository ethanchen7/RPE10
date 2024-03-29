const prefix = "week/";

const SET_WEEKS = prefix + "SET_WEEKS";
const CREATE_WEEK = prefix + "CREATE_WEEK";
const DELETE_WEEK = prefix + "DELETE_WEEK";
const UPDATE_WEEK = prefix + "UPDATE_WEEK";
const REMOVE_ALL_WEEKS = prefix + "REMOVE_ALL_WEEKS";

export const setWeeks = (weeks) => {
  return {
    type: SET_WEEKS,
    weeks,
  };
};

export const createWeek = (week) => {
  return {
    type: CREATE_WEEK,
    week,
  };
};

export const deleteWeek = (weekId) => {
  return {
    type: DELETE_WEEK,
    weekId,
  };
};

export const updateWeek = (week) => {
  return {
    type: UPDATE_WEEK,
    week,
  };
};

export const removeAllWeeks = () => {
  return {
    type: REMOVE_ALL_WEEKS,
  };
};

export const addWeek = (blockId) => async (dispatch) => {
  const response = await fetch(`/api/block/${blockId}/weeks`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (response.ok) {
    const data = await response.json();
    dispatch(createWeek(data));
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

export const removeWeek = (weekId) => async (dispatch) => {
  const response = await fetch(`/api/week/${weekId}`, {
    method: "DELETE",
  });
  if (response.ok) {
    const data = await response.json();
    dispatch(deleteWeek(weekId));
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

export const editWeek = (payload, weekId) => async (dispatch) => {
  const response = await fetch(`/api/week/${weekId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });
  if (response.ok) {
    const data = await response.json();
    dispatch(updateWeek(data));
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

const weekReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_WEEKS:
      return {
        ...action.weeks,
      };
    case CREATE_WEEK:
      return {
        ...state,
        [action.week.id]: action.week,
      };
    case DELETE_WEEK:
      const newState = {
        ...state,
      };
      delete newState[action.weekId];
      return newState;
    case REMOVE_ALL_WEEKS:
      return {
        ...initialState,
      };
    default:
      return state;
  }
};

export default weekReducer;
