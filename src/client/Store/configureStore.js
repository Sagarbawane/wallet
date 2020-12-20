import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import addFundReducer from "../Reducers/addFundReducer";

import profileReducer from "../Reducers/profileReducer";
import transferFundReducer from "../Reducers/transferFundReducer";
import userReducer from "../Reducers/userReducer";


const configureStore = () => {
  const store = createStore(
    combineReducers({
      user: userReducer,
      profile:profileReducer,
      addFund:addFundReducer,
      transferFund:transferFundReducer
      
    }),
    applyMiddleware(thunk)
  );
  return store;
};
export default configureStore;
