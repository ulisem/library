import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LoanRepository } from './loan.repository';
import { BookService } from 'src/book/book.service';
import { ReaderService } from 'src/reader/reader.service';
import { Loan } from './Loan.entity';
import { createLoanDto} from "./dto/loan.create.dto";
import { Reader } from 'src/reader/reader.entity';
import { Book } from 'src/book/book.entity';
import { statusLoan } from './create-status';
import { GetLoanFilterDto } from './dto/get-loan-filter.dto';

import * as moment from 'moment'
import { Admin } from 'src/admin/admin.entity';

@Injectable()
export class LoanService {
    constructor(
        @InjectRepository(LoanRepository)
        private loanRepository: LoanRepository,
        private bookService:BookService,
        private readerService: ReaderService
      
    ){

    }


    async getLoan(filterDto: GetLoanFilterDto): Promise<Loan[]>{
        return this.loanRepository.getLoan(filterDto);
    }



  async  getLoanForId(id:string): Promise<Loan>{
    
    return this.loanRepository.getLoganById(id);
  }



  async getLoansByUser(filterDto: GetLoanFilterDto, user:Reader): Promise<Loan[]>{
    return this.loanRepository.getLoanByUser(filterDto,user);
}
 


    async createLoan(createLoanDto: createLoanDto, user: Reader): Promise<Loan>{
        
        const {bookId } = createLoanDto;    

        if(user.debt > 0){
            throw new NotFoundException(`Necesitas pagar la deuda existente para poder volver a solicitar  un prestamo`);
        }

       

        
           let book = await this.bookService.getBookForId(bookId);
       
        return this.loanRepository.createLoan(createLoanDto,book,user);
    
    
    }


    async deleteLoan(id: string ):Promise<void>{
      
        const result = await this.loanRepository.delete(id);
        if (result.affected === 0){
            throw new NotFoundException(`Loan with Id ${id} not found`);  
        }
        
    }



    async approveLoan(id: string): Promise<Loan>{
        
        
        const loan = await this.getLoanForId(id);
        if(loan.status == statusLoan.APROBADO || loan.status == statusLoan.RECHAZADO ||loan.status == statusLoan.DEVUELTO ){

            throw new NotFoundException(`Loan with Id ${id} is right now aproved `);  
        }


        loan.status = statusLoan.APROBADO;
        loan.aprobedDate = moment().add(5,'days').toDate();

     

        await loan.save();
        return loan;


    }


    async cancelLoan(id: string): Promise<Loan>{
        
        
        const loan = await this.getLoanForId(id);
        if( loan.status == statusLoan.APROBADO || loan.status == statusLoan.RECHAZADO ||loan.status == statusLoan.DEVUELTO ){

            throw new NotFoundException(`Loan with Id ${id} is right now aproved `);  
        }
        loan.status = statusLoan.RECHAZADO;

       

        await loan.save();
        return loan;


    }




    async returnLoan(id: string,idReader:string): Promise<Loan>{
       


        const Loan = await this.getLoanForId(id);
        if(Loan.status == statusLoan.SOLICITADO || Loan.status == statusLoan.RECHAZADO ||Loan.status == statusLoan.DEVUELTO ){

            throw new NotFoundException(`Loan with Id ${id} is right now aproved `);  
        }
        Loan.returnDate = moment().toDate() ;
        Loan.status = statusLoan.DEVUELTO;

        let price:number = moment().diff(moment(Loan.aprobedDate),'days');

       
        
        if(price > 0 ){

            const updateReader = await this.readerService.updateDebt(idReader,price*5);
           
        }


        
       
        await Loan.save();
        return Loan;


    }



}
