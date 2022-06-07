const SET_DAYS = "block/SET_DAYS";

export const setDays = (days) => {
  return {
    type: SET_DAYS,
    days,
  };
};

const initialState = {};

const dayReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_DAYS:
      return {
        ...state,
        ...action.days,
      };
    default:
      return state;
  }
};

export default dayReducer;
