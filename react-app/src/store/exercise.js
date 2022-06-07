const SET_EXERCISES = "block/SET_EXERCISES";

export const setExercises = (exercises) => {
  return {
    type: SET_EXERCISES,
    exercises,
  };
};

const initialState = {};

const exerciseReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_EXERCISES:
      return {
        ...state,
        ...action.exercises,
      };
    default:
      return state;
  }
};

export default exerciseReducer;
