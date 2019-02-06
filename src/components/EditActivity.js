import React, { Component } from 'react'
import { api, setJwt } from '../api/init'
import { Button, TextField } from '@material-ui/core'
import { updateActivity } from '../services/ActivityService';

class EditActivity extends Component {

  state = {
    title: '',
    description: '',
    length: '',
    ageLevels: []
  }

  componentDidMount() {
    const { id } = this.props.match.params
    api.get(`/activities/${id}`).then((res) => {
      this.setState({ ...res.data })
    }).catch((err) => {
      console.error('Could not fetch age activity', err)
    })

    api.get('/agelevels').then((res) => {
      this.setState({ ageLevels: res.data })
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
      const { id } = this.props.match.params
      const { title, description, len} = e.target.elements
      const length = parseInt(len.value)
      if (isNaN(length) || length < 1 || length > 120) {
        alert('Length must be between 1 and 120 minutes and digits only')
        return
      }

      const req = {
        id,
        title: title.value,
        description: description.value,
        len: this.state.length,   // i know this is pretty bad naming please forgive us
        ageLevel: this.state.ageLevel
      }
      updateActivity(req)
      this.props.history.push(`/user`)
    }
    catch (error) { console.error(error) }
  }


  _change = (title, description, length) => event => {
    this.setState({
      [title]: event.target.value,
      [description]: event.target.value,
      [length]: event.target.length
    });
  };

  render() {
    const ageIndex = this.state.ageLevel && this.state.ageLevels.findIndex(ageLevel => ageLevel.name == this.state.ageLevel.name)

    return (
      <div>
        {/* Instructive form heading */}
        <h1>Edit activity</h1>
          <form onSubmit={this.handleSubmit}>

            {/* Update age level for activity */}
            {/* BUG: Sometimes the age doesn't update the first time you 'save changes'. Only if you go back to edit page and save it again.  */}
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

            {/* Update your program title */}
            <TextField
              required
              id="title"
              label="Title"
              style={{ margin: 8 }}
              placeholder="My Fun Activity"
              // helperText="Update your activity title"
              margin="normal"
              type="title"
              value={this.state.title}
              onChange={this._change('title')}
              fullWidth
              variant="outlined"
            />

            <br/>

            {/* Update your description of the activty */}
            <TextField
              required
              id="description"
              label="Description"
              style={{ margin: 8 }}
              placeholder="Give details about this program, e.g. its purpose, theme, requirements etc."
              // helperText="Update your activity description"
              margin="normal"
              value={this.state.description}
              onChange={this._change('description')}
              multiline
              rowsMax="20"
              fullWidth
              variant="outlined"
              type="description"
            />

            <br/>
            
            {/* Update categories for this activity */}
            {/* <p>Category</p> */}

            {/* Update how many minutes your activity will be run for */}
            <TextField
              required
              id="len"
              label="Length"
              style={{ margin: 8}}
              placeholder="Enter number between 1 - 120"
              helperText="How many minutes will your activity run for?"
              margin="normal"
              type="length"
              value={this.state.length}
              onChange={this._change('length')}
              variant="outlined"
              focused="true" // What does 'focused' do?
            />
            <br />
            
            {/* Update attached files - add new file or remove existing file */}
            {/* <p>Attachments</p> */}

            {/* Click 'save changes' to update your program with the new details */}
            <Button type="submit" variant='contained' color="primary" style={{ 'backgroundColor': 'orange', margin: 15 }}>Save Changes</Button>
          
          </form>
      </div>

    )
  }
}

export default EditActivity