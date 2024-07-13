import { Controller, Body } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { AppService } from './app.service';
import { ProcessPaymentDto } from './dto/process-payment.dto';
import { RevertPaymentDto } from './dto/revert-payment.dto';

@Controller()
export class AppController {
  constructor(private readonly paymentsService: AppService) {}

  @MessagePattern({ cmd: 'processPayment' })
  async processPayment(@Body() processPaymentDto: ProcessPaymentDto) {
    return await this.paymentsService.processPayment(
      processPaymentDto.clientId, 
      processPaymentDto.reservationId,
      processPaymentDto.amount
    );
  }

  @MessagePattern({ cmd: 'revertPayment' })
  async revertPayment(@Body() revertPaymentDto: RevertPaymentDto) {
    return await this.paymentsService.revertPayment(revertPaymentDto.paymentId);
  }
}
