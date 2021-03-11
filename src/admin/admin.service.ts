import { Injectable, UnauthorizedException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AdminRepository } from './admin.repository';
import { JwtService } from '@nestjs/jwt';
import { CreateAdminCredentialsDto } from './dto/admin.create.dto';
import { JwtPayload } from './jwt-payload.interface';
import { AdminCredentialsDto } from "./dto/admin.loggin.dto";
import { Admin } from './admin.entity';
import * as bcrypt from "bcrypt";
import { roleAdmin } from './create.role.admin';

@Injectable()
export class AdminService {
    constructor(
        @InjectRepository(AdminRepository)
        private adminRepository: AdminRepository,
        private jwtService: JwtService) {

    }

    async signUp(authCredentialsDto: CreateAdminCredentialsDto): Promise<void> {
        return await this.adminRepository.signUp(authCredentialsDto);

    }

    async signin(authCredentialsDto: AdminCredentialsDto): Promise<{ accesToken: string }> {
        const email = await this.adminRepository.validateUserPassword(authCredentialsDto);
        if (!email) {
            throw new UnauthorizedException('Invalid credentials');
        }

        const payload: JwtPayload = { email };
        const accesToken = await this.jwtService.sign(payload);
        return { accesToken };
    }

    async getReader(): Promise<Admin[]> {
        return this.adminRepository.getAdmins();
    }



    async deleteAdmin(id: string ):Promise<void>{
      
        const result = await this.adminRepository.delete(id);
        if (result.affected === 0){
            throw new NotFoundException(`Book with Id ${id} not found`);  
        }
        
    }


    async  getReaderForId(id: string): Promise<Admin> {
        try {
            const found = await this.adminRepository.findOne(id);

            if (!found) {
                throw new NotFoundException(`Reader with Id ${id} not found`);
            }

            return found;

        } catch (error) {
            return error;

        }
    }


    async updateReader(id: string, authCredentialsDto: CreateAdminCredentialsDto): Promise<Admin> {
        const { email, password, lastname, firstname, phoneNumber, role } = authCredentialsDto;
        const user = await this.getReaderForId(id);
        const salt = await bcrypt.genSalt();
        user.email = email;
        user.password = await this.hashPassword(password, salt);
        user.salt = salt;
        user.lastname = lastname;
        user.firstname = firstname;
        user.phoneNumber = phoneNumber;
        if (role == "ADMINISTRADOR") {
            user.role = roleAdmin.ADMINS;
        } else {
            user.role = roleAdmin.BIBLIOTECARY;
        }

        await user.save();
        return user;

    }


    private async hashPassword(password: string, salt: string): Promise<string> {
        return bcrypt.hash(password, salt);
    }
}
