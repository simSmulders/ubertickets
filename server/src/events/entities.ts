import { BaseEntity, PrimaryGeneratedColumn, Column, Entity, OneToMany, ManyToOne } from 'typeorm'
import {Ticket} from '../tickets/entities'
import User from '../users/entity';
import { IsString } from 'class-validator';

const currentDate: Date = new Date()

@Entity()
export class Event extends BaseEntity {

  @PrimaryGeneratedColumn()
  id?: number

  @IsString()
  @Column('text')
  name: String

  @Column('date', {default: currentDate})
  startdate: Date
  
  @Column('date', {nullable: true})
  enddate: Date

  @IsString()
  @Column('text', {nullable: false})
  description: String

  @Column('text', {nullable: false})
  picture_URL: string

  @OneToMany(_ => Ticket, ticket => ticket.event)
  tickets: Ticket[]

  @ManyToOne(_ => User, user => user.events, {eager:true})
  user: User
}


