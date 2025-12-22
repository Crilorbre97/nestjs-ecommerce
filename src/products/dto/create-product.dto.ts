import { IsNotEmpty, IsNumber, IsPositive, IsString, MaxLength, MinLength } from "class-validator"

export class CreateProductDto {
    @IsNotEmpty({ message: 'Title is required' })
    @IsString({ message: 'Title must be a string' })
    @MinLength(3, { message: 'Title must be at least 3 characters long' })
    @MaxLength(50, { message: 'Title can not be longer than 50 characters' })
    title: string

    @IsNotEmpty({ message: 'Description is required' })
    @IsString({ message: 'Description must be a string' })
    @MinLength(3, { message: 'Description must be at least 3 characters long' })
    description: string

    @IsNotEmpty({ message: 'Price is required' })
    @IsNumber()
    @IsPositive()
    price: number
}