import React, {PureComponent} from 'react'
import {getTickets, createTicket} from '../../actions/tickets'
import {getUsers} from '../../actions/users'
import {getEvents} from '../../actions/events'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'
import './TicketsList.css'
import Header from '@material-ui/core/CardHeader'
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';

class TicketsList extends PureComponent {
  componentWillMount() {
    if (this.props.authenticated) {
      if (this.props.tickets === null) this.props.getTickets()
      if (this.props.users === null) this.props.getUsers()
      if (this.props.events === null) this.props.getEvents()
    }
  }

  renderTicket = (ticket) => {
    const {history} = this.props
    
    if(ticket.user !== undefined)
    return (<Card key={ticket.id} className="ticket-card">
        <CardContent>
          <Typography variant="headline" component="h2">
            Ticket from: {ticket.user.firstName}
            <br />
            Price: {ticket.price}
            <br />
            {ticket.description}
          </Typography>
        </CardContent>
        <CardActions>
          <Button
            size="small"
            onClick={() => history.push(`/tickets/${ticket.id}`)}
          >
            Open Ticket
          </Button>
        </CardActions>
    </Card>) 
    }

    returnId = () => {
        return this.props.match.params.id
    }

  render() {
    const {tickets, users, authenticated, history} = this.props
    const idnum = this.props.match.params.id
    if (!authenticated) return (
			<Redirect to="/login" />
		)

    if (tickets === null || users === null) return null

    return (<Paper className="outer-paper">
    <Header>Event: {}</Header>
      <Button
        idnum={idnum}
        color="primary"
        variant="raised"
        onClick={() => history.push(`/ticket/create/${idnum}`)}
        className="create-ticket"
      >
        Create Ticket
      </Button>

      <div>
        {tickets.map(ticket => this.renderTicket(ticket))}
      </div>
    </Paper>)
  }
}

const mapStateToProps = state => ({
  authenticated: state.currentUser !== null,
  events: state.events === null ? null : state.events,
  users: state.users === null ? null : state.users,
  tickets: state.tickets === null ?
    null : Object.values(state.tickets).sort((a, b) => b.id - a.id)
})

export default connect(mapStateToProps, {getTickets, getUsers, getEvents, createTicket})(TicketsList)