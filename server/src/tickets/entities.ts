import { Entity, BaseEntity, PrimaryGeneratedColumn, ManyToOne, Column, OneToMany } from "../../node_modules/typeorm";
import User from '../users/entity'
import { Event } from '../events/entities'
import { Comment } from '../comments/entities'
 
const currentDate: Date = new Date()
const currentHours = currentDate.getHours()

@Entity()
export class Ticket extends BaseEntity {

  @PrimaryGeneratedColumn()
  id?: number

  @ManyToOne(_ => User, user => user.tickets, {eager:true})
  user: User

  @ManyToOne(_ => Event, event => event.tickets, {eager:true})
  event: Event

  @OneToMany(_ => Comment, comment => comment.ticket, {eager:true})
  comment: Comment   

  @Column({nullable: true})
  risk: number

  @Column()
  price: number

  @Column('text')
  description: string

  @Column({nullable: true})
  picture: string

  @Column({default: currentHours})
  postdate: string
}