import { Repository, EntityRepository } from "typeorm";
import { Reader  } from "./reader.entity";
import { ReaderCredentialsDto } from "./dto/reader.logging.dto";
import { ConflictException, InternalServerErrorException, Logger } from "@nestjs/common";
import * as bcrypt from "bcrypt";
import { CreateReaderCredentialsDto } from "./dto/reader.create.dto";


@EntityRepository(Reader)
export class ReaderRepository extends Repository<Reader>{


    private logger = new Logger('ReaderRepository');

    async signUp(authCredentialsDto: CreateReaderCredentialsDto): Promise<void> {
        const { email, password, lastname, firstname, phoneNumber, state, neigborhood, street, extnumber, intnumber, img,city } = authCredentialsDto;

        const salt = await bcrypt.genSalt();
        const user = new Reader();
        user.email = email;
        user.password = await this.hashPassword(password, salt);
        user.salt = salt;
        user.lastname = lastname;
        user.firstname = firstname;
        user.state = state;
        user.city = city;
        user.neigborhood = neigborhood;
        user.city = city;
        user.img = img;
        user.extnumber = extnumber;
        user.intnumber=intnumber;
        user.street=street;
        user.phoneNumber = phoneNumber;
        user.createdDate = new Date();
        user.debt = 0;

      

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

    async validateUserPassword(authCredentialsDto: ReaderCredentialsDto): Promise<string> {

        const { email, password } = authCredentialsDto;
        const query = this.createQueryBuilder('Reader');
        query.where('Reader.email = :email', { email: email });
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


    public async getUserForValidation(email: string): Promise<Reader> {

        const query = this.createQueryBuilder('Reader');
        query.where('Reader.email = :email', { email: email });
        const user = await query.getOne();

        return user;





    }


    async getReader():Promise<Reader[]>{
        const query = this.createQueryBuilder('Reader');

        try {

        const reader = await query.getMany();
        return reader; 
            
        } catch (error) {
            this.logger.error(`Failed to get Reader user. Filters:`, error.stack);
            throw new InternalServerErrorException();
            
        }


    }


    private async hashPassword(password: string, salt: string): Promise<string> {
        return bcrypt.hash(password, salt);
    }

}