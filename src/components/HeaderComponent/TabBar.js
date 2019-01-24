import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import TabBarStyles from '../../styles/TabBarStyles'

class TabBar extends Component {
  render() {
    return (
      <footer>
        <TabBarStyles>
        <Link to="/user"><i style={{color:(window.location.pathname==='/user' ? '#EC963A':'#F5F9FF'), 'fontSize': '10vw'}}className="material-icons">account_circle</i></Link>
        <Link to="/unit"><i style={{color:(window.location.pathname==='/unit' ? '#EC963A':'#F5F9FF'), 'fontSize': '10vw'}}className="material-icons">home</i></Link>
        <Link to="/program"><i style={{color:(window.location.pathname==='/program' ? '#EC963A':'#F5F9FF'), 'fontSize': '10vw'}}className="material-icons">description</i></Link>
        <Link to="/activities"><i style={{color:(window.location.pathname==='/activities' ? '#EC963A':'#F5F9FF'), 'fontSize': '10vw'}}className="material-icons">list</i></Link>
        <Link to="/login"><i style={{color:(window.location.pathname==='/login' ? '#EC963A':'#F5F9FF'), 'fontSize': '10vw'}}className="material-icons">info</i></Link>
        </TabBarStyles>
      </footer>
    )
  }
}
export default TabBar;