import { IsEmail, IsNotEmpty, IsString, Matches, MaxLength, MinLength } from "class-validator"
import { Match } from "../decorators/match-password.decorator"

export class RegisterUserDto {
    @IsEmail({}, {message: 'Please, provide a valid email'})
    email: string


    @IsNotEmpty({ message: 'Name is required' })
    @IsString({ message: 'Name must be a string' })
    @MinLength(8, { message: 'Name must be at least 8 characters long' })
    @MaxLength(50, { message: 'Name can not be longer than 50 characters' })
    name: string

    @IsNotEmpty({ message: 'Password is required' })
    @IsString({ message: 'Password must be a string' })
    @MinLength(8, { message: 'Password must be at least 8 characters long' })
    @MaxLength(64, { message: 'Password can not be longer than 64 characters' })
    @Matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=]).{8,64}$/gm, {
        message:
        'Password must be between 6 and 64 characters long with 1 special character and capital character each',
    })
    password: string

    @IsNotEmpty({ message: 'Confirm password is required' })
    @IsString({ message: 'Confirm password must be a string' })
    @Match('password', {
    message: 'Passwords do not match',
  })
    confirmPassword: string
}