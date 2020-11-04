const initialState = {
  loading: false,
  postList: [],
  error: ''
}

const fetchPostListReducer = (state = initialState, action) => {
  switch(action.type) {
    case 'FETCH_POSTLIST_REQUEST' :
      return {
        ...state,
        loading: true
      }
    case 'FETCH_POSTLIST_SUCCESS' :
      return {
        ...state,
        loading: false,
        postList: action.currentPostList
      }
    case 'FETCH_POSTLIST_FAILURE' :
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