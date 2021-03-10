import { IsString, MinLength, MaxLength, Matches, IsDate, IsEmail, IsDateString, IsOptional, IsNotEmpty, IsArray, IsIn,  } from "class-validator";
import { roleAdmin } from "../create.role.admin";

export class CreateAdminCredentialsDto {
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
    phoneNumber:string;
    @IsNotEmpty()
    @IsIn([roleAdmin.ADMINS, roleAdmin.BIBLIOTECARY])
    role:string;
}