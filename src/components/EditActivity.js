import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { api, setJwt } from '../api/init'
import { Paper, Button, TextField, Grid, Typography, Toolbar } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles';
import { updateActivity } from '../services/ActivityService';

const styles = theme => ({
  root: {
      width: '100%',
      minWidth: '200px'
  },
  paper: {
      margin: '10% auto 0 auto',
      padding: '5%',
      maxWidth: 800,
      minWidth: 300
  },
  grid: {
      direction: "row",
      justify: "center",
      alignItems: "flex-start"
  },
})

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
    const {classes} = this.props

    return (
<<<<<<< HEAD
        <div className={classes.root}>

        <h1>Edit Activity</h1>

        <Paper className={classes.paper}>

          <form onSubmit={this.handleSubmit}>

          <Grid container className={classes.grid} spacing={16}>

            {/* Update your program title */}
            <Grid item xs={8} md={10}>
            <TextField
              required
              style={{backgroundColor:'#F5F9FF'}}
              id="title"
              label="Title"
              placeholder="My Fun Activity"
              // helperText="Update your activity title"
              margin="normal"
              type="title"
              value={this.state.title}
              onChange={this._change('title')}
              fullWidth
              variant="outlined"
            />
            </Grid>

            {/* Update age level for activity */}
            {/* BUG: Sometimes the age doesn't update the first time you 'save changes'. Only if you go back to edit page and save it again.  */}
            <Grid item xs={4} md={2}>
            <TextField
              style={{backgroundColor:'#D4E2FB'}}
              id="age"
              label="Age Level"
              fullWidth
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
            </Grid>

            {/* Update your description of the activty */}
            <Grid item xs={12}>
            <TextField
              required
              style={{backgroundColor:'#F5F9FF'}}
              id="description"
              label="Description"
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
            </Grid>
            
            {/* Update categories for this activity */}
            {/* <p>Category</p> */}

            {/* Update how many minutes your activity will be run for */}
            <Grid item xs={6} sm={4}>
            <TextField
              required
              style={{backgroundColor:'#D4E2FB'}}
              id="len"
              label="Length"
              placeholder="Enter number between 1 - 120"
              // helperText="How many minutes will your activity run for?"
              margin="normal"
              type="length"
              value={this.state.length}
              onChange={this._change('length')}
              variant="outlined"
            />
            </Grid>
            
            {/* Give categories to this activity */}
          <Grid item xs={6} sm={4}>
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

           {/* Update attached files - add new file or remove existing file */}
          <Grid item xs={12} sm={4}>
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

            {/* Click 'save changes' to update your program with the new details */}
            <Grid item xs={12}>
              <Button type="submit" variant='contained' color="primary" style={{ 'backgroundColor': 'orange', margin: 15 }}>Save Changes</Button>
            </Grid>

          </Grid>
          </form>
          </Paper>
=======
      <div>
        
        <form onSubmit={this.handleSubmit}>
        <h1>Edit activity</h1>
        <p>Age Level</p>
        <select value={ageIndex} onChange={this.handleChange} >
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
          value={this.state.title}
          onChange={this._change('title')}
          style={{width: "20rem"}}
        />

        <br/>

        <TextField
          required
          id="description"
          label="Description"
          margin="normal"
          type="description"
          value={this.state.description}
          onChange={this._change('description')}
          autoFocus="true"
          rowsMax="10"
          style={{width: "25rem"}}
        />

        <br/>

        <p>Category</p>
        <TextField
          required
          id="length"
          label="Length"
          margin="normal"
          type="length"
          value={this.state.length}
          onChange={this._change('length')}
          focused="true"
          style={{width: "20rem"}}
        />
        
        <p>Attachments</p>
        <Button type="submit" variant='contained' color="primary" style={{ 'backgroundColor': 'orange' }}>Save Changes</Button>
        </form>
>>>>>>> f3bcf5120e59314153a57835adb103916a55114c
      </div>

    )
  }
}

EditActivity.propTypes = {
  classes: PropTypes.object.isRequired,
};


export default withStyles(styles)(EditActivity)