const initialState = {
  loading: false,
  currentUser: [],
  error: ''
}

const fetchReducer = (state = initialState, action) => {
  switch(action.type) {
    case 'FETCH_USER_REQUEST' :
      return {
        ...state,
        loading: true
      }
    case 'FETCH_USER_SUCCESS' :
      return {
        ...state,
        loading: false,
        currentUser: action.currentUser
      }
    case 'FETCH_USER_FAILURE' :
      return {
        ...state,
        loading: false,
        error: action.error
      }
    case 'LOGOUT_USER' :
      return {
        ...state,
        currentUser: []
      }
    default: 
      return state;
  }
}

export default fetchReducer