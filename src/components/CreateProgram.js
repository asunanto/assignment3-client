import React, { Component } from 'react';
import { Paper, Button, TextField } from '@material-ui/core'

const style = {
    Paper: {
        'width': '500px',
        'margin': '10% auto 0 auto',
        'textAlign': 'center',
        'padding': '5%'

    }
}

class CreateProgram extends Component {
  render() {
    return (
        <Paper style={style.Paper}>
                <h1>Create a new program for your upcoming meeting</h1>
                <form>
                    {/* <input type='email' id='email' name="email" placeholder='Enter your email' required /><br /> */}
                    {/* <input type='password' id='password' name="password" placeholder='Password' required /><br /> */}

                    <TextField
                        required
                        id="standard-textarea"
                        margin="normal"
                        placeholder="Give your program a title"
                        multiline
                    />
                    <br />
                    <TextField
                        required
                        id="standard-textarea"
                        margin="normal"
                        placeholder="Write a short description of your program"
                        multiline
                    />
                    <br />
                    <Button type="button" variant='contained' color="primary" style={{ 'backgroundColor': 'orange' }}>Next</Button>
                </form>

            </Paper>
        )
    }
}
    
export default CreateProgram;