import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "src/auth/entities/user.entity";
import { AdminSeed } from "./admin.seed";
import { ConfigModule } from "@nestjs/config";

@Module({
    imports: [
        TypeOrmModule.forFeature([User]),
        ConfigModule
    ],
    providers: [AdminSeed],
    exports: [AdminSeed]
})
export class SeedModule {}