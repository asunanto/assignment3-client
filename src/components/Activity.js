import React, { Component } from 'react';
import {Button} from '@material-ui/core/';
import store from '../config/store'
import { fetchActivity } from '../services/ActivityService';


class Activity extends Component {
  
  componentDidMount(){
    fetchActivity(this.props.match.params.id)
  }

  render(){// strangely render here gets executed multiple times
    const activity = store.getState().activity
    return (
      <div>
        <h1>Activity Title: {activity && activity.title}</h1>
        <p>Description: {activity && activity.description}</p>
        <Button type="button" variant='contained' color="primary" style={{ 'backgroundColor': 'orange' }}>Edit Activity</Button>
        <p>Age Level: {activity && activity.ageLevel.name}</p>
        <p>Category</p>
      </div>
    )
  }
}

// function Activity (props){
//   const {title,description} = props.activity
  
//   return (
//           <div>
//             <h1>Activity Title: {title}</h1>
//             <p>Description: {description} </p>
//             <p>Age Level: </p>
//             <p>Category</p>
//           </div>
//         )

// }


export default Activity;