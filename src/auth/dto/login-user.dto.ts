import { IsEmail, IsNotEmpty, IsString, Matches, MaxLength, MinLength } from "class-validator"

export class LoginUserDto {
    @IsEmail({}, { message: 'Please, provide a valid email' })
    email: string


    @IsNotEmpty({ message: 'Password is required' })
    @IsString({ message: 'Password must be a string' })
    @MinLength(8, { message: 'Password must be at least 8 characters long' })
    @MaxLength(64, { message: 'Password can not be longer than 64 characters' })
    @Matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=]).{8,64}$/gm, {
        message:
            'Password must be between 6 and 64 characters long with 1 special character and capital character each',
    })
    password: string
}