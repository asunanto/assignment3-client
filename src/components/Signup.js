import React from 'react'
import { Paper, Button, TextField } from '@material-ui/core'

const style = {
    Paper: {
        'width': '500px',
        'margin': '10% auto 0 auto',
        'textAlign': 'center',
        'padding': '5%'

    }
}

export default ({ handleSignUp, signupError, units }) => (
    <Paper style={style.Paper}>
        <h2>Register</h2>

        <form onSubmit={handleSignUp}>
            {signupError && <p>{signupError}</p>}
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

            <TextField
                required
                id="firstname"
                label="First Name"
                margin="normal"
                type="firstname"
            />
            <br />
            <TextField
                required
                id="lastname"
                label="Last Name"
                margin="normal"
                type="lastname"
            />
            <br />

            <TextField
                required
                id="guidename"
                label="Guide Name"
                margin="normal"
                type="guidename"
            />
            <br />

            <TextField
                required
                id="membershipNo"
                label="Membership Number"
                margin="normal"
                type="membershipNo"
            />
            <br />

            <TextField
                required
                id="phone"
                label="Phone Number"
                margin="normal"
                type="phone"
            />
            <br />

            <select type="unit" id="unit">
                {units.map((unit, index) =>
                    <option key={index} value={index}>{unit.name}</option>)}
            </select>
            <Button type="submit" variant="contained" color="primary">Register</Button>

        </form>

    </Paper>
)