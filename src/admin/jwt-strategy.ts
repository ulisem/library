
import {PassportStrategy} from "@nestjs/passport";
import {Strategy, ExtractJwt} from "passport-jwt";
import { Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtPayload } from "./jwt-payload.interface";
import { InjectRepository } from "@nestjs/typeorm";
import { AdminRepository } from "./admin.repository";


@Injectable()
export class JwtStrategyAdmin extends PassportStrategy(Strategy,'admin'){

   constructor(@InjectRepository(AdminRepository)
                private adminRepository: AdminRepository){
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: 'area51',
        });
    }

    async validate(payload: JwtPayload){
        const {email} = payload;
        const user = await this.adminRepository.getUserForValidation(email);

        if(!email){
            throw new UnauthorizedException();
        }

        return user;
    }



}