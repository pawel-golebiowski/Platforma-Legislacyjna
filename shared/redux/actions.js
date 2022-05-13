export const LOGIN_USER = "LOGIN_USER";
export const LOGOUT_USER = "LOGOUT_USER";

export const setUserId = (id) => {
  return {
    type: LOGIN_USER,
    payload: id
  };
};

export const logout = () =>{
  return {
    type: LOGOUT_USER
  }
}


// export const setUserId = (id) => {
//   console.log("user id: " + id);
//   (dispatch) => {
//     dispatch({
//       type: SET_USER_ID,
//       payload: id,
//     });
//   };
// };
