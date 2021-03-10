import { Controller, Post, Body, ValidationPipe, UseGuards, Get, Param, ParseUUIDPipe, Patch } from '@nestjs/common';
import { ReaderService } from './reader.service';
import { CreateReaderCredentialsDto } from './dto/reader.create.dto';
import { ReaderCredentialsDto } from './dto/reader.logging.dto';
import { AuthGuard } from '@nestjs/passport';
import { GetReader } from './get-reader-decorator';
import { Reader } from './reader.entity';

@Controller('reader')
export class ReaderController {

    constructor(
        private authService: ReaderService
    ){

    }

    @UseGuards(AuthGuard('admin'))
    @Get()
    getReaders(): Promise<Reader[]>{
        return this.authService.getReader();
    }



    @UseGuards(AuthGuard('admin'))
    @Get('/:id')
    getReaderById(@Param('id', ParseUUIDPipe) id:string): Promise<Reader>{
        return this.authService.getReaderForId(id);
    }


    @UseGuards(AuthGuard('reader'))
    @Get('/me/:id')
    getReaderMeById(@Param('id', ParseUUIDPipe) id:string): Promise<Reader>{
        return this.authService.getReaderForId(id);
    }

    
    @Post('/signup')
    signUp(@Body(ValidationPipe) authCredentialsDto: CreateReaderCredentialsDto ){
        return this.authService.signUp(authCredentialsDto);
    }


    @UseGuards(AuthGuard())
    @Patch('/:id')
    updateReader(@Param('id', ParseUUIDPipe) id:string,@Body(ValidationPipe) authCredentialsDto: CreateReaderCredentialsDto){
        return this.authService.updateReader(id,authCredentialsDto)
    }

    @Post('/sigin')
    sigIn(@Body(ValidationPipe) authCredentialsDto: ReaderCredentialsDto ):  Promise<{accesToken: string}>{
        return this.authService.signin(authCredentialsDto);
    }

    @Post('/test')
    @UseGuards(AuthGuard())
    test(@GetReader() user: Reader){
        console.log(user);
        return user;
    }
}
