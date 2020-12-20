const initialState = [];

const profileReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_PROFILE": {
      return state.concat(action.payload);
    }

    case  "REMOVE_PROFILE": {
      return state.filter((ele) => ele._id !== action.payload);
    }
    case "EDIT_PROFILE": {
        return state.map((ele) => {
          if (ele._id === action.payload._id) {
            return Object.assign({}, ele, action.payload);
          } else {
            return Object.assign({}, ele);
          }
        });
      }
    default: {
      return [].concat(state);
    }
  }
};

export default profileReducer ;