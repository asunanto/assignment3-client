import React, { Component } from 'react'
import { api, setJwt } from '../api/init'
import { Paper, Button, TextField, Grid } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles';

class CreateProgram extends Component {

    handleSubmit = (e) => {
        const token = localStorage.getItem("token")
        setJwt(token)
        e.preventDefault()

        try {
            const { name, description, len, date } = e.target.elements
            console.log(len.value)
            api.post('/programs', {
                name: name.value,
                description: description.value,
                date: date.value,
                length: len.value
            })
                .then((response) => {
                    this.props.history.push(`/programs/${response.data._id}/updateactivities`)
                })

        }
        catch (error) { console.error(error) }
    }

    render() {
        return (
            <div>
            {/* Instructive form heading */}
            <h1>Create a new program for your unit</h1>
            
            <Paper 
                style={{
                margin: '10% auto 0 auto',
                padding: '5%',
                maxWidth: 800,
                }}
            >

                <form onSubmit={this.handleSubmit}>
                    {console.log(this.props.history)}

                <Grid 
                    container
                    spacing={16}
                    direction="row"
                    justify="center"
                    alignItems="flex-start"
                >

                    {/* Give your program a name */}
                    <Grid item xs={12}>
                    <TextField
                        required
                        id="name"
                        style={{backgroundColor:'#F5F9FF'}}
                        label="Title"
                        placeholder="Give your program a title"
                        fullWidth
                        margin="normal"
                        variant="outlined"
                        type="name" // What does 'type' mean?
                        InputLabelProps={{
                            shrink: true,
                        }} 
                    />
                    </Grid>

                    {/* Write a description of your program */}
                    <Grid item xs={12}>
                    <TextField
                        required
                        id="description"
                        label="Description"
                        style={{backgroundColor:'#F5F9FF'}}
                        placeholder="Write a short description of your program"
                        multiline
                        rowsMax="20" // Once the text exceeds 20 lines, the container becomes scrollable
                        fullWidth
                        margin="normal"
                        variant="outlined"
                        type="description"
                        InputLabelProps={{
                            shrink: true,
                        }} 
                    />
                    </Grid>

                    {/* When will your program be run? */}
                    <Grid item xs={6} sm={4}>
                    <TextField
                        required
                        id="date"
                        label="Date"
                        style={{backgroundColor:'#D4E2FB'}}
                        placeholder="When will you run your program?"
                        margin="normal"
                        variant="outlined"
                        fullWidth
                        type="date"
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                    </Grid>

                    {/* How many minutes will your program run for? */}
                    {/* In the designs, this 'length' field has two pickers instead: 'start time' and 'end time' from which the length was to be calculted */}
                    <Grid item xs={6} sm={4}>
                    <TextField
                        required
                        id="len"
                        label="Length"
                        placeholder="1 - 120 minutes"
                        // helperText="How many minutes will your program run for?"
                        margin="normal"
                        variant="outlined"
                        fullWidth
                        type="length"
                        style={{backgroundColor:'#D4E2FB'}}
                        InputLabelProps={{
                            shrink: true,
                        }} 
                    />
                    </Grid>

                    {/* Attach files (optional) */}
                    <Grid item xs={12} sm={4}>
                    <TextField
                        style={{backgroundColor:'#D4E2FB'}}
                        id="attachment"
                        label="Attachment"
                        placeholder="Upload any helpful files"
                        // helperText="Do you want to attach any helpful files?"
                        margin="normal"
                        fullWidth
                        variant="outlined"
                        InputLabelProps={{
                            shrink: true,
                        }} 
                    />
                    </Grid>

                    {/* Click 'next' to continue to form's second step: 'add activities to program' */}
                    <Grid item xs={12}>
                    <Button 
                        type="submit" 
                        variant='contained' 
                        color="primary" 
                        style={{ 'backgroundColor': 'orange',  }}
                    >
                        Next
                    </Button>
                    </Grid>

                    </Grid>
                </form>
                </Paper>
            </div>
        )
    }
}

export default CreateProgram