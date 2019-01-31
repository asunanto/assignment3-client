import React, { Component } from 'react';
import {Fab} from '@material-ui/core/';
import AddIcon from '@material-ui/icons/Add/';

class Unit extends Component {
  render() {
    return (
      <div>
        <h1>Unit Name</h1>
        <h2>Guide Hut</h2>
        <h2>Unit Leaders</h2>
        <h2>Unit Programs</h2>
        <Fab className="plusButton" size="medium" color="secondary" aria-label="Add" style={{ 'backgroundColor': 'orange' }}>
          <AddIcon />
        </Fab>
        <h2>Unit Members</h2>
        <Fab className="plusButton" size="medium" color="secondary" aria-label="Add" style={{ 'backgroundColor': 'orange' }}>
          <AddIcon />
        </Fab>
      </div>
    )
  }
}
export default Unit;