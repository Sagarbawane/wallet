const intialState = [];

const addFundReducer = (state = intialState, action) => {
  switch (action.type) {
    
    case "ADD_FUND": {
      return state.concat(action.payload);
    }
     default: {
      return [].concat(state);
    }
  }

};
export default addFundReducer ;