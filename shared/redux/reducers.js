import { combineReducers } from "redux";
import {
  LOGIN_USER,
  LOGOUT_USER,
  GET_API,
  UPDATE_APPLICATIONS,
  UPDATE_FAQS,
  UPDATE_THREADS,
  UPDATE_SHOW_USER_OPTIONS,
} from "./actions";

const apiUrl = {
  url: "http://e286-157-158-168-178.ngrok.io",
};

const urlReducer = (state = apiUrl, action) => {
  switch (action.type) {
    case GET_API:
      return state;
    default:
      return state;
  }
};

const userOptionsShow = false;

const userOptionsReducer = (state = userOptionsShow, action) => {
  if (action.type == UPDATE_SHOW_USER_OPTIONS) {
    return { ...state, userOptionsShow: action.payload_show };
  } else return state;
};

const userInitState = {
  isLogged: false,
  userId: 0,
  email: "",
  firstName: "",
  lastName: "",
  phoneNumber: "",
  token: "",
  isAdmin: false,
};

const userReducer = (state = userInitState, action) => {
  switch (action.type) {
    case LOGIN_USER:
      return {
        ...state,
        isLogged: true,
        userId: action.payload_id,
        email: action.payload_email,
        firstName: action.payload_firstName,
        lastName: action.payload_lastName,
        phoneNumber: action.payload_phoneNumber,
        token: action.payload_token,
        isAdmin: action.payload_isAdmin,
      };
    case LOGOUT_USER:
      return {
        ...state,
        isLogged: false,
        userId: 0,
        email: "",
        firstName: "",
        lastName: "",
        phoneNumber: "",
        token: "",
      };
    default:
      return state;
  }
};
const forumInitState = [];

const forumReducer = (state = forumInitState, action) => {
  switch (action.type) {
    case UPDATE_THREADS:
      return { ...state, threads: action.threads };
    default:
      return state;
  }
};

const FAQInitState = {};

const FAQreducer = (state = FAQInitState, action) => {
  switch (action.type) {
    case UPDATE_FAQS:
      return { ...state, FAQ: action.FAQs };
    default:
      return state;
  }
};

const applicationInitState = {};

const applicationReducer = (state = applicationInitState, action) => {
  switch (action.type) {
    case UPDATE_APPLICATIONS:
      return { ...state, applications: action.applications };
    default:
      return state;
  }
};

const allReducer = combineReducers({
  forumReducer: forumReducer,
  FAQreducer: FAQreducer,
  userReducer: userReducer,
  userOptionsReducer: userOptionsReducer,
  urlReducer: urlReducer,
  applicationReducer: applicationReducer,
});

export default allReducer;
