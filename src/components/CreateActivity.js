import React, { Component } from 'react';
import {Button} from '@material-ui/core/';

class CreateActivity extends Component {
  render() {
    return (
      <div>
        <h1>Create a new activity to add to our share library</h1>
        <p>Age Level</p>
        <p>Category</p>
        <p>Length</p>
        <p>Attachments</p>
        <Button type="button" variant='contained' color="primary" style={{ 'backgroundColor': 'orange' }}>Create</Button>
      </div>
    )
  }
}
export default CreateActivity;