import {ADD_TICKET, ADD_TICKET_SUCCESS, UPDATE_TICKET, UPDATE_TICKETS} from '../actions/tickets'
import {USER_LOGOUT} from '../actions/users'

/*
The state will contain the games in an object with the game ID as key
*/

export default (state = null, {type, payload}) => {
  switch (type) {
    case USER_LOGOUT:
      return null
    
    case ADD_TICKET:
      return {
        ...state,
        [payload.id]: payload
      }
    
    case ADD_TICKET_SUCCESS:
      return {
          ...state, 
          succes: true
      }

    case UPDATE_TICKET:
      return {
        ...state,
        [payload.id]: payload
      }

    case UPDATE_TICKETS:
      return payload.reduce((tickets, ticket) => {
        tickets[ticket.id] = ticket
        return tickets
      }, {})

    default:
      return state
  }
}