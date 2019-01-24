import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import TabBarStyles from '../../styles/TabBarStyles'

class TabBar extends Component {
  render() {
    return (
      <footer>
        <TabBarStyles>
        <Link to="/">Home</Link>
        { '  |  ' }
        <Link to="/signup">Sign Up</Link>
        { '  |  ' }
        <Link to="/login">Login</Link>
        </TabBarStyles>
      </footer>
    )
  }
}
export default TabBar;