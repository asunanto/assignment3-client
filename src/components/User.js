import React, { Component } from 'react';
import { Button, Fab } from '@material-ui/core/';
import AddIcon from '@material-ui/icons/Add/';
import { api, setJwt } from '../api/init'
// import { fetchUser } from '../services/UserService'



class User extends Component {
  state = {
    name: 'Leader'
  }

  componentDidMount() {
    const token = localStorage.getItem('token')
    setJwt(token)
    api.get('/users').then((res) => {

      this.setState({ ...res.data })

    }).catch((err) => {
      console.error('Could not fetch user', err)
    })
  }

  render() {
    console.log(this.user)
    return (
      <div>
        <h1>Hi, {this.state.name.firstname}!</h1>
        <Button type="button" variant='contained' color="primary" style={{ 'backgroundColor': 'orange' }}>Manage Account</Button>
        <h2>My Guide Hut</h2>
        <p>Brisbane</p>
        <h2>My Programs</h2>
        <Fab size="medium" color="secondary" aria-label="Add" style={{ 'backgroundColor': 'orange' }}>
          <AddIcon />
        </Fab>
        <h2>My Activities</h2>
        <Fab size="medium" color="secondary" aria-label="Add" style={{ 'backgroundColor': 'orange' }}>
          <AddIcon />
        </Fab>
      </div>
    )
  }
}
export default User;