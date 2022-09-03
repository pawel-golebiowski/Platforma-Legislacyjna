export const LOGIN_USER = "LOGIN_USER";
export const LOGOUT_USER = "LOGOUT_USER";
export const GET_API = "GET_API";
export const UPDATE_APPLICATIONS = "UPDATE_APPLICATIONS";
export const UPDATE_FAQS = "UPDATE_FAQS";

export const setUser = (userData) => {
  return {
    type: LOGIN_USER,
    payload_id: userData.id,
    payload_email: userData.email,
    payload_firstName: userData.firstName,
    payload_lastName: userData.lastName,
    payload_phoneNumber: userData.phoneNumber,
    payload_token: userData.token,
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
