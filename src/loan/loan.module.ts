import { Module } from '@nestjs/common';
import { LoanService } from './loan.service';
import { LoanController } from './loan.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdminModule } from 'src/admin/admin.module';
import { LoanRepository } from './loan.repository';
import { BookModule } from 'src/book/book.module';
import { ReaderModule } from 'src/reader/reader.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([LoanRepository]),
    AdminModule,
    BookModule,
    ReaderModule

  ],
  providers: [LoanService],
  controllers: [LoanController]
})
export class LoanModule {}
