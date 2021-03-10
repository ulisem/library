import { IsString, MinLength, MaxLength, Matches, IsDate, IsEmail, IsDateString, IsOptional, IsNotEmpty, IsArray, IsIn,  } from "class-validator";


export class CreateReaderCredentialsDto {
    @IsString()
    @IsNotEmpty()
    @MinLength(4)
    @MaxLength(60)
    @IsEmail()
    email: string;
    @IsString()
    @MinLength(8)
    @MaxLength(60)
    @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {message: "password muy debil"})
    password: string;
    @IsNotEmpty()
    @IsString()
    @MinLength(4)
    @MaxLength(60)
    firstname: string;
    @IsNotEmpty()
    @IsString()
    @MinLength(2)
    @MaxLength(60)
    lastname:string;
    @MinLength(9)
    @IsNotEmpty()
    @IsString()
    phoneNumber:string;
    @IsNotEmpty()
    @IsString()
    state:string;
    @IsNotEmpty()
    @IsString()
    city:string;
    @IsNotEmpty()
    @IsString()
    neigborhood:string;
    @IsNotEmpty()
    @IsString()
    street:string;
    @IsNotEmpty()
    @IsString()
    extnumber:string;
    @IsOptional()
    @IsString()
    intnumber:string;
    @IsNotEmpty()
    @IsString()
    img:string;
}