import { Controller, Post, UseGuards, Body, ValidationPipe, Get, Param, ParseUUIDPipe, Patch, Delete } from '@nestjs/common';
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

    @UseGuards(AuthGuard('admin'))
    @Get()
    getReaders(): Promise<Admin[]>{
        return this.authService.getReader();
    }



    @UseGuards(AuthGuard('admin'))
    @Get('/:id')
    getReaderById(@Param('id', ParseUUIDPipe) id:string): Promise<Admin>{
        return this.authService.getReaderForId(id);
    }


    @UseGuards(AuthGuard('admin'))
    @Patch('/:id')
    updateAdmin(@Param('id', ParseUUIDPipe) id:string,@Body(ValidationPipe) authCredentialsDto: CreateAdminCredentialsDto  ): Promise<Admin>{
        return this.authService.updateReader(id,authCredentialsDto);
    }

    @UseGuards(AuthGuard('admin'))
    @Delete('/:id', )
    deleteBook(@Param('id',ParseUUIDPipe) id:string): Promise<void>{
        return this.authService.deleteAdmin(id);   
    }



    @UseGuards(AuthGuard('reader'))
    @Get('/me/:id')
    getReaderMeById(@Param('id', ParseUUIDPipe) id:string): Promise<Admin>{
        return this.authService.getReaderForId(id);
    }
    
    @Post('/signup')
    signUp(@Body(ValidationPipe) authCredentialsDto: CreateAdminCredentialsDto ){
        return this.authService.signUp(authCredentialsDto);
        

    }

    @Post('/sigin')
    sigIn(@Body(ValidationPipe) authCredentialsDto: AdminCredentialsDto ):  Promise<{accesToken: string}>{
        return this.authService.signin(authCredentialsDto);
    }

    @Post('/me')
    @UseGuards(AuthGuard())
    test(@GetAdmin() admin: Admin){
        return admin;
    }
    
}
