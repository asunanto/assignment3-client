import React, { Component } from 'react';
import { Button, Fab } from '@material-ui/core/';
import AddIcon from '@material-ui/icons/Add/';

class User extends Component {
  render() {
    return (
      <div>
        <h1>Hi, Leader!</h1>
        <Button className="manageAccountButton" type="button" variant='contained' color="primary" style={{ 'backgroundColor': 'orange' }}>Manage Account</Button>
        <h2>My Guide Hut</h2>
        <h2>My Programs</h2>
        <Fab className="plusButton" size="medium" color="secondary" aria-label="Add" style={{ 'backgroundColor': 'orange' }}>
          <AddIcon />
        </Fab>
        <h2>My Activities</h2>
        <Fab className="plusButton" size="medium" color="secondary" aria-label="Add" style={{ 'backgroundColor': 'orange' }}>
          <AddIcon />
        </Fab>
      </div>
    )
  }
}
export default User;