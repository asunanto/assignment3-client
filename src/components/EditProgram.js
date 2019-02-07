import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { api, setJwt } from '../api/init'
import { Paper, Button, TextField, Grid, Typography, Toolbar } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles';
import store from '../config/store'
import { fetchProgram } from '../services/ProgramService'

const styles = theme => ({
    root: {
        width: '100%',
        minWidth: '200px'
    },
    paper: {
        margin: '10% auto 0 auto',
        padding: '5%',
        maxWidth: 800,
        minWidth: 300
    },
    grid: {
        direction: "row",
        justify: "center",
        alignItems: "flex-start"
    },
})

class EditProgram extends Component {
    state = {
        program: {
            name: '',
            description: '',
            length: '',
            date: ''
        },
        activities: []
    }

    componentDidMount() {
        api.get(`programs/${this.props.match.params.id}`).then((res) => {
            this.setState(res.data)
        })
    }

    handleSubmit = (e) => {
        const token = localStorage.getItem("token")
        setJwt(token)
        e.preventDefault()
        try {
            const { id } = this.props.match.params
            const { name, description, len, date } = e.target.elements

            const length = parseInt(len.value)
            if (isNaN(length) || length < 1 || length > 120) {
                alert('Length must be between 1 and 120 minutes and digits only')
                return
            }

            api.put(`/programs/${id}`, {
                name: name.value,
                description: description.value,
                length: len.value,
                date: date.value

            })
                .then((response) => {
                    this.props.history.push(`/user`)
                })
        }
        catch (error) { console.error(error) }
    }

    _change = (name, description, len, date) => event => {
        this.setState({
            program: {
                [name]: event.target.value,
                [description]: event.target.value,
                [len]: event.target.value,
                [date]: event.target.value

            }
        });
    };

    render() {
        const { classes } = this.props

        return (
            <div className={classes.root}>

                <h1>Edit Program</h1>

                <Paper className={classes.paper}>

                    <form onSubmit={this.handleSubmit}>

                        <Grid container className={classes.grid} spacing={16}>

                            {/* Update your program title */}
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    id="name"
                                    label="Title"
                                    style={{ backgroundColor: '#F5F9FF' }}
                                    placeholder="My Awesome Program"
                                    // helperText="Update your program title"
                                    margin="normal"
                                    type="name"
                                    value={this.state.program.name}
                                    onChange={this._change('name')}
                                    fullWidth
                                    variant="outlined"
                                    InputLabelProps={{
                                        shrink: true,
                                    }} // When you begin typing, this makes sure the Labels don't cover up the other fields' input boxes and overlap with the prefilled text. 
                                />
                            </Grid>

                            {/* Update your description of the program */}
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    id="description"
                                    label="Description"
                                    style={{ backgroundColor: '#F5F9FF' }}
                                    placeholder="Give details about this program, e.g. its purpose, theme, requirements etc."
                                    // helperText="Update your program description"
                                    value={this.state.program.description}
                                    multiline
                                    rowsMax="20"
                                    onChange={this._change('description')}
                                    variant="outlined"
                                    fullWidth
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                />
                            </Grid>

                            {/* Update the date when your program will be run */}
                            <Grid item xs={6} sm={4}>
                                <TextField
                                    required
                                    id="date"
                                    label="Date"
                                    style={{ backgroundColor: '#D4E2FB' }}
                                    // helperText="When will you run your program?"
                                    margin="normal"
                                    variant="outlined"
                                    type="date"
                                    fullWidth
                                    value={this.state.program.date}
                                    onChange={this._change('date')}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                />
                            </Grid>

                            {/* Update how many minutes your program will be run for */}
                            <Grid item xs={6} sm={4}>
                                <TextField
                                    required
                                    id="len"
                                    label="Length"
                                    style={{ backgroundColor: '#D4E2FB' }}
                                    placeholder="Enter number between 1 - 120"
                                    // helperText="How many minutes will your program run for?"
                                    margin="normal"
                                    type="length"
                                    value={this.state.program.length}
                                    onChange={this._change('len')}
                                    variant="outlined"
                                    fullWidth
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                />
                            </Grid>

                            {/* Update attached files - add new file or remove existing file */}
                            <Grid item xs={12} sm={4}>
                                <TextField
                                    style={{ backgroundColor: '#D4E2FB' }}
                                    id="attachment"
                                    label="Attachment"
                                    placeholder="Upload relevant files"
                                    // helperText="Do you want to attach any helpful files?"
                                    margin="normal"
                                    fullWidth
                                    variant="outlined"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                />
                            </Grid>

                            {/* Click 'save changes' to update your program with the new details */}
                            <Grid item xs={12}>
                                <Button
                                    type="submit"
                                    variant='contained'
                                    color="primary"
                                    style={{ 'backgroundColor': 'orange', }}
                                >
                                    Save Changes
                    </Button>
                            </Grid>

                        </Grid>
                    </form>
                </Paper>
            </div>

        )
    }
}

EditProgram.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(EditProgram)
