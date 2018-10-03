
import React, {PureComponent} from 'react'
import { connect } from 'react-redux'
import { createTicket } from '../../actions/tickets'
import Button from "@material-ui/core/Button"
import {Redirect} from 'react-router-dom'

class CreateTicket extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      postDate: new Date(),
      event_id: this.props.match.params.id
    }
		
  }

	handleSubmit = (e) => {
        const {history} = this.props
        const idnum = this.props.match.params.id
      e.preventDefault()
      console.log(this.state, "STATE")
      this.props.createTicket(this.state)
      history.push(`/events/${idnum}`)  
	}

	handleChange = (event) => {
	  const {name, value} = event.target

	  this.setState({
		  [name]: value
	  })
    }
    
    

	render() {
        
        if (this.props.createTicket.success) return (
			<Redirect to="/events/:id" />
		)
        
	  return (
	    <form onSubmit={this.handleSubmit}>
	      <div>
	        <label htmlFor="description">Description: </label>
	        <input name="description" id="description" value={
	          this.state.description || ''
	        } onChange={ this.handleChange } />
	      </div>

          <div>
            <label htmlFor="price">Price: </label>
            <input name="price" id="price" value={
                this.state.price || ''
            } onChange={ this.handleChange } />
          </div>

	      <div>
	        <label htmlFor="ticketPicture">Picture url: </label>
	        <input name="ticketPicture" id="ticketPicture" value={
	          this.state.ticketPicture ||  ''
	        } onChange={ this.handleChange } />
	      </div>

	      <Button type="submit" onSubmit={this.handleSubmit}>Save</Button>
	    </form>
	  )
	}
}

export default connect(null, {createTicket })(CreateTicket)