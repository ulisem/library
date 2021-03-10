import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BookRepository } from './book.repository';
import { Book } from './book.entity';
import { createBookDto } from './dto/book.create.dto';
import { Admin } from '../admin/admin.entity';
import { Author } from 'src/author/Author.entity';
import { AuthorService } from 'src/author/author.service';
import { GetbooksFilterDto } from './dto/get-book-filter-dto';

@Injectable()
export class BookService {
    constructor(
        @InjectRepository(BookRepository)
        private bookRepository: BookRepository,
        private authorService:AuthorService,
      
    ){

    }


    async getBook(fitlerDto: GetbooksFilterDto): Promise<Book[]>{
        return this.bookRepository.getBook(fitlerDto);
    }



  async  getBookForId(id:string): Promise<Book>{
    try {
      const found = await this.bookRepository.findOne(id);

      if(!found){
          throw new NotFoundException(`Book with Id ${id} not found`);
      }

      return found;
        
    } catch (error) {
        return error;
        
    }
  }


 


    async createBook(createBookDto: createBookDto, user: Admin): Promise<Book>{
        
        const {author } = createBookDto;
       

       let authors:Author[] = [];
        
       for(let i =0; i < author.length; i++){
           let aut = await this.authorService.getAuthorForId(author[i])
           authors.push(aut);
       }
        return this.bookRepository.createBook(createBookDto,authors,user);
    
    
    }


    async deleteBook(id: string ):Promise<void>{
      
        const result = await this.bookRepository.delete(id);
        if (result.affected === 0){
            throw new NotFoundException(`Book with Id ${id} not found`);  
        }
        
    }



    async updateBook(id: string, createBookDto: createBookDto): Promise<Book>{
        const {title,isbn,img,edition,quantity,PublicationYear,location ,description,author} = createBookDto;
        let authors:Author[] = [];
        
       for(let i =0; i < author.length; i++){
           let aut = await this.authorService.getAuthorForId(author[i])
           authors.push(aut);
       }
        const book = await this.getBookForId(id);
        book.title = title.toLowerCase() ;
        book.description = description;
        book.isbn = isbn;
        book.location = location;
        book.img = img;
        book.edition = edition;
        book.quantity = quantity;
        book.PublicationYear = PublicationYear;
        book.author = authors;

        await book.save();
        return book;


    }
}
