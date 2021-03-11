import { Controller, Get, Logger, Param, ParseUUIDPipe, UseGuards, Post, UsePipes, ValidationPipe, Body, Delete, Patch, Query } from '@nestjs/common';
import { Loan } from './Loan.entity';
import { LoanService } from './loan.service';
import { AuthGuard } from '@nestjs/passport';
import { GetReader } from 'src/reader/get-reader-decorator';
import { Reader } from 'src/reader/reader.entity';
import { createLoanDto } from './dto/Loan.create.dto';
import { GetLoanFilterDto } from './dto/get-loan-filter.dto';

@Controller('loan')
export class LoanController {
    private logger = new Logger('LoanController');
    constructor(private loanService: LoanService){

    }



    @UseGuards(AuthGuard('admin'))
    @Get()
    getLoans(@Query(ValidationPipe) filterDto: GetLoanFilterDto): Promise<Loan[]>{

        
        return this.loanService.getLoan(filterDto);
    }


    @UseGuards(AuthGuard('reader'))
    @Get('/myUser')
    getTasksForUser(@Query(ValidationPipe) filterDto: GetLoanFilterDto,@GetReader() user:Reader): Promise<Loan[]>{
        return this.loanService.getLoansByUser(filterDto, user);
    }


    @UseGuards(AuthGuard('admin'))
    @Get('/:id')
    getLoanById(@Param('id', ParseUUIDPipe) id:string): Promise<Loan>{
        return this.loanService.getLoanForId(id);
    }



    @UseGuards(AuthGuard('reader'))
    @Post()
    @UsePipes(ValidationPipe)
    createLoan(@Body() createLoanDto: createLoanDto,@GetReader() user: Reader): Promise<Loan>{
        this.logger.verbose(`User ${user.email} creating a new Loan Data: ${JSON.stringify(createLoanDto)}`);
       return  this.loanService.createLoan(createLoanDto,user);

    }


    @UseGuards(AuthGuard('admin'))
    @Delete('/:id', )
    deleteLoan(@Param('id',ParseUUIDPipe) id:string): Promise<void>{
        return this.loanService.deleteLoan(id);   
    }



    @UseGuards(AuthGuard('admin'))
    @Patch('/approve/:id')
    updateLoanStatus(@Param('id',ParseUUIDPipe) id: string, @GetReader() user: Reader): Promise<Loan>{
        
        return this.loanService.approveLoan(id,user);

    }

    @UseGuards(AuthGuard('admin'))
    @Patch('/return/:id')
    returnLoanStatus(@Param('id',ParseUUIDPipe) id: string,@Body() readerId: string,@GetReader() user: Reader): Promise<Loan>{
        
        return this.loanService.returnLoan(id,readerId,user);

    }
}
