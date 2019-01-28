import React, { Component } from 'react';
import {Button} from '@material-ui/core/';
import store from '../config/store'
import { fetchActivity } from '../services/ActivityService';


class Activity extends Component {
  
  componentDidMount(){
    fetchActivity(this.props.match.params.id)
  }

  render() {
    const activity = store.getState().activity
    console.log(activity)
    return (
      <div>
        <h1>Activity Title: {}</h1>
        <p>Description: </p>
        <Button type="button" variant='contained' color="primary" style={{ 'backgroundColor': 'orange' }}>Edit Activity</Button>
        <p>Age Level: </p>
        <p>Category</p>
      </div>
    )
  }
}


export default Activity;