import {  statusLoan} from "../create-status";
import { IsNotEmpty, IsOptional, IsIn } from "class-validator";

export class GetLoanFilterDto{
    @IsOptional()
    @IsIn([statusLoan.SOLICITADO, statusLoan.APROBADO, statusLoan.RECHAZADO, statusLoan.DEVUELTO])
    status: statusLoan;
}