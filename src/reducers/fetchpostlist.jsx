const initialState = {
  loading: false,
  postList: null,
  error: ''
}

const fetchPostListReducer = (state = initialState, action) => {
  switch(action.type) {
    case 'FETCH_POST_REQUEST' :
      return {
        ...state,
        loading: true
      }
    case 'FETCH_POST_SUCCESS' :
      return {
        ...state,
        loading: false,
        postList: action.postList
      }
    case 'FETCH_POST_FAILURE' :
      return {
        ...state,
        loading: false,
        error: action.error
      }
    default: 
      return state;
  }
}

export default fetchPostListReducer