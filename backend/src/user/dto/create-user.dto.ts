import {IsEmail, IsNotEmpty} from "class-validator";


export class CreateUserDto {
    fullName: string;

    @IsEmail()
    email: string;

    @IsNotEmpty()
    password?: string;
}
