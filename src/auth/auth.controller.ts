import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { RegisterUserDto } from './dto/register-user.dto';
import { AuthService } from './auth.service';
import { LoginUserDto } from './dto/login-user.dto';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { CurrentUser } from './decorators/current-user.decorator';
import { Roles } from './decorators/roles.decorator';
import { UserRole } from './entities/user.entity';
import { RolesGuard } from './guards/roles.guard';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService){}

    @Post('register')
    register(@Body() dto: RegisterUserDto){
        return this.authService.register(dto)
    }

    @Post('login')
    login(@Body() dto: LoginUserDto) {
        return this.authService.login(dto)
    }

    @UseGuards(JwtAuthGuard)
    @Get('profile')
    profile(@CurrentUser() user: any){
        return user
    }

    @Post('register-admin')
    @Roles(UserRole.ADMIN)
    @UseGuards(JwtAuthGuard, RolesGuard)
    registerAdmin(@Body() dto: RegisterUserDto){
        return "Creating new admin"
    }

}
