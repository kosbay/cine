import {
  FETCH_USER_ERROR,
  FETCH_USER_START,
  FETCH_USER_SUCCESS,
  ENROLL_USER_IN_FACULTY,
  UPDATE_USER_COINS,
  LOGOUT_USER,
  SAVE_LINK,
} from 'actions/types';

const initialState = {
  user: null,
  isLoaded: false,
  error: null,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case FETCH_USER_START:
      return {
        ...state, isLoaded: false, user: null, error: null,
      };
    case FETCH_USER_SUCCESS:
      return {
        ...state, isLoaded: true, user: action.payload, error: null,
      };
    case FETCH_USER_ERROR:
      return { ...state, isLoaded: true, error: action.payload };
    case ENROLL_USER_IN_FACULTY:
      return {
        ...state, isLoaded: true, user: action.payload, error: null,
      };
    case LOGOUT_USER: {
      return {
        url: '', isLoaded: false, user: null, error: null,
      };
    }
    case SAVE_LINK: {
      return { ...state, url: action.url };
    }
    case UPDATE_USER_COINS: {
      return {
        ...state,
        isLoaded: true,
        user: { ...state.user, wupai: state.user.wupai + action.payload },
        error: null,
      };
    }
    default:
      return state;
  }
}
