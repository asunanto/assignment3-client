import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import store from './config/store';
import NavBar from './components/HeaderComponent/NavBar.js';
import {
  Route,
  Switch,
  BrowserRouter as Router
} from 'react-router-dom'

const render = () => ReactDOM.render(<App />, 
  document.getElementById('root'));

const routing = (
  <Router>
       <div>
           <NavBar />
           <Switch>
               <Route path="/" component={App} />
               {/* <Route path="/users" component={SignUp} />
               <Route exact path="/contact" component={Login} /> */}
               {/* <Route component={Notfound} /> */}
           </Switch>
       </div>
   </Router>
)

ReactDOM.render(routing, document.getElementById('root'))

store.subscribe(render)
render()
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();