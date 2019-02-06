import React, { Component } from 'react';
import { Button, Fab, Paper } from '@material-ui/core/';
import AddIcon from '@material-ui/icons/Add';
import { api, setJwt } from '../api/init'
import { Link } from 'react-router-dom';
// import store from '../config/store'
// import { fetchUser } from '../services/UserService'
import Activity from './Activity'
import Program from './Program'

const style = {
  Paper: {
    'width': '400px',
    'margin': '10% auto 0 auto',
    'textAlign': 'center',
    'padding': '5%'

  }
}

class User extends Component {
  state = { programs: [], activities: [] }



  componentDidMount() {
    const token = localStorage.getItem('token')
    setJwt(token)
    api.get('/users').then((res) => {
      this.setState(res.data)
    }).catch((err) => {
      console.error('Could not fetch user', err)
    })
    api.get('/users/programs').then((res) => {
      console.log(res)
      this.setState({ programs: res.data })
    }).catch((err) => {
      console.error('Could not fetch programs', err)
    })
    api.get('/users/activities').then((res) => {
      this.setState({ activities: res.data })
    }).catch((err) => {
      console.error('Could not fetch programs', err)
    })
  }

  render() {
    return (
      <React.Fragment>
        <h1>Hi, {this.state.name && this.state.name.firstname}!</h1>
        <Link to={'/user/edit'}>
          <Button className="textButton" type="button" variant='contained' color="primary" style={{ 'backgroundColor': 'orange' }}>Manage Account</Button>
        </Link>
        <Button className="textButton" type="button" variant='contained' color="primary" style={{ 'backgroundColor': '#ff3535' }} onClick={this.props.handleSignOut}>Log Out</Button>
        <Paper style={style.Paper}>
          <h2>My Guide Hut</h2>
        </Paper>

        {/* For each program created by the user, show as a ProgramCard */}
        <Paper style={style.Paper}>
          <h2>My Programs</h2>
          {this.state.programs.map((program) => {
            return (
              <Program key={program._id} program={program}></Program>
            )
          })}
          <Link to='/create-activity/'>
            <Fab size="medium" color="secondary" aria-label="Add" style={{ 'backgroundColor': 'orange' }}>
              <AddIcon />
            </Fab>
          </Link>
        </Paper>

        {/* For each activity created by the user, show as an ActivityCard */}
        <Paper style={style.Paper}>

          <h2>My Activities</h2>
          {this.state.activities.map((activity) => {
            return (
              <div key={activity._id}>
                <Activity activity={activity}></Activity>
              </div>
            )
          })}
          <Link to='/create-activity/'>
            <Fab size="medium" color="secondary" aria-label="Add" style={{ 'backgroundColor': 'orange' }}>
              <AddIcon />
            </Fab>
          </Link>
        </Paper>

      </React.Fragment>
    )
  }
}
export default User;