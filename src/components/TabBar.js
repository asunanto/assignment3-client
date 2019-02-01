import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import TabBarStyles from '../styles/TabBarStyles'

class TabBar extends Component {
  render() {
    return (
      <footer>
        <TabBarStyles>
          <Link to="/user"><i style={{ color: (window.location.pathname === '/user' ? '#EC963A' : '#F5F9FF')}} className="material-icons">account_circle</i></Link>
          <Link to="/unit"><i style={{ color: (window.location.pathname === '/unit' ? '#EC963A' : '#F5F9FF')}} className="material-icons">home</i></Link>
          <Link to="/create-program"><i style={{ color: (window.location.pathname === '/create-program' ? '#EC963A' : '#F5F9FF')}} className="material-icons">description</i></Link>
          <Link to="/library"><i style={{ color: (window.location.pathname === '/library' ? '#EC963A' : '#F5F9FF')}} className="material-icons">list</i></Link>
          <Link to="/about"><i style={{ color: (window.location.pathname === '/about' ? '#EC963A' : '#F5F9FF')}} className="material-icons">info</i></Link>
        </TabBarStyles>
      </footer>
    )
  }
}
export default TabBar;