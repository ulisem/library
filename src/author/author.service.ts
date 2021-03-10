import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthorRepository } from './author.repository';
import { Author } from './Author.entity';
import { createAuthorDto } from './dto/Author.create.dto';
import { Admin } from 'src/admin/admin.entity';

@Injectable()
export class AuthorService {
    constructor(
        @InjectRepository(AuthorRepository)
        private authorRepository: AuthorRepository,
    ){

    }


    async getAuthor(): Promise<Author[]>{
        return this.authorRepository.getAuthor();
    }



  async  getAuthorForId(id:string): Promise<Author>{
    try {
      const found = await this.authorRepository.findOne(id);

      if(!found){
          throw new NotFoundException(`Author with Id ${id} not found`);
      }

      return found;
        
    } catch (error) {
        return error;
        
    }
  }


 


    async createAuthor(createAuthorDto: createAuthorDto, user: Admin): Promise<Author>{
        
       //const product = await this.productService.getProductById(productId);
        return this.authorRepository.createAuthor(createAuthorDto,user);
    
    
    }


    async deleteAuthor(id: string ):Promise<void>{
      
        const result = await this.authorRepository.delete(id);
        if (result.affected === 0){
            throw new NotFoundException(`Author with Id ${id} not found`);  
        }
        
    }



    async updateAuthor(id: string, createAuthorDto: createAuthorDto): Promise<Author>{
        const {firstname,lastname,nacionality,birthdate} = createAuthorDto;
      
        const author = await this.getAuthorForId(id);
        author.firstname = firstname ;
        author.lastname = lastname;
        author.nacionality = nacionality;
        author.birthdate = birthdate;

        await author.save();
        return author;


    }
}
