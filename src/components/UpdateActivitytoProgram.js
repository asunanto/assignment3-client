import React, { Component } from 'react'
import { api, setJwt } from '../api/init'
import store from '../config/store'
import { fetchProgram } from '../services/ProgramService';
import { Paper, Button, TextField, Grid} from '@material-ui/core'
import Activity from './Activity'
// import fetchActivities from '../services/ActivityService'

class UpdateActivitytoProgram extends Component {

    state = {
        options: [],
        activities: [],
        direction: 'row',
        justify: 'center',
        alignItems: 'center'
    }

    onChange = (e) => {
        const options = this.state.options
        console.log(options)

        if (e.target.checked) {
            // add the numerical value of the checkbox to options array
            options.push(this.state.activities[e.target.value])
        } else {
            // or remove the value from the unchecked checkbox from the array
            let index = options.indexOf(this.state.activities[e.target.value])
            options.splice(index, 1)

        }
    }

    handleSubmit = (e) => {
        const token = localStorage.getItem("token")
        setJwt(token)
        e.preventDefault()
        try {
            api.put(`/programs/${this.props.match.params.id}/addActivities`,
                this.state.options)
                // console.log(this.state.options)
                .then((response) => {
                    this.props.history.push(`/user`)
                })

        }
        catch (error) { console.error(error) }
    }

    componentDidMount() {
        api.get('/activities').then((res) => {
            this.setState({ activities: res.data })
        }).catch((err) => {
            console.log(err)
        })
        fetchProgram(this.props.match.params.id)
    }

    render() {
        const program = store.getState().program
        const { alignItems, direction, justify } = this.state;

        return (
            <div>
   
                <h1>Add Activities to {program && program.program.name}</h1>

                <form onSubmit={this.handleSubmit}>

                    {/* Click 'done' to update the program with selected activities */}
                    <Button type="submit" variant='contained' color="primary" style={{ 'backgroundColor': 'orange', margin: 15 }}>
                        Done
                    </Button>

                    {/* Render a list of activities (cards) with a checkbox selector */}
                    <Grid
                        container
                        spacing={16}
                        direction={direction}
                        justify={justify}
                        alignItems={alignItems} 
                    >
                        {this.state.activities.map((activity) => (
                            <div className="input-group">
                                <Activity key={activity._id} activity={activity} />
                                {/* Tick the checkbox to add a given activity to your program */}
                                <input type="checkbox" onChange={this.onChange} />
                            </div>
                            )
                        )}
                    </Grid>
                    
                </form>

            </div>
        )
    }
}

export default UpdateActivitytoProgram;