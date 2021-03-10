import {IsNotEmpty, IsString, IsNumber, MinLength, MaxLength, IsDateString} from "class-validator";

export class createAuthorDto{

    @IsNotEmpty()
    @IsString()
    firstname:string;
    @IsNotEmpty()
    @IsString()
    lastname:string;
    @IsNotEmpty()
    @IsString()
    nacionality:string;
    @IsNotEmpty()
    @IsDateString()
    birthdate:Date;

}