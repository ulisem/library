import { Injectable, UnauthorizedException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ReaderRepository } from './reader.repository';
import { JwtService } from '@nestjs/jwt';
import { CreateReaderCredentialsDto } from './dto/reader.create.dto';
import { ReaderCredentialsDto } from './dto/reader.logging.dto';
import { JwtPayload } from 'src/admin/jwt-payload.interface';
import { Reader } from './reader.entity';
import * as bcrypt from "bcrypt";

@Injectable()
export class ReaderService {
    constructor(
        @InjectRepository(ReaderRepository)
        private ReaderRepository: ReaderRepository,
        private jwtService: JwtService){

    }

    async getReader(): Promise<Reader[]>{
        return this.ReaderRepository.getReader();
    }



  async  getReaderForId(id:string): Promise<Reader>{
    try {
      const found = await this.ReaderRepository.findOne(id);

      if(!found){
          throw new NotFoundException(`Reader with Id ${id} not found`);
      }

      return found;
        
    } catch (error) {
        return error;
        
    }
  }

   async signUp(authCredentialsDto: CreateReaderCredentialsDto):Promise<void>{
        return await this.ReaderRepository.signUp(authCredentialsDto);

    }

    async signin(authCredentialsDto: ReaderCredentialsDto): Promise<{accesToken: string}>{
        const email = await this.ReaderRepository.validateUserPassword(authCredentialsDto);
        if(!email){
            throw new UnauthorizedException('Invalid credentials');
        }

        const payload : JwtPayload= { email};
        const accesToken = await this.jwtService.sign(payload);
         return { accesToken};
    }


    async updateReader(id: string,authCredentialsDto: CreateReaderCredentialsDto):Promise<Reader>{
        const { email, password, lastname, firstname, phoneNumber, state, neigborhood, street, extnumber, intnumber, img,city } = authCredentialsDto;
        const user = await this.getReaderForId(id);
        const salt = await bcrypt.genSalt();
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

        await user.save();
        return user;

    }

    async updateDebt(id:string, debt:number):Promise<Reader>{
        const user = await this.getReaderForId(id);
        console.log(user);
        user.debt = debt;
        await user.save();
        return user;
    }


    private async hashPassword(password: string, salt: string): Promise<string> {
        return bcrypt.hash(password, salt);
    }
}
