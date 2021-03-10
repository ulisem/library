import { IsString, MinLength, MaxLength, Matches, IsDate, IsEmail, IsDateString, IsOptional, IsNotEmpty,  } from "class-validator";

export class AdminCredentialsDto {
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
}