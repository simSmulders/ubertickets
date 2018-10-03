import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom'
import LoginPage from './components/login/LoginPage'
import SignupPage from './components/signup/SignupPage'
import EventsList from './components/events/EventsList'
import LogoutPage from './components/logout/LogoutPage'
import './App.css'
import TopBar from './components/layout/TopBar'
import TicketsList from './components/tickets/TicketsList';
import CreateEventFormContainer from './components/events/CreateEventFormContainer';
import TicketForm from './components/tickets/TicketForm'
import TicketDetails from './components/tickets/TicketDetails';

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <nav>
            <TopBar/>
          </nav>
        <main className='App' style={{marginTop:75}}>
            <Route exact path="/events" component={EventsList} />
            <Route exact path="/event/create" component={CreateEventFormContainer} />
            <Route exact path="/login" component={LoginPage} />
            <Route exact path="/logout" component={LogoutPage} />
            <Route exact path="/signup" component={SignupPage} />
            <Route exact path="/events/create" component={CreateEventFormContainer} />
            <Route exact path="/events/:id" component={TicketsList} />
            <Route exact path="/ticket/create/:id" component={TicketForm} />
            <Route exact path="/tickets/:id" component={TicketDetails} />
            <Route exact path="/" render={ () => <Redirect to="/events" /> } />
          </main>
        </div>
      </Router>
    )
  }
}
export default App
