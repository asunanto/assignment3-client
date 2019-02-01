import React, { Component } from 'react';
import { api, setJwt } from '../api/init'
import { Paper, Button, TextField } from '@material-ui/core'

class EditProgram extends Component {
    state = {
        name: '',
        ageLevels: []
    }

    componentDidMount() {
        const { id } = this.props.match.params
        api.get(`/programs/${id}`).then((res) => {
            this.setState({ ...res.data })
        }).catch((err) => {
            console.error('Could not fetch program', err)
        })

    }


    handleSubmit = async (e) => {
        const token = localStorage.getItem("token")
        setJwt(token)
        e.preventDefault()
        try {
            const { id } = this.props.match.params
            const { name, description, length, date } = e.target.elements
            const response = await api.put(`/programs/${id}`, {
                name: name.value,
                description: description.value,
                date: date.value,
                length: length.value
            })
        }
        catch (error) { console.error(error) }
    }


    _change = (name, description, length, date) => event => {
        this.setState({
            [name]: event.target.value,
            [description]: event.target.value,
            [date]: event.target.value,
            [length]: event.target.length
        });
    };

    render() {

        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <h1>Edit Program Details</h1>
                    <TextField
                        required
                        id="name"
                        label="Name"
                        margin="normal"
                        type="name"
                        value={this.state.name}
                        onChange={this._change('name')}
                    />
                    <br />
                    <TextField
                        required
                        id="description"
                        label="Description"
                        margin="normal"
                        type="description"
                        value={this.state.description}
                        multiline={true}
                        onChange={this._change('description')}
                    />
                    <br />
                    <p>Category</p>
                    <TextField
                        required
                        id="length"
                        label="Length"
                        margin="normal"
                        type="length"
                        value={this.state.length}
                        onChange={this._change('length')}
                    />
                    <br />
                    <p>Category</p>
                    <TextField
                        required
                        id="date"
                        label="Date"
                        margin="normal"
                        type="date"
                        value={this.state.date}
                        onChange={this._change('date')}
                    />

                    <p>Attachments</p>
                    <Button type="submit" variant='contained' color="primary" style={{ 'backgroundColor': 'orange' }}>Save Changes</Button>
                </form>
            </div>

        )
    }
}

export default EditProgram