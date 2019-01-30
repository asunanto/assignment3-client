import React, { Component } from 'react';
import { api, setJwt } from '../api/init'
import { Paper, Button, TextField } from '@material-ui/core'

class CreateProgram extends Component {

    handleSubmit = async (e) => {
        const token = localStorage.getItem("token")
        setJwt(token)
        e.preventDefault()
        try {
            const { name, description, length, date } = e.target.elements
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
                    {/* <p>Age Level</p>
                    <select onChange={this.handleChange} >
                        {this.state.ageLevels.map((ageLevel, index) =>
                            <option key={index} value={index}>{ageLevel.name}</option>
                        )}; */}
                    {/* </select> */}
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
                        // label="Date"
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


    // render() {
    //     return (
    //         <Paper style={style.Paper}>
    //             <h1>Create a new program for your upcoming meeting</h1>
    //             <form>
    //                 {/* <input type='email' id='email' name="email" placeholder='Enter your email' required /><br /> */}
    //                 {/* <input type='password' id='password' name="password" placeholder='Password' required /><br /> */}

    //                 <TextField
    //                     required
    //                     id="standard-textarea"
    //                     margin="normal"
    //                     placeholder="Give your program a title"
    //                     multiline
    //                 />
    //                 <br />
    //                 <TextField
    //                     required
    //                     id="standard-textarea"
    //                     margin="normal"
    //                     placeholder="Write a short description of your program"
    //                     multiline
    //                 />
    //                 <br />
    //                 <Button type="button" variant='contained' color="primary" style={{ 'backgroundColor': 'orange' }}>Next</Button>
    //             </form>

    //         </Paper>
    //     )
    // }
}

export default CreateProgram;