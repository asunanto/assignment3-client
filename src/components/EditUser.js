import React, { Component } from 'react'
import { api, setJwt } from '../api/init'
import { TextField, Button } from '@material-ui/core'

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
        }).catch((err) => {
            console.error('Could not fetch user', err)
        })

        api.get('/units').then((res) => {
            this.setState({ units: res.data })
        }).catch((err) => {
            console.error('Could not fetch age levels', err)
        })

    }
    _change = (firstname, lastname, email) => event => {
        console.log(lastname)
        this.setState({
            ...this.state,
            user: {
                ...this.state.user,
                name: {
                    ...this.state.user.name,
                    [firstname]: event.target.value,
                    [lastname]: event.target.value
                },
                [email]: event.target.value
            }
            // user: {
            //     ...this.state.user,
            //     [email]: event.target.value,
            //     name: {
            //         ...this.state.user.name,
            //         [firstname]: event.target.value,
            //         [lastname]: event.target.value
            //     },

            //     [unit]: {
            //         name: event.target.value
            //     }

            // }

            // [description]: event.target.value,
            // [length]: event.target.length
        });

        console.log(this.state.user)
    }

    handleSubmit(event) {
        event.preventDefault()
        // const token = localStorage.getItem("token")
        const { email, firstname, lastname, unit } = event.target.elements

        console.log(firstname)
        // setJwt(token)
        // const load = this.state.user
        // const load = {
        //     name: {
        //         [firstname]: event.target.elements.firstname.value,
        //         [lastname]: event.target.elements.lastname.value
        //     },
        //     email: event.target.elements.email.value,
        //     unit: {
        //         name: event.target.elements.unit.value
        //     }
        // }
        // console.log(load)
        // / api.put('/users', load).then(

        // )
    }

    render() {
        return (<form onSubmit={this.handleSubmit}>

            <h2>Edit Profile</h2>
            <TextField
                required
                id="email"
                label="Email"
                margin="normal"
                type="email"
                value={this.state.user.email}
                onChange={this._change('email')}
            /><br />
            <TextField
                required
                id="first-name"
                label="First Name"
                margin="normal"
                type='firstname'
                value={this.state.user.name.firstname}
                onChange={this._change('firstname')}
            /><br />
            <TextField
                required
                id="last-name"
                label="Lastname"
                margin="normal"
                type="lastname"
                value={this.state.user.name.lastname}
                onChange={this._change('lastname')}

            />
            <br />

            <select type='unit' onChange={this._change('unit')} >
                {/* <option key={this.state.user.unit._id} value={this.state.user.unit.name}>{this.state.user.unit.name}</option> */}
                {this.state.units.map((unit) =>
                    <option key={unit._id} value={unit.name}>{unit.name}</option>
                )};
                </select>

            <br />
            <Button type="submit" variant="contained" color="primary">Change</Button>
        </form>)
    }

}

export default EditUser

