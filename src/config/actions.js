export function setBookmarksAction(bookmarks) {
  return {
    type: 'set_bookmarks',
    bookmarks
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