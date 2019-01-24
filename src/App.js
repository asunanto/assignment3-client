import React, { Component, Fragment} from 'react'; // add Fragment later
import './App.css';
import store from './config/store'
import { setBookmarksAction, setTokenAction, setLoginErrorAction, setSignupErrorAction } from './config/actions'
import { api, setJwt } from './api/init'
import decodeJWT from 'jwt-decode'
import Bookmark from './components/Bookmark'
import Signin from './components/Signin'
import Signup from './components/Signup'
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom' // add Redirect later
import {fetchBookmarks, removeBookmark } from './services/BookmarkService'
import TabBar from './components/TabBar'
import NotFound from './components/NotFound'
import AboutPage from './components/AboutPage'

class App extends Component {
  
  componentDidMount() {
    fetchBookmarks()
  }

  handleSignIn = async (event) => {
    try {
      event.preventDefault()
      const form = event.target
      const response = await api.post('/auth/login', {
        email: form.elements.email.value,
        password: form.elements.password.value
      })
      let token = response.data.token
      setJwt(response.data.token)
      store.dispatch(setTokenAction(token))
      fetchBookmarks()
    } catch (error) {
      store.dispatch(setLoginErrorAction(error.message))
    }
  }

  handleSignOut = (event) => {
    api.get('/auth/logout').then(() => {
      localStorage.removeItem('token')
      store.dispatch(setTokenAction(null))
      store.dispatch(setBookmarksAction([]))
    })
  }

  handleSignUp = async (event) => {
    try {
      event.preventDefault()
      const form = event.target
      const response = await api.post('/auth/register', {
        email: form.elements.email.value,
        password: form.elements.password.value
      })
      let token = response.data.token
      setJwt(response.data.token)
      store.dispatch(setTokenAction(token))
      fetchBookmarks()
    } catch (error) {
      store.dispatch(setSignupErrorAction(error.message))
    }
  }

  render() {
    const bookmarks = store.getState().bookmarks
    const token = store.getState().token
    const tokenDetails = token && decodeJWT(token)
    console.log(tokenDetails)
    return (
      <div className="App">
        {
          <Router>
            <Fragment>
              {/* <Route exact path='/' render = { ()=> <Redirect to ="/"/>}/> */}
              <TabBar />
              <Switch>  
                <Route exact path='/login' render={ () => {
                  if (tokenDetails) {
                    return (<Redirect to="/" />)
                  } else {
                    return (<Signin loginError={store.getState().loginError} handleSignIn={this.handleSignIn} />)
                  }
                }} />
                <Route exact path='/signup' render={ () => {
                  if (tokenDetails) {
                    return (<Redirect to="/" />)
                  } else {
                    return (<Signup signupError={store.getState().signupError} handleSignUp={this.handleSignUp} />)
                  }
                }} />
                <Route exact path="/" render={() => (
                  <Fragment>
                    {tokenDetails && (
                      <div>
                        <h4>Welcome {tokenDetails.email}</h4>
                        <p>You logged in at: {new Date(tokenDetails.iat * 1000).toLocaleString()}</p>
                        <p>Your token expires at: {new Date(tokenDetails.exp * 1000).toLocaleString()}</p>
                      </div>
                    )}
                  <h1> Bookmarks</h1>
                    <ul>
                      {bookmarks.map(bookmark => <li key={bookmark._id}><Bookmark {...bookmark} remove={removeBookmark} /></li>)}
                    </ul>
                  </Fragment>
                )
                } />
              <Route exact path="/about" component={AboutPage} />
              <Route component={NotFound} />
              </Switch>
            </Fragment>
          </Router>
        }
      </div>
    );
  }
}

export default App;