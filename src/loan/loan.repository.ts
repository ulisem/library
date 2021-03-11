import { Repository, Entity, EntityRepository } from "typeorm";
import { createLoanDto } from "./dto/Loan.create.dto";
import { Logger, InternalServerErrorException, NotFoundException } from "@nestjs/common";
import { Loan } from "./Loan.entity";
import { Admin } from "src/admin/admin.entity";
import { statusLoan } from "./create-status";
import { Book } from "src/book/book.entity";
import { Reader } from "src/reader/reader.entity";
import { GetLoanFilterDto } from "./dto/get-loan-filter.dto";
import * as moment from 'moment'

@EntityRepository(Loan)
export class LoanRepository extends Repository<Loan>{

    private logger = new Logger('LoanRepository');
   
   

    async getLoan():Promise<Loan[]>{
        const query = this.createQueryBuilder('Loan');

        try {

        const tasks = await query.getMany();
        return tasks; 
            
        } catch (error) {
            this.logger.error(`Failed to get Loan user. Filters:`, error.stack);
            throw new InternalServerErrorException();
            
        }


    }


    async getLoganById(id:string):Promise<Loan>{
       
        const query = this.createQueryBuilder('loan');

        query.where('loan.id = :id', {id: id});

       

        const loan = await query.getOne();

        if(!loan){
          throw new NotFoundException(`loan with Id ${id} not found`);
        }
        return loan;
    }


    async getLoanByUser(filterDto: GetLoanFilterDto, user: Reader):Promise<Loan[]>{
        const { status } = filterDto;
        const query = this.createQueryBuilder('loan');

        query.where('loan.readerId = :readerId', {readerId: user.id});
        query.leftJoinAndSelect("loan.book","book");

        if(status){
            query.andWhere('loan.status = :status', {status });

        } 

        const tasks = await query.getMany();
        return tasks; 
    }



    async createLoan(createLoan: createLoanDto, book:Book ,admin: Reader ): Promise<Loan>{

        const {bookId} = createLoan;
        const loan = new Loan();
        loan.status = statusLoan.SOLICITADO;
        loan.createdDate = moment().toDate();
        loan.book = book;
        loan.bookId = bookId;
        loan.reader = admin;
        loan.readerId = admin.id;

        let aprove:GetLoanFilterDto = {status: statusLoan.APROBADO};
        let sol:GetLoanFilterDto = {status: statusLoan.SOLICITADO};


       const one = await this.getLoanByUser(aprove,admin);
       const two = await this.getLoanByUser(sol,admin);

       console.log(one,"oooneee");
       console.log(two, "twoooooo");



       if(one.length + two.length > 5){
        throw new NotFoundException(`Superaste el número maximo de solicitudes para tener un libro espera a devolver las solicitudes que tienes o a que estás terminen `);
     
       }

       
       
        try {

         await loan.save();
         return loan;
            
        } catch (error) {
            console.log(error);
            
        }

    }



}