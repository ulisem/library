import { Repository, EntityRepository } from "typeorm";
import { Admin } from "./admin.entity";
import { AdminCredentialsDto } from "./dto/admin.loggin.dto";
import { ConflictException, InternalServerErrorException } from "@nestjs/common";
import * as bcrypt from "bcrypt";
import { CreateAdminCredentialsDto } from "./dto/admin.create.dto";
import { roleAdmin } from "./create.role.admin";


@EntityRepository(Admin)
export class AdminRepository extends Repository<Admin>{

    async signUp(authCredentialsDto: CreateAdminCredentialsDto): Promise<void> {
        const { email, password, lastname, firstname, phoneNumber, role } = authCredentialsDto;

        const salt = await bcrypt.genSalt();
        const user = new Admin();
        user.email = email;
        user.password = await this.hashPassword(password, salt);
        user.salt = salt;
        user.lastname = lastname;
        user.firstname = firstname;
        user.phoneNumber = phoneNumber;
        if(role == "ADMINISTRADOR"){
        user.role = roleAdmin.ADMINS;
        }else{
        user.role = roleAdmin.BIBLIOTECARY;
        }
        user.createdDate = new Date();

        try {

            await user.save();

        } catch (error) {
            if (error.code === "23505") {
                throw new ConflictException('email alredy exist');
            } else {
                throw new InternalServerErrorException;
            }

        }


    }

    async validateUserPassword(authCredentialsDto: AdminCredentialsDto): Promise<string> {

        const { email, password } = authCredentialsDto;
        const query = this.createQueryBuilder('admin');
        query.where('admin.email = :email', { email: email });
        const user = await query.getOne();




        try {
            if (user && await user.validatePassword(password)) {
                return user.email;
            } else {
                return null;
            }

        } catch (error) {
            console.log(error);

        }




    }


    public async getUserForValidation(email: string): Promise<Admin> {

        const query = this.createQueryBuilder('admin');
        query.where('admin.email = :email', { email: email });
        const user = await query.getOne();

        return user;





    }

    async getAdmins():Promise<Admin[]>{
        const query = this.createQueryBuilder('sdmin');

        try {

        const reader = await query.getMany();
        return reader; 
            
        } catch (error) {
            throw new InternalServerErrorException();
            
        }


    }


    private async hashPassword(password: string, salt: string): Promise<string> {
        return bcrypt.hash(password, salt);
    }

}