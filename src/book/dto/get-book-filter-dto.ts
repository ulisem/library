import { IsNotEmpty, IsOptional, IsIn, IsString } from "class-validator";

export class GetbooksFilterDto{
    @IsOptional()
    @IsString()
    author: string;
    @IsOptional()
    @IsNotEmpty()
    title: string;
}