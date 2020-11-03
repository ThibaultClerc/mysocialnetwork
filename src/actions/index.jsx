export const fetchUserRequest = () => {
  console.log("JE SUIS DANS FetchUserREQUEST")
  return {
    type: 'FETCH_USER_REQUEST',
  }
}

export const fetchUserSuccess = (currentUser) => {
  console.log("JE SUIS DANS FetchUserSUCCESS")
  return {
    type: 'FETCH_USER_SUCCESS',
    currentUser
  };
};

export const fetchUserFailure = (error) => {
  console.log("JE SUIS DANS FetchUserFAILURE")
  return {
    type: 'FETCH_USER_FAILURE',
    error
  };
};

export const logOutUser = () => {
  console.log("JE SUIS DANS logOutUser")
  return {
    type: 'LOGOUT_USER'
  };
};