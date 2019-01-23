import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import TabBar from '../../styles/TabBar'

class NavBar extends Component {
  render() {
    return (
      <footer>
        <TabBar>
        <Link to="/">Home</Link>
        { '  |  ' }
        <Link to="/signup">Sign Up</Link>
        { '  |  ' }
        <Link to="/login">Login</Link>
        </TabBar>
      </footer>
    )
  }
}
export default NavBar;