const SET_BLOCKS = "block/SET_BLOCKS";
const CREATE_BLOCK = "block/CREATE_BLOCK";
const EDIT_BLOCK = "block/EDIT_BLOCK";

export const setBlocks = (blocks) => {
  return {
    type: SET_BLOCKS,
    blocks,
  };
};

export const createBlock = (block) => {
  return {
    type: CREATE_BLOCK,
    block,
  };
};

export const editBlock = (block) => {
  return {
    type: EDIT_BLOCK,
    block,
  };
};

export const addBlock = (userId, payload) => async (dispatch) => {
  const response = await fetch(`/api/users/${userId}/block`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });
  if (response.ok) {
    const data = await response.json();
    dispatch(createBlock(data));
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

export const putBlock = (blockId, payload) => async (dispatch) => {
  const response = await fetch(`/api/block/${blockId}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (response.ok) {
    const data = await response.json();
    dispatch(editBlock(data));
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

const blockReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_BLOCKS:
      return {
        ...state,
        ...action.blocks,
      };
    case CREATE_BLOCK:
      return {
        ...state,
        [action.block.id]: action.block,
      };
    case EDIT_BLOCK:
      return {
        ...state,
        [action.block.id]: action.block,
      };
    default:
      return state;
  }
};

export default blockReducer;
