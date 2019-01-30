export function setBookmarksAction(bookmarks) {
  return {
    type: 'set_bookmarks',
    bookmarks
  }
}

export function setActivitiesAction(activities) {
  return {
    type: 'set_activities',
    activities
  }
}

export function setActivityAction(activity) {
  return {
    type: 'set_activity',
    activity
  }
}

export function setProgramAction(program) {
  return {
    type: 'set_program',
    program
  }
}

export function setProgramsAction(programs) {
  return {
    type: 'set_programs',
    programs
  }
}

export function setTokenAction(token) {
  return {
    type: 'set_token',
    token
  }
}

export function setLoginErrorAction(loginError) {
  return {
    type: 'set_loginError',
    loginError
  }
}

export function setSignupErrorAction(signupError) {
  return {
    type: 'set_signupError',
    signupError
  }
}
