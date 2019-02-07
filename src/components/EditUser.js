import React, { Component } from 'react'
import { api, setJwt } from '../api/init'
import { TextField, Button, Grid, Paper } from '@material-ui/core'

class EditUser extends Component {
    constructor(props) {
        super(props)

        this.state = {
            user: { name: {}, unit: {} },
            units: []
        }

    }

    componentDidMount() {
        const token = localStorage.getItem('token')
        setJwt(token)

        api.get('/users').then((res) => {
            this.setState({ user: { ...res.data } })
            console.log(this.state.user.unit)
        }).catch((err) => {
            console.error('Could not fetch user', err)
        })

        api.get('/units').then((res) => {
            this.setState({ units: res.data })
        }).catch((err) => {
            console.error('Could not fetch age levels', err)
        })

    }

    // _change = (value) => event => {
    //     switch(value)
    // }

    _changeEmail = () => event => {
        this.setState({
            user: {
                ...this.state.user,
                email: event.target.value
            }
        });
    }

    _changeFirstname = () => event => {
        this.setState({
            user: {
                ...this.state.user,
                name: { ...this.state.user.name, firstname: event.target.value }
            }
        })

        console.log(this.state.user._id)
    }

    _changeLastname = () => event => {
        this.setState({
            user: {
                ...this.state.user,
                name: { ...this.state.user.name, lastname: event.target.value }
            }
        })
    }

    _changeUnit = () => event => {
        this.setState({
            user: {
                ...this.state.user,
                unit: this.state.units[event.target.value]
            }
        })

        console.log(this.state.user.unit)
    }

    _changeGuideName = () => event => {
        this.setState({
            user: {
                name: { ...this.state.user.name, guidename: event.target.value }
            }
        })
    }

    _changePhone = () => event => {
        this.setState({
            user: {
                phone: { ...this.state.user, phone: event.target.value }
            }
        })
    }
    handleSubmit = (event) => {
        event.preventDefault()
        const token = localStorage.getItem("token")
        setJwt(token)

        // Getting values from the fields
        const { email, firstname, lastname, guidename } = event.target.elements

        // Structuring the object and assigning fields
        const load = {
            email: email.value,
            name: {
                firstname: firstname.value,
                lastname: lastname.value,
                guidename: guidename.value
            },
            unit: this.state.user.unit
        }

        // console.log(load)
        api.put('/users', load)
            .then((res) => {
                // this.props.history.push('/user')
            })
            .catch((err) => {
                console.log(err)
            })

        this.props.history.push(`/user`)
    }

    render() {
        const defaultUnitIndex = this.state.user.unit && this.state.units.findIndex(unit => unit.name == this.state.user.unit.name)
        return (
            <div>
            <h2>Edit Profile</h2>

            <Paper 
                style={{
                margin: '10% auto 0 auto',
                padding: '5%',
                maxWidth: 800,
                }}
            >

            <form onSubmit={this.handleSubmit}>

            <Grid 
                container
                spacing={16}
                direction="row"
                justify="center"
                alignItems="flex-start"
            >

            {/* User can update their email */}
            <Grid item xs={12} md={6}>
            <TextField
                required
                id="email"
                label="Email"
                type="email"
                value={this.state.user.email}
                onChange={this._changeEmail()}
                margin='normal'
                variant='outlined'
                style={{backgroundColor:'#F5F9FF'}}
                fullWidth
                InputLabelProps={{
                    shrink: true,
                }} 
            />
            </Grid>

            {/* User can update their first name */}
            <Grid item xs={12} sm={6}>
            <TextField
                required
                id="firstname"
                label="First Name"
                type='firstname'
                value={this.state.user.name.firstname}
                onChange={this._changeFirstname()}
                margin='normal'
                variant='outlined'
                style={{backgroundColor:'#F5F9FF'}}
                fullWidth
                InputLabelProps={{
                    shrink: true,
                }} 
            />
            </Grid>

            {/* User can update their last name */}
            <Grid item xs={12} sm={6}>
            <TextField
                required
                id="lastname"
                label="Last Name"
                type="lastname"
                value={this.state.user.name.lastname}
                onChange={this._changeLastname()}
                margin='normal'
                variant='outlined'
                style={{backgroundColor:'#F5F9FF'}}
                fullWidth
                InputLabelProps={{
                    shrink: true,
                }} 
            />
            </Grid>

            {/* User can update their Guide nickname */}
            <Grid item xs={12} sm={4} md={6}>
            <TextField
                required
                id='guidename'
                label="Guide Name"
                type="guidename"
                value={this.state.user.name.guidename}
                onChange={this._changeGuideName()}
                margin='normal'
                variant='outlined'
                style={{backgroundColor:'#F5F9FF'}}
                fullWidth
                InputLabelProps={{
                    shrink: true,
                }} 
            />
            </Grid>

            {/* User can update their phone number */}
            <Grid item xs={6} sm={4}>
            <TextField
                required
                id="phone"
                label="Phone Number"
                type="phone"
                value={this.state.user.phone}
                onChange={this._changePhone()}
                margin='normal'
                variant='outlined'
                style={{backgroundColor:'#F5F9FF'}}
                fullWidth
                InputLabelProps={{
                    shrink: true,
                }} 
            />
            </Grid>

            {/* User can update their unit association */}
            <Grid item xs={6} sm={4}>
            <TextField
                select
                value={defaultUnitIndex} 
                type='unitName' 
                id='unitName'
                onChange={this._changeUnit()}
                margin='normal'
                variant='outlined'
                style={{backgroundColor:'#D4E2FB'}}
                fullWidth
                InputLabelProps={{
                    shrink: true,
                }} 
            >
                {/* <option key={this.state.user.unit._id} value={this.state.user.unit.name}>{this.state.user.unit.name}</option> */}
                {this.state.units.map((unit, index) =>
                    <option key={index} value={index}>{unit.name}</option>
                )};
            </TextField>
            </Grid>
            
            {/* Users can submit their changes to the database to update their profile */}
            <Grid item xs={12}>
            <Button type="submit" variant="contained" color="primary">Update</Button>
            </Grid>
        
        </Grid>
        </form>
        </Paper>
        </div>
        )
    }
}

export default EditUser

