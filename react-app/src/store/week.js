const SET_WEEKS = "week/SET_WEEKS";

export const setWeeks = (weeks) => {
  return {
    type: SET_WEEKS,
    weeks,
  };
};

const initialState = {};

const weekReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_WEEKS:
      return {
        ...state,
        ...action.weeks,
      };
    default:
      return state;
  }
};

export default weekReducer;
