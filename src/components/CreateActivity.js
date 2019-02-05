import React, { Component } from 'react'
import { api, setJwt } from '../api/init'
import { Paper, Button, TextField } from '@material-ui/core'
import { addActivity } from '../services/ActivityService'
import { Redirect } from 'react-router-dom'
import PropTypes from 'prop-types'
import UploadFile from './UploadFile'

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
      console.log('title, description, length', title.value, description.value, len.value)
      const length= len.value
      if (!length.match(/[a-z][A-Z]/g) || length<1 || length >120) {
        alert ('Length must be between 1 and 120 minutes and digits only')
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
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
        <h1>Create a new activity to add to our share library</h1>

        <p>Age Level</p>
        <select onChange={this.handleChange} >
          { this.state.ageLevels.map((ageLevel,index) =>
            <option key={index} value={index}>{ageLevel.name}</option>
          )}

        </select>
        <br/>
        <TextField
          required
          id="title"
          label="Title"
          margin="normal"
          type="title"
          style={{width: "20rem"}}
        />

            <br />

        <TextField
          required
          id="description"
          label="Description"
          margin="normal"
          type="description"
          multiline={true}
          rowsMax="10"
          style={{width: "25rem"}}
          // rows={2}
          // rowsMax={4}
        />

            <br/>

        {/* <p>Category</p>
        <TextField
          required
          id="len"
          label="Length"
          margin="normal"
          type="len"
          style={{width: "20rem"}}
        /> */}

        {/* Allow user to upload a file relating to the activity the server */}
        <p>Attachments</p>
        <UploadFile />
        {/* <Button ref={UploadFile} type="file" variant='contained' color="primary" style={{ 'backgroundColor': 'orange' }}>Upload File</Button> */}
        <Button type="submit" variant='contained' color="primary" style={{ 'backgroundColor': 'orange' }}>Submit</Button>
        </form>
      </div>

    )
  }
}
export default CreateActivity;