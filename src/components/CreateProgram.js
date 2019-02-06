import React, { Component } from 'react'
import { api, setJwt } from '../api/init'
import { Paper, Button, TextField } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles';

// const styles = theme => ({
//     paper: {
//       'width': '400px',
//       'margin': '10% auto 0 auto',
//       'textAlign': 'center',
//       'padding': '5%'
//     },
//     textField: {
//         marginLeft: theme.spacing.unit,
//     }
// });

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
            {/* <Paper style={styles.paper}> */}
                <form onSubmit={this.handleSubmit}>
                    {console.log(this.props.history)}

                    {/* Give your program a name */}
                    <TextField
                        required
                        id="name"
                        style={{ margin: 8 }}
                        label="name"
                        placeholder="My Awesome Program"
                        helperText="Give your program a name"
                        fullWidth
                        margin="normal"
                        variant="outlined"
                        type="name" // What does 'type' mean?
                    />
                    <br />

                    {/* Write a description of your program */}
                    <TextField
                        required
                        id="description"
                        label="Description"
                        style={{ margin: 8 }}
                        placeholder="Give details about this program, e.g. its purpose, theme, requirements etc."
                        helperText="Write a descritpion of your program"
                        multiline
                        rowsMax="20" // Once the text exceeds 20 lines, the container becomes scrollable
                        fullWidth
                        margin="normal"
                        variant="outlined"
                        type="description"
                    />
                    <br />

                    {/* When will your program be run? */}
                    <TextField
                        required
                        id="date"
                        label="Date"
                        style={{ margin: 8}}
                        helperText="When will you run your program?"
                        margin="normal"
                        variant="outlined"
                        type="date"
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                    <br />

                    {/* How many minutes will your program run for? */}
                    {/* In the designs, this 'length' field has two pickers instead: 'start time' and 'end time' from which the length was to be calculted */}
                    <TextField
                        required
                        id="len"
                        label="Length"
                        style={{ margin: 8}}
                        placeholder="Enter number between 1 - 120"
                        helperText="How many minutes will your program run for?"
                        margin="normal"
                        variant="outlined"
                        type="length"
                    />
                    <br />

                    {/* Attach files (optional) */}
                    {/* <p>Attachments</p> */}

                    {/* Click 'next' to continue to form's second step: 'add activities to program' */}
                    <Button 
                        type="submit" 
                        variant='contained' 
                        color="primary" 
                        style={{ 'backgroundColor': 'orange', margin: 15 }}
                    >
                        Next
                    </Button>
                
                </form>
                {/* </Paper> */}
            </div>
        )
    }
}

export default CreateProgram