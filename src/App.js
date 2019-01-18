import React, { Component} from 'react'; // add Fragment later
import './App.css';
// import store from './config/store'
// import { setBookmarksAction, setTokenAction, setLoginErrorAction } from './config/actions'
// import { api, setJwt } from './api/init'
// import decodeJWT from 'jwt-decode'
// import Bookmark from './components/Bookmark'
// import Signin from './components/Signin'
import { BrowserRouter as Router, Route } from 'react-router-dom' // add Redirect later
// import {fetchBookmarks, removeBookmark } from './services/BookmarkService'
import HomePage from './components/HomePage';
import NavBar from './components/HeaderComponent/NavBar';

class App extends Component {

  render() {
    return (
      <Router>
        <div>
          <NavBar />
          <Route name="home" exact path="/" component={HomePage} />
        </div>
      </Router>
    )
  }
}
  
//   componentDidMount() {
//     fetchBookmarks()
//   }

//   handleSignIn = async (event) => {
//     try {
//       event.preventDefault()
//       const form = event.target
//       const response = await api.post('/auth/login', {
//         email: form.elements.email.value,
//         password: form.elements.password.value
//       })
//       let token = response.data.token
//       setJwt(response.data.token)
//       store.dispatch(setTokenAction(token))
//       fetchBookmarks()
//     } catch (error) {
//       store.dispatch(setLoginErrorAction(error.message))
//     }
//   }

//   handleSignOut = (event) => {
//     api.get('/auth/logout').then(() => {
//       localStorage.removeItem('token')
//       store.dispatch(setTokenAction(null))
//       store.dispatch(setBookmarksAction([]))
//     })
//   }

  


//   render() {
//     const bookmarks = store.getState().bookmarks
//     const token = store.getState().token
//     const tokenDetails = token && decodeJWT(token)
//     console.log(tokenDetails)
//     return (
//       <div className="App">
//         {
//           <Router>
//             <Fragment>
//               <Route exact path='/' render = { ()=> <Redirect to ="/bookmarks"/>}/>
//               <Route exact path='/login' render={() => {
//                 if (true) {
//                   return (<Redirect to="/bookmarks" />)
//                 } else {
//                   return (<Signin loginError={store.getState().loginError} handleSignIn={this.handleSignIn} />)
//                 }
//               }} />
//               <Route exact path="/bookmarks" render={() => (
//                 <Fragment>
//                   {false && (
//                     <div>
//                       <h4>Welcome {tokenDetails.email}</h4>
//                       <p>You logged in at: {new Date(tokenDetails.iat * 1000).toLocaleString()}</p>
//                       <p>Your token expires at: {new Date(tokenDetails.exp * 1000).toLocaleString()}</p>
//                     </div>
//                   )}
//                 <h1> Bookmarks</h1>
//                   <ul>
//                     {bookmarks.map(bookmark => <li key={bookmark._id}><Bookmark {...bookmark} remove={removeBookmark} /></li>)}
//                   </ul>
//                 </Fragment>
//               )
//               } />
//             </Fragment>
//           </Router>
//         }

//       </div>
//     );
//   }
// }

export default App;