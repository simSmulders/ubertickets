import React, {PureComponent} from 'react'
import {getEvents} from '../../actions/events'
import {getUsers} from '../../actions/users'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'
import './EventsList.css'
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';

class EventsList extends PureComponent {
  componentWillMount() {
    if (this.props.authenticated) {
      if (this.props.events === null) this.props.getEvents()
      if (this.props.users === null) this.props.getUsers()
    }
  }

  renderEvent = (event) => {
    const {history} = this.props
    const eventDate = Date.parse(event.startdate)
    const currentDate = Date.parse(new Date()) 

    if(eventDate >= currentDate) {
    return (<Card key={event.id} className="event-card">
        <CardContent>
          <Typography variant="headline" component="h2">
            Event {event.name}
            <br></br>
            {event.startdate}
          </Typography>
        </CardContent>
        <CardActions>
          <Button
            size="small"
            onClick={() => history.push(`/events/${event.id}`)}
          >
            Check Tickets
          </Button>
        </CardActions>
    </Card>)
  }
}

  render() {
    const {events, users, authenticated, history} = this.props

    if (!authenticated) return (
			<Redirect to="/login" />
		)

    if (events === null || users === null) return null

      return (<Paper className="outer-paper">
            <Button
            color="primary"
            variant="raised"
            onClick={() => history.push("/event/create")}
            className="create-event"
          >
            Create Event
          </Button>
          <div>
            {events.map(event => this.renderEvent(event))}
          </div>
        </Paper>)
  }
}

const mapStateToProps = state => ({
  authenticated: state.currentUser !== null,
  users: state.users === null ? null : state.users,
  events: state.events === null ?
    null : Object.values(state.events).sort((a, b) => b.id - a.id),
  createEvent: state.createEvent
})

export default connect(mapStateToProps, {getEvents, getUsers})(EventsList)