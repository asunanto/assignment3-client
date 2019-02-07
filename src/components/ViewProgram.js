// View a Single Program with its Activities (Grid List)

import React, { Component } from 'react';
import { Button, Grid, Link, Fab } from '@material-ui/core/';
import AddIcon from '@material-ui/icons/Add';
import store from '../config/store'
import { fetchProgram } from '../services/ProgramService';
import Activity from './Activity'

class ViewProgram extends Component {

  componentDidMount() {
    fetchProgram(this.props.match.params.id)
  }

  render() {// strangely render here gets executed multiple times
    const program = store.getState().program
    // const { alignItems, direction, justify } = this.state;

    return (
      <div>
        <h1>Program Title: {program && program.program.name}</h1>
        <p>Description: {program && program.program.description}</p>
        <Button type="button" variant='contained' color="primary" style={{ 'backgroundColor': 'orange' }}>Edit program</Button>
        <p>Unit: {program && program.program.unit.name}</p>
        <h2>Activities</h2>

        {/* Display Activity cards belonging to the program */}
        <Grid
          container
          spacing={16}
          // direction={direction}
          // justify={justify}
          // alignItems={alignItems}
        >
          {program && program.activities.map((activity) => (
            <Activity key={activity._id} activity={activity} />
            )
          )}
        </Grid>

      </div>
    )
  }
}
export default ViewProgram;