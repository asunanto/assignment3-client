import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { api, setJwt } from '../api/init'
import { Paper, Button, TextField, Grid, Typography, Toolbar } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar'
import logo from '../assets/logo.svg'

const styles = theme => ({
    root: {
        width: '100%',
        minWidth: '200px'
    },
    title: {
        [theme.breakpoints.up('sm')]: {
            display: 'block',
            fontSize: '30px'
        },
        [theme.breakpoints.up('lg')]: {
            display: 'block',
            fontSize: '40px'
        }
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
    logo: {
        display: 'flex-end',
        padding: '5%',
        marginLeft: 0,
        marginRight: theme.spacing.unit * 2,
    },
    logoIcon: {
        width: '40px',
        [theme.breakpoints.up('sm')]: {
            width: '60px'
        },
        [theme.breakpoints.up('md')]: {
            width: '80px'
        },
        [theme.breakpoints.up('lg')]: {
            width: '100px'
        },
    }
})

class CreateProgram extends Component {

    handleSubmit = (e) => {
        const token = localStorage.getItem("token")
        setJwt(token)
        e.preventDefault()

        try {
            const { name, description, len, date } = e.target.elements

            const length = parseInt(len.value)
            if (isNaN(length) || length < 1 || length > 120) {
                alert('Length must be between 1 and 120 minutes and digits only')
                return
            }

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
        const { classes } = this.props

        return (
            <div className={classes.root}>

                {/* Screen Title */}
                <AppBar position="static" style={{ backgroundColor: "#0033A1" }}>
                    <Toolbar>
                        <div className={classes.logo}>
                            <img src={logo} alt="Girl Guides Australia Logo" className={classes.logoIcon}></img>
                        </div>
                        <Typography className={classes.title} variant="h6" color="inherit" noWrap>
                            Create a New Program
                            {/* Girl Guides Helper App */}
                        </Typography>
                    </Toolbar>
                </AppBar>

                <Paper className={classes.paper}>

                    <form onSubmit={this.handleSubmit}>
                        {console.log(this.props.history)}

                        <Grid container className={classes.grid} spacing={16}>

                            {/* Give your program a name */}
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    id="name"
                                    style={{ backgroundColor: '#F5F9FF' }}
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
                                    style={{ backgroundColor: '#F5F9FF' }}
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
                                    style={{ backgroundColor: '#D4E2FB' }}
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
                                    style={{ backgroundColor: '#D4E2FB' }}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                />
                            </Grid>

                            {/* Attach files (optional) */}
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

                            {/* Click 'next' to continue to form's second step: 'add activities to program' */}
                            <Grid item xs={12}>
                                <Button
                                    type="submit"
                                    variant='contained'
                                    color="primary"
                                    style={{ 'backgroundColor': 'orange', }}
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

CreateProgram.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CreateProgram)