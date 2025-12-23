import { ConflictException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { RegisterUserDto } from './dto/register-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import * as bycrypt from 'bcrypt'
import { JwtService } from "@nestjs/jwt"
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,
        private jwtService: JwtService,
        private configService: ConfigService
    ) { }

    async register(dto: RegisterUserDto): Promise<Omit<User, 'password'>> {
        const existingUser = await this.userRepository.findOne({
            where: { email: dto.email }
        })

        if (existingUser) {
            throw new ConflictException("Email already is use. Please, try with a different email")
        }

        const hashedPassword = await this.hashPassword(dto.password)

        const newUser = this.userRepository.create(dto)
        newUser.password = hashedPassword

        const savedUser = await this.userRepository.save(newUser)

        const { password, ...result } = savedUser
        return result
    }

    private async hashPassword(password: string): Promise<string> {
        return await bycrypt.hash(password, 10)
    }

    async login(dto: LoginUserDto) {
        const user = await this.userRepository.findOne({
            where: { email: dto.email }
        })

        if(!user) {
            throw new UnauthorizedException("Invalid credentials or account not exists")
        }

        const verifyPassword = await this.verifyPassword(dto.password, user.password)

        if (!verifyPassword) {
            throw new UnauthorizedException("Invalid credentials or account not exists")
        }

        const tokens = this.generateTokens(user)
        const {password, ...result} = user

        return {
            user: result,
            ...tokens
        }
    }

    private async verifyPassword(plainPassword: string, hashedPassword: string): Promise<boolean> {
        return await bycrypt.compare(plainPassword, hashedPassword)
    }

    private generateTokens(user: User) {
        return {
            accessToken: this.generateAccessToken(user),
            refreshTokeen: this.generateRefreshToken(user)
        }
    }

    private generateAccessToken(user: User) : string{
        const payload = {
            email: user.email,
            sub: user.id,
            role: user.role
        }
        return this.jwtService.sign(payload, {
            secret: this.configService.getOrThrow<string>('TOKEN_SECRET_VALUE'),
            expiresIn: "15m"
        })
    }

    private generateRefreshToken(user: User) : string{
        const payload = {
            email: user.email,
            sub: user.id,
            role: user.role
        }
        return this.jwtService.sign(payload, {
            secret: this.configService.getOrThrow<string>('TOKEN_SECRET_VALUE'),
            expiresIn: "7d"
        })
    }

    async getUserById(id: number): Promise<Omit<User, 'password'> | null> {
        const user = await this.userRepository.findOne({
            where: { id }
        })

        if (!user) {
            throw new NotFoundException("User not found")
        }

        const { password, ...result } = user
        return result
    }
}
