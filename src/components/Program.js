import React, { Component } from 'react';
import {Button} from '@material-ui/core/';

class Program extends Component {
  render() {
    return (
      <div>
        <h1>Program Title</h1>
        <Button type="button" variant='contained' color="primary" style={{ 'backgroundColor': 'orange' }}>Edit Program</Button>
        <p>Unit</p>
        <p>Date</p>
        <p>Start Time</p>
        <p>End Time</p>
      </div>
    )
  }
}
export default Program;