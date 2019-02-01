import React, { Component } from 'react'
import { api, setJwt } from '../api/init'
import { Paper, Button, TextField } from '@material-ui/core'

class CreateProgram extends Component {

    handleSubmit = async (e) => {
        const token = localStorage.getItem("token")
        setJwt(token)
        e.preventDefault()

        try {
            const { name, description, length, date } = e.target.elements
            console.log(date.value)
            const response = await api.post('/programs', {
                name: name.value,
                description: description.value,
                date: date.value,
                length: length.value
            })
        }
        catch (error) { console.error(error) }
    }

    render() {

        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <h1>Create a new program for your unit</h1>
                    <TextField
                        required
                        id="name"
                        label="Name"
                        margin="normal"
                        type="name"
                    />
                    <br />
                    <TextField
                        required
                        id="description"
                        label="Description"
                        margin="normal"
                        type="description"
                    />
                    <br />
                    <p>Date</p>
                    <TextField
                        required
                        id="date"
                        margin="normal"
                        type="date"
                    />
                    <br />
                    <TextField
                        required
                        id="length"
                        label="Length"
                        margin="normal"
                        type="length"
                    />
                    <p>Attachments</p>
                    <Button type="submit" variant='contained' color="primary" style={{ 'backgroundColor': 'orange' }}>Create</Button>
                </form>
            </div >

        )
    }
}

export default CreateProgram;