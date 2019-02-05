import React, { Component } from 'react';
import { Fab, Paper } from '@material-ui/core/';
import AddIcon from '@material-ui/icons/Add/';
import { api, setJwt } from '../api/init'
import { Link } from 'react-router-dom';
import Program from './Program'

const style = {
  Paper: {
      'width': '400px',
      'margin': '10% auto 0 auto',
      'textAlign': 'center',
      'padding': '5%'

  }
}

class Unit extends Component {
  state = {
    users: [],
    programs: []
  }

  componentDidMount() {
    const token = localStorage.getItem('token')
    setJwt(token)
    api.get('/units/myUnit').then((res) => {

      this.setState({ ...res.data })

    }).catch((err) => {
      console.error('Could not fetch user', err)
    })
  }
  

  render() {
    console.log(this.state.users[0])
    console.log(this.state.programs, 'programs')
    return (
      <React.Fragment>
        <h1>{this.state.unit && this.state.unit.name}</h1>
        <Paper style={style.Paper}>
          <h2>Guide Hut</h2>
        </Paper>

        {/* Display a list of leaders associated with the unit */}
        <Paper style={style.Paper}>
          <h2>Unit Leaders</h2>
          {this.state.users.map((user) => <p key={user._id}>{user.name.firstname} {user.name.lastname}</p>)}
        </Paper>

        {/* Display a list of programs created by the unit leaders */}
        <Paper style={style.Paper}>
          <h2>Unit Programs</h2>
          {this.state.programs.map((program) => {
              return (
                <Program key={program._id} program={program}></Program>
              )
            })}
          <Link to='/create-program'>
            <Fab size="medium" color="secondary" aria-label="Add" style={{ 'backgroundColor': 'orange' }}>
              <AddIcon />
            </Fab>
          </Link>
        </Paper>

        {/* Display a list of members belonging to the unit */}
        <Paper style={style.Paper}>
          <h2>Unit Members</h2>
          <Fab className="plusButton" size="medium" color="secondary" aria-label="Add" style={{ 'backgroundColor': 'orange' }}>
            <AddIcon />
          </Fab>
        </Paper>
      </React.Fragment>
    )
  }
}
export default Unit;