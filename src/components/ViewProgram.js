// View a Single Program with its Activities (Grid List)

import React, { Component } from 'react';
import { Button } from '@material-ui/core/';
import store from '../config/store'
import { fetchProgram } from '../services/ProgramService';

class ViewProgram extends Component {

  componentDidMount() {
    fetchProgram(this.props.match.params.id)
  }

  render() {// strangely render here gets executed multiple times
    const program = store.getState().program
    return (
      <div>
        <h1>Program Title: {program && program.program.name}</h1>
        <p>Description: {program && program.program.description}</p>
        <Button type="button" variant='contained' color="primary" style={{ 'backgroundColor': 'orange' }}>Edit program</Button>
        <p>Unit: {program && program.program.unit.name}</p>
        <p>Activities</p>
        <ul>
          {program && program.activities.map(activity => (
            <li key={activity._id}>
              <p>Activity Title: {activity.title}</p>
              <p>Description: {activity.description}</p>
              <a href={`/activities/${activity._id}`}><button>View</button></a>
            </li>
          ))}
        </ul>

      </div>
    )
  }
}
export default ViewProgram;
