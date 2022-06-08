const SET_WEEKS = "week/SET_WEEKS";
const CREATE_WEEK = "week/CREATE_WEEK";

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

export const addWeek = (blockId) => async (dispatch) => {
  console.log(blockId);
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

const initialState = {};

const weekReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_WEEKS:
      return {
        ...state,
        ...action.weeks,
      };
    case CREATE_WEEK:
      return {
        ...state,
        [action.week.id]: action.week,
      };
    default:
      return state;
  }
};

export default weekReducer;
