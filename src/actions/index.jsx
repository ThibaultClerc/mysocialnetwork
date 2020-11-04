export const fetchUserRequest = () => {
  return {
    type: 'FETCH_USER_REQUEST',
  }
}

export const fetchUserSuccess = (currentUser) => {
  return {
    type: 'FETCH_USER_SUCCESS',
    currentUser
  };
};

export const fetchUserFailure = (error) => {
  return {
    type: 'FETCH_USER_FAILURE',
    error
  };
};

export const logOutUser = () => {
  return {
    type: 'LOGOUT_USER'
  };
};

export const updateUser = (updatedUser) => {
  return {
    type: 'UPDATE_USER',
    updatedUser
  };
};

export const fetchPostListRequest = () => {
  return {
    type: 'FETCH_POSTLIST_REQUEST',
  }
}

export const fetchPostListSuccess = (currentPostList) => {
  return {
    type: 'FETCH_POSTLIST_SUCCESS',
    currentPostList
  };
};

export const fetchPostListFailure = (error) => {
  return {
    type: 'FETCH_POSTLIST_FAILURE',
    error
  };
};
