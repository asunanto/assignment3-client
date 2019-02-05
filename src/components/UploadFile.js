/* 
    This UploadFile component allows users to attachment files to the activities they create (when included on the "Create Activity" form).
    However, errors could be handled better. Users should be able to cancel the upload - the server will crash if the page is refreshed during upload.
    Also, the server (Node backend) is vulnerable as it doesn't check for or sanitize script files.
    It's possible to change an API to a remote server and data storage instead.
*/

import React, { Component } from 'react'
import axios from 'axios'

// Defines an endpoint for the file
const endpoint = 'http://localhost:8000/upload'

class UploadFile extends Component {
  constructor() {
    super()
    // Initialise the state
    this.state = {
      selectedFile: null,
      loaded: 0,
    }
  }
  
// Sets the state "SelectedFile" to the selected file and resets upload percentage %
  handleselectedFile = event => {
    this.setState({
      selectedFile: event.target.files[0],
      loaded: 0,
    })
  }

// Sends the file to the server on clicking the "Upload" button (POST request)
  handleUpload = () => {
    // Creates a new FormData ("data"), a datafield that accepts a file and its name.
    const data = new FormData()
    data.append('file', this.state.selectedFile, this.state.selectedFile.name)
// Using axios library to help upload the file to the API
    axios
      .post(endpoint, data, {
        // For progress reporting
        onUploadProgress: ProgressEvent => {
          this.setState({
            loaded: (ProgressEvent.loaded / ProgressEvent.total) * 100,
          })
        },
      })
      .then(res => {
        console.log(res.statusText)
      })
  }

  render() {
    // Adds the onClick handlers to the UploadFile component for selecting the file and submitting the file
    return (
      <div className="UploadFile">
        <input type="file" name="" id="" onChange={this.handleselectedFile} />
        <button onClick={this.handleUpload}>Upload</button>
        <div> {Math.round(this.state.loaded, 2)} %</div>
      </div>
    )
  }
}

export default UploadFile