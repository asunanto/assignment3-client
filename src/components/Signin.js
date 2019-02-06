import React, { Component } from 'react'
import logo from '../assets/logo.svg'
import { Paper, Button, TextField } from '@material-ui/core'
import { Link } from 'react-router-dom'
const style = {
    Paper: {
        'width': '500px',
        'margin': '10% auto 0 auto',
        'textAlign': 'center',
        'padding': '5%'

    }
}

export default ({ handleSignIn, loginError }) => (
    <Paper style={style.Paper}>
        <img src={logo} alt="Girl Guides Australia Logo"></img>
        <form onSubmit={handleSignIn}>

            {loginError && <p>{loginError}</p>}
            <TextField
                required
                id="email"
                label="Email"
                margin="normal"
                type="email"
            />
            <br />
            <TextField
                required
                id="password"
                label="Password"
                margin="normal"
                type="password"
            />
            <br />
            <Button type="submit" variant="contained" color="primary" style={{ 'margin': 15 }}>Sign In</Button>
            <Link to='/signup'><Button type="button" variant='contained' color="primary" style={{ 'backgroundColor': 'orange', margin: 15 }}>Sign Up</Button></Link>
        </form>

    </Paper >
)
