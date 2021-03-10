
import {PassportStrategy} from "@nestjs/passport";
import {Strategy, ExtractJwt} from "passport-jwt";
import { Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtPayload } from "./jwt-payload.interface";
import { InjectRepository } from "@nestjs/typeorm";
import { ReaderRepository } from "./reader.repository";


@Injectable()
export class JwtStrategyReader extends PassportStrategy(Strategy,'reader'){

   constructor(@InjectRepository(ReaderRepository)
                private readerRepository: ReaderRepository){
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: 'reader51',
        });
    }

    async validate(payload: JwtPayload){
        const {email} = payload;
        const user = await this.readerRepository.getUserForValidation(email);

        if(!email){
            throw new UnauthorizedException();
        }

        return user;
    }



}