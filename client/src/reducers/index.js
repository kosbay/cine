import { combineReducers } from 'redux';

import authReducer from './authReducer';
import profileReducer from './profileReducer';
import studentReducer from './studentReducer';
import errorReducer from './errorReducer';
import univerReducer from './univerReducer';
import facReducer from './facReducer';
import specReducer from './specReducer';
import successReducer from './successReducer';
import applyReducer from './applyReducer';
import questReducer from './questReducer';
import reviewReducer from './reviewReducer';

export default combineReducers({
  auth: authReducer,
  profile: profileReducer,
  student: studentReducer,
  errors: errorReducer,
  success: successReducer,
  univer: univerReducer,
  fac: facReducer,
  spec: specReducer,
  apply: applyReducer,
  quest: questReducer,
  review: reviewReducer
});
