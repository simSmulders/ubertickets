import { JsonController, Get, Post, HttpCode, Body, Authorized, Patch, Param, NotFoundError } from 'routing-controllers'
import { Ticket } from './entities'


@JsonController()
export default class TicketController {

    @Get('/tickets')
    async allTickets() {
        const tickets = await Ticket.find()
        return { tickets }
    }

    @Authorized()
    @Post('/tickets')
    @HttpCode(201)
    createTicket(
        @Body() ticket: Ticket
    ) {
    return ticket.save()
    }   

    @Patch('/tickets/:id([0-9]+)')
    async updateTicket(
        @Param('id') ticketId: number,
        @Body() update: Partial<Ticket>
    ) {
        const ticket = await Ticket.findOneById(ticketId)
        if (!ticket) throw new NotFoundError('Cannot find ticket')

        return Ticket.merge(ticket, update).save()
    }
}