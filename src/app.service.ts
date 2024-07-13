import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Payment } from './entities/payment.entity';
import { Transaction } from './entities/transaction.entity';

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(Payment)
    private readonly paymentRepository: Repository<Payment>,
    @InjectRepository(Transaction)
    private readonly transactionRepository: Repository<Transaction>,
  ) {}

  async processPayment(clientId: number, reservationId: number, amount: number) {
    
    // Simulación de un fallo
    // throw new Error('Simulated payment failure');
    const payment = this.paymentRepository.create({ clientId, reservationId, amount, status: 'processed', paymentMethod: 'credit_card' });
    await this.paymentRepository.save(payment);

    const transaction = this.transactionRepository.create({ payment, status: 'completed', date: new Date(), details: 'Payment successful' });
    await this.transactionRepository.save(transaction);

    return payment;
  }

  async revertPayment(paymentId: number) {
    const payment = await this.paymentRepository.findOne({
      where: { id: paymentId },
    });
    if (!payment) {
      throw new Error('Payment not found');
    }

    payment.status = 'reverted';
    await this.paymentRepository.save(payment);

    const transaction = this.transactionRepository.create({
      payment,
      status: 'reverted',
      date: new Date(),
      details: 'Payment reverted',
    });
    await this.transactionRepository.save(transaction);

    return payment;
  }
}
