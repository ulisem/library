import {IsNotEmpty, IsString, IsNumber, MinLength, MaxLength, IsArray} from "class-validator";

export class createBookDto{

    @IsNotEmpty()
    @IsString()
    title:string;
    @IsNotEmpty()
    @IsString()
    @MinLength(10)
    @MaxLength(14)
    isbn:string;
    @IsNotEmpty()
    @IsNumber()
    PublicationYear:number;
    @IsNotEmpty()
    @IsNumber()
    edition:number;
    @IsNotEmpty()
    @IsString()
    @MinLength(40)
    description:string;
    @IsNotEmpty()
    @IsNumber()
    quantity:number;
    @IsNotEmpty()
    @IsString()
    img:string;
    @IsNotEmpty()
    @IsString()
    location:string;
    @IsNotEmpty()
    @IsArray()
    author: string[];


}