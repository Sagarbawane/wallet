const intialState = [];

const transferFundReducer = (state = intialState, action) => {
  switch (action.type) {
    
    case "TRANSFER_FUND": {
      return state.concat(action.payload);
    }
    

    default: {
      return [].concat(state);
    }
  }

};
export default transferFundReducer ;