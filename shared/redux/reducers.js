import { combineReducers } from "redux";
import { LOGIN_USER, LOGOUT_USER } from "./actions";

const initialState = {
  isLogged: false,
  userId: 0,
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_USER:
      return { ...state, userId: action.payload, isLogged: true };
    case LOGOUT_USER:
      return { ...state, userId: 0, isLogged: false };
    default:
      return state;
  }
};

const allReducer = combineReducers({
  userReducer: userReducer,
});

export default allReducer;
