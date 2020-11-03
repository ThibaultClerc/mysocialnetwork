import fetchReducer from './fetch';
import fetchPostListReducer from './fetchpostlist';
import { combineReducers } from 'redux';

const allReducers = combineReducers({
  currentUser: fetchReducer,
  postList: fetchPostListReducer
})

export default allReducers