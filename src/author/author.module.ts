import { Module } from '@nestjs/common';
import { AuthorService } from './author.service';
import { AuthorController } from './author.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdminModule } from 'src/admin/admin.module';
import { AuthorRepository } from './author.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([AuthorRepository]),
    AdminModule

  ],
  providers: [AuthorService],
  controllers: [AuthorController],
  exports: [AuthorService]
})
export class AuthorModule {}
