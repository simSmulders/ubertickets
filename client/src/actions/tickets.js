import * as request from 'superagent'
import {baseUrl} from '../constants'
import {logout} from './users'
import {isExpired} from '../jwt'

export const ADD_TICKET = 'ADD_TICKET'
export const ADD_TICKET_SUCCESS = 'ADD_TICKET_SUCCESS'
export const UPDATE_TICKET = 'UPDATE_TICKET'
export const UPDATE_TICKETS = 'UPDATE_TICKETS'
export const UPDATE_TICKET_SUCCESS = 'UPDATE_TICKET_SUCCESS'

const updateTickets = tickets => ({
  type: UPDATE_TICKETS,
  payload: tickets
})

const addTicket = ticket => ({
  type: ADD_TICKET,
  payload: ticket
})

const addTicketSuccess = ticket => ({
  type: ADD_TICKET_SUCCESS,
  payload: ticket
})

const updateTicketSuccess = () => ({
  type: UPDATE_TICKET_SUCCESS
})

export const getTickets = () => (dispatch, getState) => {
  const state = getState()
  if (!state.currentUser) return null
  const jwt = state.currentUser.jwt

  if (isExpired(jwt)) return dispatch(logout())

  request
    .get(`${baseUrl}/tickets`)
    .set('Authorization', `Bearer ${jwt}`)
    .then(result => {dispatch(updateTickets(result.body.tickets))})
    .catch(err => console.error(err))
}

export const createTicket = (event) => (dispatch, getState) => {
  const state = getState()
  const jwt = state.currentUser.jwt

  if (isExpired(jwt)) return dispatch(logout())

  request
    .post(`${baseUrl}/tickets`)
    .set('Authorization', `Bearer ${jwt}`)
    .send(event)
    .then(result => dispatch(addTicket(result.body)))
    .then(_ => dispatch(addTicketSuccess()))
    .catch(err => console.error(err))
}

export const updateTicket = (ticketId) => (dispatch, getState) => {
  const state = getState()
  const jwt = state.currentUser.jwt

  if (isExpired(jwt)) return dispatch(logout())

  request
    .patch(`${baseUrl}/tickets/${ticketId}`)
    .set('Authorization', `Bearer ${jwt}`)
    .then(_ => dispatch(updateTicketSuccess()))
    .catch(err => console.error(err))
}