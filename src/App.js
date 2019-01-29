import React, { Component, Fragment } from 'react'; // add Fragment later
import './App.css';
import store from './config/store'
import {
  setBookmarksAction,
  setTokenAction,
  setLoginErrorAction,
  setSignupErrorAction,
  setActivitiesAction,
  setProgramsAction
} from './config/actions'
import { api, setJwt } from './api/init'
import decodeJWT from 'jwt-decode'
// import Bookmark from './components/Bookmark'
import Signin from './components/Signin'
import Signup from './components/Signup'
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom' // add Redirect later
// import { fetchBookmarks, removeBookmark } from './services/BookmarkService'
import { fetchActivities } from './services/ActivityService'
import { fetchPrograms } from './services/ProgramService'
import TabBar from './components/TabBar'
import NotFound from './components/NotFound'
import AboutPage from './components/AboutPage'
import User from './components/User'
import Unit from './components/Unit'
import Library from './components/Library'
import CreateActivity from './components/CreateActivity'
import CreateProgram from './components/CreateProgram'
import Activity from './components/Activity'
import Activities from './components/Activities'
import Program from './components/Program'
import Programs from './components/Programs'


class App extends Component {

  componentDidMount() {
    // fetchBookmarks()
    fetchActivities()
    fetchPrograms()
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
      console.log(token)
      setJwt(response.data.token)
      store.dispatch(setTokenAction(token))
      // fetchBookmarks()
      fetchPrograms()
    } catch (error) {
      store.dispatch(setLoginErrorAction(error.message))
    }
  }

  handleSignOut = (event) => {
    api.get('/auth/logout').then(() => {
      localStorage.removeItem('token')
      store.dispatch(setTokenAction(null))
      store.dispatch(setBookmarksAction([]))
      store.dispatch(setActivitiesAction([]))
      store.dispatch(setProgramsAction([]))
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
      // fetchBookmarks()
    } catch (error) {
      store.dispatch(setSignupErrorAction(error.message))
    }
  }

  render() {
    // const bookmarks = store.getState().bookmarks
    const activities = store.getState().activities
    const programs = store.getState().programs
    const token = store.getState().token
    const tokenDetails = token && decodeJWT(token)
    console.log(tokenDetails)
    // const activity = store.getState().activity
    // console.log(activity)
    return (
      <div className="App">
        {
          <Router>
            <Fragment>
              {/* <Route exact path='/' render = { ()=> <Redirect to ="/"/>}/> */}
              <TabBar />
              <Switch>
                <Route exact path='/login' render={() => {
                  if (tokenDetails) {
                    return (<Redirect to="/" />)
                  } else {
                    return (<Signin loginError={store.getState().loginError} handleSignIn={this.handleSignIn} />)
                  }
                }} />
                <Route exact path='/signup' render={() => {
                  if (tokenDetails) {
                    return (<Redirect to="/" />)
                  } else {
                    return (<Signup signupError={store.getState().signupError} handleSignUp={this.handleSignUp} />)
                  }
                }} />
                {/* <Route exact path="/" render={() => (
                  <Fragment>
                    {tokenDetails && (
                      <div>
                        <h4>Welcome {tokenDetails.email}</h4>
                        <p>You logged in at: {new Date(tokenDetails.iat * 1000).toLocaleString()}</p>
                        <p>Your token expires at: {new Date(tokenDetails.exp * 1000).toLocaleString()}</p>
                      </div>
                    )}
                    <h1> Bookmarks</h1>
                    <ul> */}
                      {/* {bookmarks.map(bookmark => <li key={bookmark._id}><Bookmark {...bookmark} remove={removeBookmark} /></li>)} */}
                    {/* </ul>
                  </Fragment>
                )
                } /> */}
                <Route exact path="/" render={() => (
                  <Redirect to="/user" />
                )} />
              
                <Route exact path="/activities" render={() => (
                  <Activities activities={activities} />
                )} />
                {/* <Route path="/activities/:id" render={() => 
                  <Activity activity={activity}/>
                } /> */}
                <Route path="/activities/:id" exact component={Activity} />
                <Route exact path="/programs" render={() => (
                  <Programs programs={programs} />
                )} />
                <Route path="/user" exact component={User} />
                <Route path="/unit" exact component={Unit} />
                <Route path="/create-program" exact component={CreateProgram} />
                <Route path="/create-activity" exact component={CreateActivity} />
                <Route path="/library" exact component={Library} />
                <Route path="/about" exact component={AboutPage} />
                {/* <Route path="/activity" exact component={Activity} /> */}
                <Route path="/program" exact component={Program} />
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