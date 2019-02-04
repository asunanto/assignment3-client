import React, { Component } from 'react';
import { Button, Fab, Paper } from '@material-ui/core/';
import AddIcon from '@material-ui/icons/Add/';
import { api, setJwt } from '../api/init'
import { Link } from 'react-router-dom';
import store from '../config/store'
// import { fetchUser } from '../services/UserService'

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
      this.setState({ ...res.data })

    }).catch((err) => {

      console.error('Could not fetch user', err)
    })

    api.get('/users/programs').then((res) => {
      console.log(res)
      this.setState({ ...this.state, programs: res.data })

    }).catch((err) => {
      console.error('Could not fetch programs', err)
    })

    api.get('/users/activities').then((res) => {
      this.setState({ ...this.state, activities: res.data })
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
        <Paper style={style.Paper}>
          <h2>My Programs</h2>
          {
            this.state.programs.map((program) => {
              return (
                <div key={program._id}>
                  <h3>{program.name}</h3>
                  <p>{program.description}</p>
                  <Link to={`programs/${program._id}`}><button>Visit</button></Link>
                </div>
              )
            })
          }
          <Fab size="medium" color="secondary" aria-label="Add" style={{ 'backgroundColor': 'orange' }}>
            <AddIcon />
          </Fab>
        </Paper>
        <Paper style={style.Paper}>
          <h2>My Activities</h2>
          {
            this.state.activities.map((activity) => {
              return (
                <div key={activity._id}>
                  <h3>{activity.name}</h3>
                  <p>{activity.description}</p>
                  <Link to={`/activities/${activity._id}`}><button>Visit</button></Link>
                </div>
              )
            })
          }
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