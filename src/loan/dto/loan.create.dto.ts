import {IsNotEmpty, IsString, IsNumber, MinLength, MaxLength, IsIn} from "class-validator";
import { statusLoan } from "../create-status";

export class createLoanDto{

    @IsNotEmpty()
    @IsString()
    bookId:string;


}