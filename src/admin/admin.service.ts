import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AdminRepository } from './admin.repository';
import { JwtService } from '@nestjs/jwt';
import { CreateAdminCredentialsDto } from './dto/admin.create.dto';
import { JwtPayload } from './jwt-payload.interface';
import {AdminCredentialsDto} from "./dto/admin.loggin.dto";

@Injectable()
export class AdminService {
    constructor(
        @InjectRepository(AdminRepository)
        private adminRepository: AdminRepository,
        private jwtService: JwtService){

    }

   async signUp(authCredentialsDto: CreateAdminCredentialsDto):Promise<void>{
        return await this.adminRepository.signUp(authCredentialsDto);

    }

    async signin(authCredentialsDto: AdminCredentialsDto): Promise<{accesToken: string}>{
        const email = await this.adminRepository.validateUserPassword(authCredentialsDto);
        if(!email){
            throw new UnauthorizedException('Invalid credentials');
        }

        const payload : JwtPayload= { email};
        const accesToken = await this.jwtService.sign(payload);
         return { accesToken};
    }
}
