import React, { PureComponent } from "react";
import { connect } from "react-redux";
import { getTickets } from "../../actions/tickets";
import { getEvents } from '../../actions/events';
import { getUsers } from '../../actions/users'
import { Redirect } from "react-router-dom";
import Paper from '@material-ui/core/Paper'
import "../../App.css";
import { commentsRisk, returnAverage, riskOnAverage, finalRisk, dummyComments, timeRisk, calculatedRisk } from '../../lib/Fraudrisk'



class TicketDetails extends PureComponent {
    constructor(props) {
        super(props)
        this.state = {
            risk: 0
        }
    }
    componentWillMount() {
        if (this.props.authenticated) {
          if (this.props.events === null) this.props.getEvents()
          if (this.props.users === null) this.props.getUsers()
          if (this.props.tickets === null) this.props.getTickets()
        }
      }
     
    returnId = () => {
        return this.props.match.params.id
    }


  render() {
    const { authenticated, tickets } = this.props;

    let ticketList = Object.keys(tickets).map(i => tickets[i])
    ticketList.map(ticket => {
        return ticket.id
    })
    
    let ticketFilter = tickets.filter(ticket => ticket.id === parseInt(this.props.match.params.id, 0))
        console.log(ticketFilter)
    
    let ticketPrice = Object.keys(ticketFilter).map(i => ticketFilter[i])
    ticketPrice.map(ticket => {
        return ticketPrice = ticket.price
    })

    let ticketPostDate = Object.keys(ticketFilter).map(i => ticketFilter[i])
    ticketPostDate.map(ticket => {
        return ticketPostDate = ticket.postdate
    })

    let ticketUser = Object.keys(ticketFilter).map(i => ticketFilter[i])
    ticketUser.map(ticket => {
        return ticketUser = ticket.user.firstName
    })

    let userList = Object.keys(tickets).map(i => tickets[i]) 
    userList.map(ticket => {
        return userList = ticket.user.id
    })

    let userAmount = tickets.filter(ticket => ticket.user.id === userList)
        console.log(userAmount.length)

    let average = returnAverage(tickets)
    let riskAverage = riskOnAverage(ticketPrice, average)
    let postDateRisk = timeRisk(ticketPostDate)

    const totalRisk = commentsRisk(dummyComments) + riskAverage + postDateRisk + calculatedRisk(userAmount)


    let fraudeRisk = finalRisk(totalRisk)
    
    if (!authenticated) return (
      <Redirect to="/login" />
    )
    
    return (
      <div>
          <Paper className="ticketdetails" elevation={4}>
            <br />
            <h1>Ticket from: {ticketUser}</h1>
            <h2> Fraude Risk: {fraudeRisk} %</h2>
            <h2> Price: EUR {ticketPrice}</h2>
            <h2> Comments: 
                <ul><i>{dummyComments[0]}<br/>
                    {dummyComments[4]}<br />
                    {dummyComments[5]}</i>
                </ul>
            </h2>
            <div>
                
            </div>
          </Paper>
      </div>
    )}}

const mapStateToProps = state => ({
    authenticated: state.currentUser !== null,
    events: state.events === null ? null : state.events,
    users: state.users === null ? null : state.users,
    tickets: state.tickets === null ?
        null : Object.values(state.tickets).sort((a, b) => b.id - a.id)
    })

export default connect(mapStateToProps, {getTickets, getUsers, getEvents})(TicketDetails);
