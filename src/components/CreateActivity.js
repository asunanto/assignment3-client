/*  Users can create a new activity for their unit.

    FORMS
    -----
    - CreateProgram #
    - CreateActivity #
    - EditProgram #
    - EditActivity
    - Edit User #
    - SignIn
    - SignUp
    * Update Activities to Program

    Forms share the same styles and layouts as other forms on the app:
        - grid, textfields, paper
    Plus, the colours, typography and button styles are the same across the app.
        - MUI theme?
    
*/

import React, { Component } from 'react'
import { api, setJwt } from '../api/init'
import { Paper, Button, TextField, Grid } from '@material-ui/core'
import { addActivity } from '../services/ActivityService'
import { Redirect } from 'react-router-dom'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing.unit * 2,
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  textField: {
    backgroundColor: '#F5F9FF'
  }
});

class CreateActivity extends Component {
  state = {
    ageLevel: {},
    ageLevels: []
  }

  componentDidMount() {
    api.get('/agelevels').then((res) => {
      this.setState({ ageLevels: res.data })
      this.setState({ ageLevel: res.data[0] })
    }).catch((err) => {
      console.error('Could not fetch age levels', err)
    })
  }

  handleChange = (e) => {
    this.setState({ ageLevel: this.state.ageLevels[e.target.value] })
  }

  handleSubmit = (e) => {
    const token = localStorage.getItem("token")
    setJwt(token)
    e.preventDefault()
    try {
      const { title, description, len } = e.target.elements
      const length = parseInt(len.value)
      if (isNaN(length) || length < 1 || length > 120) {
        alert('Length must be between 1 and 120 minutes and digits only')
        return
      }

      const req = {
        title: title.value,
        description: description.value,
        length: len.value,
        ageLevel: this.state.ageLevel
      }
      addActivity(req)
      console.log(req.length)
      this.props.history.push(`/user`)
    }
    catch (error) { console.error(error) }
  }

  render() {
    const ageIndex = this.state.ageLevel && this.state.ageLevels.findIndex(ageLevel => ageLevel.name == this.state.ageLevel.name)

    return (
      <div>
      {/* Instructive form heading */}
      <h1>Create a new activity to add to our share library</h1>
      
      <Paper 
        style={{
          margin: '10% auto 0 auto',
          padding: '5%',
          maxWidth: 800,
        }}
      >

        <form onSubmit={this.handleSubmit}>

        <Grid 
          container
          spacing={16}
          direction="row"
          justify="center"
          alignItems="flex-start"
        >

          {/* Give your activity a title */}
          <Grid item xs={8} md={10}>
          <TextField
            required
            style={{backgroundColor:'#F5F9FF'}}
            id="title"
            label="Title"
            placeholder="My Fun Activity"
            // helperText="Give your activity title"
            margin="normal"
            type="title"
            fullWidth
            variant="outlined"
            InputLabelProps={{
              shrink: true,
            }}
          />
          </Grid>

          {/* Set an age level for this activity */}
          <Grid item xs={4} md={2}>
          <TextField
            style={{backgroundColor:'#D4E2FB'}}
            id="age"
            label="Age Level"
            select
            // placeholder="Select appropriate age"
            value={ageIndex}
            onChange={this.handleChange}
            margin="normal"
            fullWidth
            variant="outlined"
            InputLabelProps={{
              shrink: true,
            }}
          >
            { this.state.ageLevels.map((ageLevel,index) =>
              <option key={index} value={index}>{ageLevel.name}</option>
            )}
          </TextField>
          </Grid>

          {/* Give your activity a description */}
          <Grid item xs={12}>
          <TextField
            required
            style={{backgroundColor:'#F5F9FF'}}
            id="description"
            label="Description"
            placeholder="Purpose, instructions, resources needed..."
            // helperText="Write a description of your program"
            multiline
            rowsMax="20"
            fullWidth
            margin="normal"
            variant="outlined"
            type="description"
            InputLabelProps={{
                shrink: true,
            }} 
          />
          </Grid>

          {/* How many minutes will the activity run for? */}
          <Grid item xs={6} sm={3}>
          <TextField
            required
            style={{backgroundColor:'#D4E2FB'}}
            id="len"
            label="Length"
            placeholder="1 - 120 mins"
            // helperText="How many minutes will the activity run for?"
            margin="normal"
            variant="outlined"
            fullWidth
            type="length"
            InputLabelProps={{
                shrink: true,
            }} 
          />
          </Grid>

          {/* Give categories to this activity */}
          <Grid item xs={6} sm={3}>
          <TextField
            style={{backgroundColor:'#D4E2FB'}}
            id="categories"
            label="Categories"
            placeholder="Most relevant"
            // helperText="Which categories match this activity best?"
            variant="outlined"
            margin="normal"
            fullWidth
            InputLabelProps={{
                shrink: true,
            }} 
          />
          </Grid>

          {/* Attach files (optional) */}
          <Grid item xs={6} sm={3}>
          <TextField
            style={{backgroundColor:'#D4E2FB'}}
            id="attachment"
            label="Attachment"
            placeholder="Upload file"
            // helperText="Do you want to attach any helpful files?"
            margin="normal"
            fullWidth
            variant="outlined"
            InputLabelProps={{
                shrink: true,
            }} 
          />
          </Grid>

          {/* Click 'create' to save your activity to the database */}
          <Grid item xs={12}>
          <Button type="submit" variant='contained' color="primary" style={{ 'backgroundColor': 'orange'}}>Create</Button>
          </Grid>

          </Grid>
        </form>
        </Paper>
      </div>
    )
  }
}



export default withStyles(styles)(CreateActivity);