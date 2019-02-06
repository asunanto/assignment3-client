import { createStore } from 'redux'

const initialState = {
  activities: [],
  activity: null,
  program: null,
  programs: [],
  loggedIn: false,
  signedUp: false,
  token: null,
  loginError: null,
  signupError: null
}

const reducer = (state, action) => {
  switch (action.type) {
    case 'set_activities':
      return { ...state, activities: action.activities }
    case 'set_activity':
      return { ...state, activity: action.activity }
    case 'set_programs':
      return { ...state, programs: action.programs }
    case 'set_program':
      return { ...state, program: action.program }
    case 'set_loginError':
      return { ...state, loginError: action.loginError }
    case 'set_signupError':
      return { ...state, signupError: action.signupError }
    case 'set_token':
      return { ...state, token: action.token }
    default:
      return state
  }
}

export default createStore(reducer, initialState)
