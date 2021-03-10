import { Module } from '@nestjs/common';
import { AdminService } from './admin.service';
import { AdminController } from './admin.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdminRepository } from './admin.repository';
import {JwtModule} from "@nestjs/jwt";
import {PassportModule} from "@nestjs/passport";
import {JwtStrategyAdmin} from "./jwt-strategy";
@Module({
  imports: [
    TypeOrmModule.forFeature([AdminRepository]),
    JwtModule.register({
      secret: 'area51',
      signOptions: {
        expiresIn: 14400,
      },
    }),
    PassportModule.register({defaultStrategy: 'admin'})
  ],
  controllers: [AdminController],
  providers: [
    AdminService,
    JwtStrategyAdmin,
    ],
    exports: 
    [
      JwtStrategyAdmin,
      PassportModule
    ]
})
export class AdminModule {}
