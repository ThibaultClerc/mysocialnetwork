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

export const updateUser = (updatedUser) => {
  console.log("JE SUIS DANS updateUser")
  return {
    type: 'UPDATE_USER',
    updatedUser
  };
};

export const fetchPostListRequest = () => {
  console.log("JE SUIS DANS FetchPostListREQUEST")
  return {
    type: 'FETCH_POSTLIST_REQUEST',
  }
}

export const fetchPostListSuccess = (currentPost) => {
  console.log("JE SUIS DANS FetchPostListSUCCESS")
  return {
    type: 'FETCH_POSTLIST_SUCCESS',
    currentPost
  };
};

export const fetchPostListFailure = (error) => {
  console.log("JE SUIS DANS FetchPostListFAILURE")
  return {
    type: 'FETCH_POSTLIST_FAILURE',
    error
  };
};
