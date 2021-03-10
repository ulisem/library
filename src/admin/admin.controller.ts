import { Controller, Post, UseGuards, Body, ValidationPipe } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AdminService } from './admin.service';
import { CreateAdminCredentialsDto } from './dto/admin.create.dto';
import { AdminCredentialsDto } from './dto/admin.loggin.dto';
import { GetAdmin } from './get-admin-decorator';
import { Admin } from './admin.entity';

@Controller('admin')
export class AdminController {

    constructor(
        private authService: AdminService
    ){

    }
    
    @Post('/signup')
    signUp(@Body(ValidationPipe) authCredentialsDto: CreateAdminCredentialsDto ){
        return this.authService.signUp(authCredentialsDto);
        

    }

    @Post('/sigin')
    sigIn(@Body(ValidationPipe) authCredentialsDto: AdminCredentialsDto ):  Promise<{accesToken: string}>{
        return this.authService.signin(authCredentialsDto);
    }

    @Post('/test')
    @UseGuards(AuthGuard())
    test(@GetAdmin() admin: Admin){
        console.log(admin);
        return admin;
    }
    
}
