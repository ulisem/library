import { Repository, Entity, EntityRepository } from "typeorm";
import { createAuthorDto } from "./dto/Author.create.dto";
import { Logger, InternalServerErrorException } from "@nestjs/common";
import { Author } from "./Author.entity";
import { Admin } from "src/admin/admin.entity";

@EntityRepository(Author)
export class AuthorRepository extends Repository<Author>{

    private logger = new Logger('AuthorRepository');
   
   

    async getAuthor():Promise<Author[]>{
        const query = this.createQueryBuilder('Author');

        try {

        const tasks = await query.getMany();
        return tasks; 
            
        } catch (error) {
            this.logger.error(`Failed to get Author user. Filters:`, error.stack);
            throw new InternalServerErrorException();
            
        }


    }



    async createAuthor(createAuthor: createAuthorDto, admin: Admin ): Promise<Author>{

        const {firstname,lastname,nacionality, birthdate} = createAuthor;
        const author = new Author();
        author.firstname = firstname;
        author.lastname = lastname;
        author.nacionality = nacionality;
        author.birthdate = birthdate;
       
        try {

         await author.save();
         return author;
            
        } catch (error) {
            console.log(error);
            
        }

    }



}