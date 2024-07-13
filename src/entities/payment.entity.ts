import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Transaction } from './transaction.entity';

@Entity()
export class Payment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  clientId: number;

  @Column()
  reservationId: number;

  @Column()
  amount: number;

  @Column()
  status: string;

  @Column()
  paymentMethod: string;

  @OneToMany(() => Transaction, transaction => transaction.payment)
  transactions: Transaction[];
}
