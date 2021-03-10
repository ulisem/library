
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { BookService } from './book.service';
import { BookController } from './book.controller';
import { BookRepository } from './book.repository';
import { AdminModule } from 'src/admin/admin.module';
import { AuthorModule } from 'src/author/author.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([BookRepository]),
    AdminModule,
    AuthorModule

  ],
  providers: [BookService],
  controllers: [BookController],
  exports:[BookService]
})
export class BookModule {}
