export const LOGIN_USER = "LOGIN_USER";
export const LOGOUT_USER = "LOGOUT_USER";
export const GET_API = "GET_API";
export const UPDATE_APPLICATIONS = "UPDATE_APPLICATIONS";
export const UPDATE_FAQS = "UPDATE_FAQS";
export const UPDATE_THREADS = "UPDATE_THREADS";
export const UPDATE_SHOW_USER_OPTIONS = "UPDATE_SHOW_USER_OPTIONS";

export const showUserOptions = () => {
  return {
    type: UPDATE_SHOW_USER_OPTIONS,
    payload_show: true,
  };
};

export const hideUserOptions = () => {
  return {
    type: UPDATE_SHOW_USER_OPTIONS,
    payload_show: false,
  };
};

export const setUser = (userData) => {
  return {
    type: LOGIN_USER,
    payload_id: userData.id,
    payload_email: userData.email,
    payload_firstName: userData.firstName,
    payload_lastName: userData.lastName,
    payload_phoneNumber: userData.phoneNumber,
    payload_token: userData.token,
    payload_isAdmin: userData.isAdmin,
  };
};

export const updateApplications = (applications) => {
  return {
    type: UPDATE_APPLICATIONS,
    applications: applications,
  };
};

export const updateFAQs = (FAQs) => {
  return {
    type: UPDATE_FAQS,
    FAQs: FAQs,
  };
};

export const updateThreads = (threads) => {
  return {
    type: UPDATE_THREADS,
    threads: threads,
  };
};

export const logout = () => {
  return {
    type: LOGOUT_USER,
  };
};

export const getApiUrl = () => {
  return {
    type: GET_API,
  };
};
