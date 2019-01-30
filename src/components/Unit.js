import React, { Component } from 'react';
import { Fab } from '@material-ui/core/';
import AddIcon from '@material-ui/icons/Add/';
import { api, setJwt } from '../api/init'
class Unit extends Component {
  state = {
    users: []
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
    return (
      <div>
        <h1>{this.state.unit && this.state.unit.name}</h1>
        <h2>Guide Hut</h2>
        <p>Brisbane</p>
        <h2>Unit Leaders</h2>

        {this.state.users.map((user) => <p key={user._id}>{user.name.firstname} {user.name.lastname}</p>)}


        <h2>Unit Programs</h2>

        <Fab size="medium" color="secondary" aria-label="Add" style={{ 'backgroundColor': 'orange' }}>
          <AddIcon />
        </Fab>
        <h2>Unit Members</h2>
        <Fab size="medium" color="secondary" aria-label="Add" style={{ 'backgroundColor': 'orange' }}>
          <AddIcon />
        </Fab>
      </div>
    )
  }
}
export default Unit;