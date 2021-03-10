import { Controller, Logger, Get, Param, ParseUUIDPipe, UseGuards, Post, UsePipes, ValidationPipe, Body, Patch, Delete } from '@nestjs/common';
import { Author } from './Author.entity';
import { AuthGuard } from '@nestjs/passport';
import { GetAdmin } from 'src/admin/get-admin-decorator';
import { Admin  } from '../admin/admin.entity';
import { createAuthorDto } from './dto/Author.create.dto';
import { AuthorService } from './author.service';

@Controller('author')
export class AuthorController {
    private logger = new Logger('AuthorController');
    constructor(private authorService: AuthorService){

    }

    @Get()
    getAuthors(): Promise<Author[]>{
        return this.authorService.getAuthor();
    }




    @Get('/:id')
    getAuthorById(@Param('id', ParseUUIDPipe) id:string): Promise<Author>{
        return this.authorService.getAuthorForId(id);
    }



    @UseGuards(AuthGuard('admin'))
    @Post()
    @UsePipes(ValidationPipe)
    createAuthor(@Body() createAuthorDto: createAuthorDto,@GetAdmin() admin: Admin): Promise<Author>{

        this.logger.verbose(`User ${admin.email} creating a new Author Data: ${JSON.stringify(createAuthorDto)}`);
       return  this.authorService.createAuthor(createAuthorDto,admin);

    }

    @UseGuards(AuthGuard('admin'))
    @Delete('/:id', )
    deleteAuthor(@Param('id',ParseUUIDPipe) id:string): Promise<void>{
        return this.authorService.deleteAuthor(id);   
    }



    @UseGuards(AuthGuard('admin'))
    @Patch('/:id')
    updateAuthorStatus(@Param('id',ParseUUIDPipe) id: string, @Body() createAuthor: createAuthorDto): Promise<Author>{
        
        return this.authorService.updateAuthor(id,createAuthor);

    }
}
