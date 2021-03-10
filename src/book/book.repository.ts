import { Repository, Entity, EntityRepository } from "typeorm";
import { createBookDto } from "./dto/book.create.dto";
import { Logger, InternalServerErrorException, ConflictException } from "@nestjs/common";
import { Book } from "./book.entity";
import { Admin } from "src/admin/admin.entity";
import { Author } from "src/author/Author.entity";
import { GetbooksFilterDto } from "./dto/get-book-filter-dto";

@EntityRepository(Book)
export class BookRepository extends Repository<Book>{

    private logger = new Logger('BookRepository');
   
   

    async getBook(filterDto: GetbooksFilterDto):Promise<Book[]>{
        const {author, title} = filterDto;
        const query = this.createQueryBuilder('book');

        if(author){
            query.leftJoinAndSelect("book.author","author").where("author.firstname || \' \' || author.lastname ILIKE :fullname ",{fullname: `%${author}%` })
            
        }else if(title){
            query.andWhere('(book.title LIKE :title )',{title: `%${title}%`  });
   
        }

        

        try {

        const tasks = await query.getMany();
        return tasks; 
            
        } catch (error) {
            this.logger.error(`Failed to get Book user. Filters:`, error.stack);
            throw new InternalServerErrorException();
            
        }


    }



    async createBook(createBook: createBookDto, author: Author[] ,admin: Admin ): Promise<Book>{

        const {title,isbn,edition, PublicationYear,description,quantity,img,location} = createBook;
        const book = new Book();
        book.title = title.toLowerCase();
        book.isbn = isbn;
        book.edition = edition;
        book.description = description;
        book.PublicationYear = PublicationYear;
        book.quantity = quantity;
        book.location = location;
        book.img = img;
        book.author = author;
        try {

         await book.save();
         return book;
            
        } catch (error) {
            if(error.code === "23505"){
                throw new ConflictException('isbn alredy exist');
            }else {
                throw new InternalServerErrorException;
            }
            
        }

    }



}