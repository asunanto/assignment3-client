import React, { Component } from 'react';
import {Button} from '@material-ui/core/';

class Activity extends Component {
  render() {
    return (
      <div>
        <h1>Activity Title</h1>
        <Button type="button" variant='contained' color="primary" style={{ 'backgroundColor': 'orange' }}>Edit Activity</Button>
        <p>Age Level</p>
        <p>Category</p>
      </div>
    )
  }
}
export default Activity;