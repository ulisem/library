import { Module } from '@nestjs/common';
import { BookModule } from './book/book.module';
import { ReaderModule } from './reader/reader.module';
import { AdminModule } from './admin/admin.module';
import { LoanModule } from './loan/loan.module';
import { AuthorModule } from './author/author.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './config/typeorm.config';

@Module({
  imports: [
    AdminModule,
    TypeOrmModule.forRoot(typeOrmConfig),
    BookModule,
    ReaderModule,
    LoanModule,
    AuthorModule
  ]
})
export class AppModule {}
