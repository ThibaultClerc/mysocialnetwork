import fetchReducer from './fetch';
import { combineReducers } from 'redux';

const allReducers = combineReducers({
  currentUser: fetchReducer
})

export default allReducers