const prefix = "block/";

const SET_BLOCKS = prefix + "SET_BLOCKS";
const CREATE_BLOCK = prefix + "CREATE_BLOCK";
const EDIT_BLOCK = prefix + "EDIT_BLOCK";
const DELETE_BLOCK = prefix + "DELETE_BLOCK";
const GET_CURRENT_BLOCK = prefix + "GET_CURRENT_BLOCK";
const REMOVE_ALL_BLOCKS = prefix + "REMOVE_ALL_BLOCKS";

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

export const deleteBlock = (blockId) => {
  return {
    type: DELETE_BLOCK,
    blockId,
  };
};

export const getCurrentBlock = (block) => {
  return {
    type: GET_CURRENT_BLOCK,
    block,
  };
};

export const removeAllBlocks = () => {
  return {
    type: REMOVE_ALL_BLOCKS,
  };
};

export const getBlock = (blockId) => async (dispatch) => {
  const response = await fetch(`/api/block/${blockId}`, {
    method: "GET",
  });
  if (response.ok) {
    const data = await response.json();
    dispatch(getCurrentBlock(data));
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
      return data;
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
      return data;
    }
  } else {
    return "An error occurred. Please try again.";
  }
};

export const removeBlock = (blockId) => async (dispatch) => {
  const response = await fetch(`/api/block/${blockId}`, {
    method: "DELETE",
  });
  if (response.ok) {
    const data = await response.json();
    dispatch(deleteBlock(blockId));
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
    case DELETE_BLOCK:
      const newState = {
        ...state,
      };
      delete newState[action.blockId];
      return newState;
    case REMOVE_ALL_BLOCKS:
      return { ...initialState };
    default:
      return state;
  }
};

export default blockReducer;
