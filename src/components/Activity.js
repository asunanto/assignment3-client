import React, { Component } from 'react';
import {Link} from 'react-router-dom'
import {Paper, Button } from '@material-ui/core/';
import store from '../config/store'
import { fetchActivity } from '../services/ActivityService';

const style = {
  Paper: {
      'width': '500px',
      'margin': '10% auto 0 auto',
      'textAlign': 'center',
      'padding': '5%'

  }
}


class Activity extends Component {

  componentDidMount() {
    fetchActivity(this.props.match.params.id)
  }

  render() {// strangely render here gets executed multiple times
    const activity = store.getState().activity
    return (
      <Paper style={style.Paper}>
        <h1>Activity Title: {activity && activity.title}</h1>
        <p>Description: {activity && activity.description}</p>
        <Link to={`/activities/${this.props.match.params.id}/edit`}><Button type="button" variant='contained' color="primary" style={{ 'backgroundColor': 'orange' }}>Edit Activity</Button></Link>
        <p>Age Level: {activity && activity.ageLevel.name}</p>
        <p>Category</p>
      </Paper>
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