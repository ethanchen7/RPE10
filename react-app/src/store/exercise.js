const prefix = "exercise/";

const SET_EXERCISES = prefix + "SET_EXERCISES";
const CREATE_EXERCISE = prefix + "CREATE_EXERCISE";
const UPDATE_EXERCISE = prefix + "UPDATE_EXERCISE";
const DELETE_EXERCISE = prefix + "DELETE_EXERCISE";
const REMOVE_ALL_EXERCISES = prefix + "REMOVE_ALL_EXERCISES";

export const setExercises = (exercises) => {
  return {
    type: SET_EXERCISES,
    exercises,
  };
};

export const createExercise = (exercise) => {
  return {
    type: CREATE_EXERCISE,
    exercise,
  };
};

export const updateExercise = (exercise) => {
  return {
    type: UPDATE_EXERCISE,
    exercise,
  };
};

export const deleteExercise = (exercise) => {
  return {
    type: DELETE_EXERCISE,
    exercise,
  };
};

export const removeAllExercises = () => {
  return {
    type: REMOVE_ALL_EXERCISES,
  };
};

export const addExercise = (dayId) => async (dispatch) => {
  const response = await fetch(`/api/day/${dayId}/exercises`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: "",
      weight: 0,
      sets: 0,
      reps: 0,
      rpe: 0,
    }),
  });
  if (response.ok) {
    const exercise = await response.json();
    dispatch(createExercise(exercise));
  }
};

export const putExercise = (exerciseId, payload) => async (dispatch) => {
  const response = await fetch(`/api/exercise/${exerciseId}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (response.ok) {
    const data = await response.json();
    dispatch(updateExercise(data));
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

export const removeExercise = (exerciseId) => async (dispatch) => {
  const response = await fetch(`/api/exercise/${exerciseId}`, {
    method: "DELETE",
  });
  if (response.ok) {
    const data = await response.json();
    dispatch(deleteExercise(data));
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

const exerciseReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_EXERCISES:
      return {
        ...state,
        ...action.exercises,
      };
    case CREATE_EXERCISE:
      return {
        ...state,
        [action.exercise.id]: action.exercise,
      };
    case UPDATE_EXERCISE:
      return {
        ...state,
        [action.exercise.id]: action.exercise,
      };
    case DELETE_EXERCISE:
      const newState = {
        ...state,
      };
      delete newState[action.exercise.id];
      return newState;
    case REMOVE_ALL_EXERCISES:
      return {
        ...initialState,
      };
    default:
      return state;
  }
};

export default exerciseReducer;
