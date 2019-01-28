import React, { Component, Fragment } from 'react';
import {Button} from '@material-ui/core/';
import store from '../config/store'
import { fetchActivity } from '../services/ActivityService';

class ActivityIndex extends Component {
  
  componentDidMount(){
    fetchActivity(this.props.match.params.id)
  }

  render(){// strangely render here gets executed multiple times
    const activity = store.getState().activity
    return (
      <Fragment>
      { activity && (
        <div>
          <h1>Activity Title: {activity.title}</h1>
          <p>Description: {activity.description}</p>
          <Button type="button" variant='contained' color="primary" style={{ 'backgroundColor': 'orange' }}>Edit Activity</Button>
          <p>Age Level: {activity.ageLevel.name}</p>
          <p>Category</p>
        </div>)
      }
      </Fragment>
    )
  }
}

export default ActivityIndex