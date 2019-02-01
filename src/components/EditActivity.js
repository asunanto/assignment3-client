import React, { Component } from 'react';
import { api, setJwt } from '../api/init'
import { Paper, Button, TextField } from '@material-ui/core'

class EditActivity extends Component {
  state = {
    title: '',
    ageLevels: []
  }

  componentDidMount(){
    const {id} = this.props.match.params
    api.get(`/activities/${id}`).then((res) => {
        this.setState({...res.data})
    }).catch((err) => {
      console.error('Could not fetch age levels', err)
    })
    
    api.get('/agelevels').then((res) => {
      this.setState({ageLevels: res.data})
    }).catch((err) => {
      console.error('Could not fetch age levels', err)
    })

  }
  handleChange =(e)=> {
    this.setState({ageLevel: this.state.ageLevels[e.target.value]})
    
  }

  handleSubmit = async (e) => {
    const token = localStorage.getItem("token")
    setJwt(token)
    e.preventDefault()
    try{
      const {id} = this.props.match.params
      const {title, description, length} = e.target.elements
      const response = await api.put(`/activities/${id}`, {
        title: title.value,
        description: description.value,
        length: length.value,
        ageLevel: this.state.ageLevel
     })
    }
    catch(error){console.error(error)}
  }

  
  _change = (title,description,length) => event => {
    this.setState({
      [title]: event.target.value,
      [description]: event.target.value,
      [length]: event.target.length
    });
  };

  render() {
    const ageIndex = this.state.ageLevel && this.state.ageLevels.findIndex(ageLevel => ageLevel.name == this.state.ageLevel.name)
    
    return (
      <div>
        
        <form onSubmit={(e) => {this.handleSubmit(e); this.props.history.push(`/user`)}}>
        <h1>Create a new activity to add to our share library</h1>
        <p>Age Level</p>
        <select value={ageIndex} onChange={this.handleChange} >
          { this.state.ageLevels.map((ageLevel,index) =>
            <option key={index} value={index}>{ageLevel.name}</option>
          )};
        </select>
        <TextField
          required
          id="title"
          label="Title"
          margin="normal"
          type="title"
          value={this.state.title}
          onChange={this._change('title')}
        />
        <br />
        <TextField
          required
          id="description"
          label="Description"
          margin="normal"
          type="description"
          value={this.state.description}
          multiline={true}
          onChange={this._change('description')}
        />
        <br />
        <p>Category</p>
        <TextField
          required
          id="length"
          label="Length"
          margin="normal"
          type="length"
          value={this.state.length}
          onChange={this._change('length')}
        />
        
        <p>Attachments</p>
        <Button type="submit" variant='contained' color="primary" style={{ 'backgroundColor': 'orange' }}>Save Changes</Button>
        </form>
      </div>
      
    )
  }
}

export default EditActivity