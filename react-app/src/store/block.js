const SET_BLOCKS = "block/SET_BLOCKS";

export const setBlocks = (blocks) => {
  return {
    type: SET_BLOCKS,
    blocks,
  };
};

const initialState = {};

const blockReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_BLOCKS:
      return {
        ...state,
        ...action.blocks,
      };
    default:
      return state;
  }
};

export default blockReducer;
