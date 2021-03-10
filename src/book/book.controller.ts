import { Controller, Get, UseGuards, Post, Param, Logger, ParseIntPipe, ParseUUIDPipe, UsePipes, ValidationPipe, Body, Delete, Patch, Query } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Book } from './book.entity';
import { BookService } from './book.service';
import { GetAdmin } from 'src/admin/get-admin-decorator';
import { Admin } from 'src/admin/admin.entity';
import { createBookDto } from './dto/book.create.dto';
import { GetbooksFilterDto } from './dto/get-book-filter-dto';

@Controller('book')
export class BookController {
    private logger = new Logger('BookController');
    constructor(private bookService: BookService){

    }

    @Get()
    getBooks(@Query(ValidationPipe) filterDto: GetbooksFilterDto): Promise<Book[]>{
        return this.bookService.getBook(filterDto);
    }




    @Get('/:id')
    getBookById(@Param('id', ParseUUIDPipe) id:string): Promise<Book>{
        return this.bookService.getBookForId(id);
    }



    @UseGuards(AuthGuard('admin'))
    @Post()
    @UsePipes(ValidationPipe)
    createBook(@Body() createBookDto: createBookDto,@GetAdmin() user: Admin): Promise<Book>{

        this.logger.verbose(`User ${user.email} creating a new book Data: ${JSON.stringify(createBookDto)}`);
       return  this.bookService.createBook(createBookDto,user);

    }

    @UseGuards(AuthGuard('admin'))
    @Delete('/:id', )
    deleteBook(@Param('id',ParseUUIDPipe) id:string): Promise<void>{
        return this.bookService.deleteBook(id);   
    }



    @UseGuards(AuthGuard('admin'))
    @Patch('/:id')
    updateBookStatus(@Param('id',ParseUUIDPipe) id: string, @Body() createBook: createBookDto): Promise<Book>{
        
        return this.bookService.updateBook(id,createBook);

    }
}
