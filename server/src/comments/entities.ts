import { Entity, BaseEntity, PrimaryGeneratedColumn, ManyToOne, Column } from "../../node_modules/typeorm";
import User from '../users/entity'
import { Ticket } from '../tickets/entities'



@Entity()
export class Comment extends BaseEntity {

  @PrimaryGeneratedColumn()
  id?: number

  @ManyToOne(_ => User, user => user.comments)
  user: User

  @ManyToOne(_ => Ticket, ticket => ticket.comment)
  ticket: Ticket[]

  @Column('text')
  comment: string
}