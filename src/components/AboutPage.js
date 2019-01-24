import React, { Component } from 'react';
import { Paper } from '@material-ui/core'

const style = {
    Paper: {
        'width': '500px',
        'margin': '10% auto 0 auto',
        'textAlign': 'center',
        'padding': '5%'

    }
}

class AboutPage extends Component {
  render() {
    return (
        <React.Fragment>
            <h1>Welcome to the Girl Guides Helper App for New Leaders!</h1>
            <Paper style={style.Paper}>
                <h2>Introduction to Leadership</h2>
                <p>Here is where we will display an introduction for new leaders. We will discuss the key duties and responsibilities and how they can perform them well.</p>
                <h2>How This App Works</h2>
                <p>This page will also explain this app's purpose and how leaders can use it, e.g. to make programs better and faster.</p>
            </Paper>
        </React.Fragment>
    )
  }
}
export default AboutPage;