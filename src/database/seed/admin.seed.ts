import { Injectable, Logger } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { InjectRepository } from "@nestjs/typeorm";
import { User, UserRole } from "src/auth/entities/user.entity";
import { Repository } from "typeorm";
import * as bcrypt from 'bcrypt';

@Injectable()
export class AdminSeed {
    private readonly logger = new Logger(AdminSeed.name);

    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
        private readonly configService: ConfigService
    ) {}

    async run(){
        const adminExist = await this.userRepository.findOne({
            where: { 
                email: this.configService.getOrThrow<string>('ADMIN_EMAIL')
            }
        })

        if (adminExist){
            this.logger.log('Admin already exists, skipping seed');
            return;
        }

        const hashedPassword = await bcrypt.hash(this.configService.getOrThrow<string>('ADMIN_PASSWORD'), 10)
        const admin = this.userRepository.create({
            name: this.configService.getOrThrow<string>('ADMIN_NAME'),
            email: this.configService.getOrThrow<string>('ADMIN_EMAIL'),
            password: hashedPassword,
            role: UserRole.ADMIN,
        });
        await this.userRepository.save(admin);
        this.logger.log('Admin user created');
    }
}