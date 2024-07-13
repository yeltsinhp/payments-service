import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Payment } from './entities/payment.entity';
import { Transaction } from './entities/transaction.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '73198416',
      database: 'payments_db',
      entities: [Payment, Transaction],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([Payment, Transaction]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
