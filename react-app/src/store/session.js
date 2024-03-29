import { removeAllBlocks } from "./block";
import { removeAllWeeks } from "./week";
import { removeAllDays } from "./day";
import { removeAllExercises } from "./exercise";

const prefix = "session/";

const SET_USER = prefix + "session/SET_USER";
const REMOVE_USER = prefix + "session/REMOVE_USER";
const EDIT_USER = prefix + "session/EDIT_USER";

const setUser = (user) => ({
  type: SET_USER,
  payload: user,
});

const removeUser = () => ({
  type: REMOVE_USER,
});

const editUser = (user) => {
  return {
    type: EDIT_USER,
    user,
  };
};

const initialState = { user: null };

export const authenticate = () => async (dispatch) => {
  const response = await fetch("/api/auth/", {
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (response.ok) {
    const data = await response.json();
    if (data.errors) {
      return;
    }

    dispatch(setUser(data));
  }
};

export const login = (email, password) => async (dispatch) => {
  const response = await fetch("/api/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
      password,
    }),
  });

  if (response.ok) {
    const data = await response.json();
    dispatch(setUser(data));
    return null;
  } else if (response.status < 500) {
    const data = await response.json();
    if (data.errors) {
      return data.errors;
    }
  } else {
    return ["An error occurred. Please try again."];
  }
};

export const logout = () => async (dispatch) => {
  const response = await fetch("/api/auth/logout", {
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (response.ok) {
    dispatch(removeUser());
    dispatch(removeAllBlocks());
    dispatch(removeAllWeeks());
    dispatch(removeAllDays());
    dispatch(removeAllExercises());
  }
};

export const signUp =
  (firstName, lastName, email, password) => async (dispatch) => {
    const response = await fetch("/api/auth/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        first_name: firstName,
        last_name: lastName,
        email,
        password,
      }),
    });

    if (response.ok) {
      const data = await response.json();
      dispatch(setUser(data));
      return data;
    } else if (response.status < 500) {
      const data = await response.json();
      if (data.errors) {
        return data;
      }
    } else {
      return ["An error occurred. Please try again."];
    }
  };

export const editName = (payload) => async (dispatch) => {
  const response = await fetch(`/api/users/${payload.userId}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      first_name: payload.first_name,
      last_name: payload.last_name,
    }),
  });
  if (response.ok) {
    const data = await response.json();
    dispatch(editUser(data));
    return data;
  } else if (response.status < 500) {
    const data = await response.json();
    if (data.errors) {
      return data;
    }
  } else {
    return ["An error occurred. Please try again."];
  }
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case SET_USER:
      return { user: action.payload };
    case REMOVE_USER:
      return { user: null };
    case EDIT_USER:
      return {
        ...state,
        user: {
          ...state.user,
          first_name: action.user.first_name,
          last_name: action.user.last_name,
        },
      };
    default:
      return state;
  }
}
