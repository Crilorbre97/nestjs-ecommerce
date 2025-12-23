import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config'
import databaseConfig from "./config/database.config"
import jwtConfig from "./config/jwt.config"
import { DatabaseModule } from "./database/database.module"
import { ProductsModule } from './products/products.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [databaseConfig, jwtConfig],
    }),
    DatabaseModule,
    ProductsModule,
    AuthModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
