import { 
  JsonController, CurrentUser, Post, Param, HttpCode, NotFoundError, ForbiddenError, Get, 
  Patch, 
  Body,
  Authorized,
} from 'routing-controllers'
import User from '../users/entity'
import { Event } from './entities'
import { Ticket } from '../tickets/entities'
import {io} from '../index'

@JsonController()
export default class EventController {

  @Authorized()
  @Post('/events')
    @HttpCode(201)
    createComment(
        @Body() event: Event
    ) {
  return event.save()
}

  @Authorized()
  @Patch('/events/:id([0-9]+)')
  async updateEvent(
    @CurrentUser() user: User,
    @Param('id') eventId: number,
  ) {
    const event = await Event.findOneById(eventId)
    if (!event) throw new NotFoundError(`Event does not exist`)

    const ticket = await Ticket.findOne({ user, event })

    if (!ticket) throw new ForbiddenError(`No valid ticket found`)
    
    io.emit('action', {
      type: 'UPDATE_EVENT',
      payload: event
    })

    return event
  }

  @Get('/events/:id([0-9]+)')
  getEvent(
    @Param('id') id: number
  ) {
    return Event.findOneById(id)
  }

  @Get('/events')
  allEvents(
  ) {
    return Event.find({
      take: 9
    })
  }
}

  