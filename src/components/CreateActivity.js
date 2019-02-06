import React, { Component } from 'react'
import { api, setJwt } from '../api/init'
import { Paper, Button, TextField } from '@material-ui/core'
import { addActivity } from '../services/ActivityService'
import { Redirect } from 'react-router-dom'
import PropTypes from 'prop-types'

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
        <form onSubmit={this.handleSubmit}>

          {/* Set an age level for this activity */}
          <TextField
              id="age"
              label="Age Level"
              select
              value={ageIndex}
              onChange={this.handleChange}
              margin="normal"
              variant="outlined"
              InputLabelProps={{
                shrink: true,
              }}
          >
            { this.state.ageLevels.map((ageLevel,index) =>
              <option key={index} value={index}>{ageLevel.name}</option>
            )}
          </TextField>

          <br />

          {/* Give your activity a title */}
          <TextField
            required
            id="title"
            label="Title"
            style={{ margin: 15 }}
            placeholder="My Fun Activity"
            helperText="Give your activity title"
            margin="normal"
            type="title"
            fullWidth
            variant="outlined"
            InputLabelProps={{
              shrink: true,
            }} 
          />
          <br />

          {/* Give your activity a description */}
          <TextField
            required
            id="description"
            label="Description"
            style={{ margin: 15 }}
            placeholder="Give details about this program, e.g. its purpose, theme, requirements etc."
            helperText="Write a description of your program"
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
          <br />

          {/* Give categories to this activity */}
          {/* <p>Category</p> */}

          {/* How many minutes will the activity run for? */}
          <TextField
            required
            id="len"
            label="Length"
            style={{ margin: 15}}
            placeholder="Enter number between 1 - 120"
            helperText="How many minutes will the activity run for?"
            margin="normal"
            variant="outlined"
            type="length"
            InputLabelProps={{
                shrink: true,
            }} 
          />
          <br />

          {/* Attach files (optional) */}
          {/* <p>Attachments</p> */}

          {/* Click 'create' to save your activity to the database */}
          <Button type="submit" variant='contained' color="primary" style={{ 'backgroundColor': 'orange', margin: 15 }}>Create</Button>
        
        </form>
      </div>
    )
  }
}
export default CreateActivity;