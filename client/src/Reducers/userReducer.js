
 function userReducer (state = null, action) {
  switch (action.type) {
    case "LOGIN_USER":
      return action.payload;
    case "LOGOUT_USER":
      return action.payload;
    default:
      return state;
  }
}

export default userReducer