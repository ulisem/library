import { Module } from '@nestjs/common';
import { ReaderService } from './reader.service';
import { ReaderController } from './reader.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { ReaderRepository } from './reader.repository';
import { JwtStrategyReader } from './jwt-strategy-reader';

@Module({
  imports: [
    TypeOrmModule.forFeature([ReaderRepository]),
    JwtModule.register({
      secret: 'reader51',
      signOptions: {
        expiresIn: 14400,
      },
    }),
    PassportModule.register({defaultStrategy: 'reader'})
  ],
  providers: [ReaderService,JwtStrategyReader],
  controllers: [ReaderController],
  exports:[ReaderService,JwtStrategyReader]
})
export class ReaderModule {}
