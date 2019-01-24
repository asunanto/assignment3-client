import React from 'react';
import { Paper } from '@material-ui/core'

const style = {
    Paper: {
        'width': '500px',
        'margin': '10% auto 0 auto',
        'textAlign': 'center',
        'padding': '5%'

    }
}

export default function NotFound() {
    return(
        <Paper style={style.Paper}>
            <h1>404</h1>
            <h2>Sometimes the savviest Girl Guide gets lost...</h2>
            <h2>It's okay, try navigating somewhere else.</h2>
        </Paper>
    )
}