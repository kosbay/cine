import { SET_CURRENT_USER } from '../actions/types'

import authReducer from './authReducer'

describe('auth', () => {

  const initialState = {
    isAuthenticated: false,
    user: {}
  }

  it('should return initial state', () => {
    expect(authReducer(undefined, {})).toEqual({ isAuthenticated: false, user: {} })
  })

  it('SET_CURRENT_USER', () => {
    expect(authReducer(initialState, {
      type: SET_CURRENT_USER,
      payload: { user: undefined }

    }))
    .toEqual({
      isAuthenticated: false,
      user: undefined
    })
  })
})
