const SET_DAYS = "day/SET_DAYS";
const CREATE_DAY = "day/CREATE_DAY";

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

// export const addDay = (weekId) async(dispatch=> {
//   const res = await fetch(`/api/week/${weekId}/days`, {
//     method: "POST",
//     headers: {'Content-Type': 'application/json'}
//   })
// }

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
    default:
      return state;
  }
};

export default dayReducer;
