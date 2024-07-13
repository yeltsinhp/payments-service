import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Payment } from './payment.entity';

@Entity()
export class Transaction {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  status: string;

  @Column()
  date: Date;

  @Column()
  details: string;

  @ManyToOne(() => Payment, payment => payment.transactions)
  payment: Payment;
}
