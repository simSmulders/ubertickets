import React from 'react'
import {connect} from 'react-redux'
import {createEvent} from '../../actions/events'
import EventForm from './EventForm'

class CreateEventFormContainer extends React.PureComponent {
  state = {}
  
  onChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }
  
  onSubmit = (event) => {
    event.preventDefault()
    let eventObject = this.state
    this.props.createEvent(eventObject)
  }
  
  render() {
    
    return (
    <div>
      <h1>Event Form</h1>
        <EventForm 
        onSubmit={this.onSubmit} 
        onChange={this.onChange} 
        values={this.state}
        />
    </div>)
    
  }
}

export default connect(null, {createEvent})(CreateEventFormContainer)